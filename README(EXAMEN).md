# Guía de examen · paso a paso

Sigue los pasos **en este orden**. Después de cada paso hay un ✅ para comprobar que va bien antes de seguir.

Ejemplo: crear **`Supplier`** (proveedor) y relacionarlo con **`Article`** (un proveedor tiene muchos artículos).

> **Regla de oro:** migración y seeder → `snake_case` (`supplier_id`). Modelo, controller y Bruno → `camelCase` (`supplierId`).

---

## PASO 0 · Comprobar que el proyecto arranca

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

✅ En consola sale `Server working on http://localhost:3000`.
Déjalo arrancado en una terminal y usa **otra terminal** para el resto de comandos.

---

## PASO 1 · Decidir dónde va la clave foránea (FK)

En una relación **1:N**, la FK siempre va en la tabla del lado **"muchos"**.

| Caso | ¿Dónde va la FK? | ¿Qué hago? |
|------|------------------|------------|
| La entidad nueva es el lado "uno" (1 proveedor → N artículos) | En la tabla **existente** (`articles.supplier_id`) | Paso 2 **y** paso 3 |
| La entidad nueva es el lado "muchos" (1 artículo → N valoraciones) | En la tabla **nueva** (`ratings.article_id`) | Solo el paso 2, metiendo la FK en el `createTable` |
| N:M (recursos ↔ tags) | En una **tabla intermedia** nueva | Ver el anexo al final |

---

## PASO 2 · Migración: crear la tabla nueva

```bash
cd database
npx sequelize-cli migration:generate --name create-suppliers
```

Abre el archivo nuevo de `database/migrations/` y escribe:

```js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("suppliers", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: { type: Sequelize.STRING(150), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("suppliers");
  },
};
```

> Si la FK va en esta tabla nueva (2.º caso del paso 1), añádela aquí dentro:
> ```js
> article_id: {
>   type: Sequelize.INTEGER,
>   allowNull: false,
>   references: { model: "articles", key: "id" },
>   onDelete: "CASCADE",
>   onUpdate: "CASCADE",
> },
> ```

```bash
cd ..
npm run db:migrate
```

✅ Sale `create-suppliers: migrated`.
❌ Si hay un error: corrige el archivo, ejecuta `npm run db:migrate:undo` (solo si llegó a ejecutarse) y vuelve a migrar.

---

## PASO 3 · Migración: añadir la FK a la tabla existente

*(Solo si la FK va en la tabla que ya existía. Nunca edites la migración antigua: crea una nueva.)*

```bash
cd database
npx sequelize-cli migration:generate --name add-supplier-id-to-articles
```

```js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("articles", "supplier_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "suppliers", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("articles", "supplier_id");
  },
};
```

```bash
cd ..
npm run db:migrate
```

✅ Sale `add-supplier-id-to-articles: migrated`.

> Esta migración tiene fecha **posterior** a la del paso 2, así que `suppliers` ya existe cuando se crea la FK. Si lo haces al revés, falla.

---

## PASO 4 · Modelo nuevo

Crea `src/modules/suppliers/supplier.model.ts`:

```ts
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../config/database.js";

export class Supplier extends Model<InferAttributes<Supplier>, InferCreationAttributes<Supplier>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Supplier.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        email: { type: DataTypes.STRING(150), allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "suppliers",   // ⚠️ igual que en el createTable
        timestamps: true,         // false si la tabla no tiene created_at / updated_at
    }
);
```

---

## PASO 5 · Modificar el modelo existente

*(Solo si hiciste el paso 3.)* En `src/modules/articles/article.model.ts`:

```ts
// dentro de la clase
declare supplierId: number | null;

// dentro de Article.init({ ... })
supplierId: { type: DataTypes.INTEGER, allowNull: true },
```

Y para que se pueda enviar desde la API:

- **`article.service.ts`**: añade `supplierId?: number | null;` en los tipos de `create` y de `update`.
- **`article.controller.ts`**: añade `supplierId` donde se hace `const { ... } = req.body` y en el objeto que se pasa al service. Hazlo en `create` y en `update`.

---

## PASO 6 · Relación (asociaciones)

En `src/models/associations.ts`:

```ts
// arriba, con los demás imports
import { Supplier } from "../modules/suppliers/supplier.model.js";

// dentro de defineAssociations(), al final
Supplier.hasMany(Article, { foreignKey: "supplierId", as: "articles" });
Article.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });
```

| Relación | Lado "uno" / A | Lado "muchos" / B |
|----------|----------------|-------------------|
| 1:N | `A.hasMany(B, { foreignKey, as })` | `B.belongsTo(A, { foreignKey, as })` |
| 1:1 | `A.hasOne(B, { foreignKey, as })` | `B.belongsTo(A, { foreignKey, as })` |

`foreignKey` va en camelCase y el `as` no se puede repetir en el mismo modelo.

---

## PASO 7 · Service

Crea `src/modules/suppliers/supplier.service.ts`:

```ts
import { Supplier } from "./supplier.model.js";
import { Article } from "../articles/article.model.js";

export class SupplierService {
    static findAll() {
        return Supplier.findAll({ order: [["id", "ASC"]] });
    }
    static findById(id: number) {
        return Supplier.findByPk(id, { include: [{ model: Article, as: "articles" }] }); // "as" igual que en associations
    }
    static create(data: { name: string; email?: string | null }) {
        return Supplier.create(data);
    }
    static update(supplier: Supplier, data: { name?: string; email?: string | null }) {
        return supplier.update(data);
    }
    static delete(supplier: Supplier) {
        return supplier.destroy();
    }
}
```

---

## PASO 8 · Controller

Crea `src/modules/suppliers/supplier.controller.ts`:

```ts
import { Request, Response, NextFunction } from "express";
import { SupplierService } from "./supplier.service.js";

export class SupplierController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await SupplierService.findAll());
        } catch (error) { next(error); }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const supplier = await SupplierService.findById(Number(req.params.id));
            if (!supplier) { res.status(404).json({ message: "Supplier not found" }); return; }
            res.json(supplier);
        } catch (error) { next(error); }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email } = req.body;
            if (!name) { res.status(400).json({ message: "name is required" }); return; }
            res.status(201).json(await SupplierService.create({ name, email }));
        } catch (error) { next(error); }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const supplier = await SupplierService.findById(Number(req.params.id));
            if (!supplier) { res.status(404).json({ message: "Supplier not found" }); return; }
            const { name, email } = req.body;
            res.json(await SupplierService.update(supplier, { name, email }));
        } catch (error) { next(error); }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const supplier = await SupplierService.findById(Number(req.params.id));
            if (!supplier) { res.status(404).json({ message: "Supplier not found" }); return; }
            await SupplierService.delete(supplier);
            res.status(204).send();
        } catch (error) { next(error); }
    }
}
```

---

## PASO 9 · Routes

Crea `src/modules/suppliers/supplier.routes.ts`:

```ts
import { Router } from "express";
import { SupplierController } from "./supplier.controller.js";

const router = Router();

router.get("/", SupplierController.getAll);
router.get("/:id", SupplierController.getById);
router.post("/", SupplierController.create);
router.put("/:id", SupplierController.update);
router.delete("/:id", SupplierController.delete);

export default router;
```

---

## PASO 10 · Registrar la ruta

En `src/routes/index.ts`:

```ts
import supplierRoutes from "../modules/suppliers/supplier.routes.js";   // arriba

router.use("/suppliers", supplierRoutes);                               // con los demás router.use
```

✅ La terminal de `npm run dev` se reinicia sola y no da errores.
✅ Abre <http://localhost:3000/api/suppliers> en el navegador y sale `[]`.

> Los imports terminan en `.js` aunque el archivo sea `.ts`.

---

## PASO 11 · Seeder

```bash
cd database
npx sequelize-cli seed:generate --name seed-suppliers
```

```js
"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("suppliers", [
      { id: 1, name: "ReBattery Canarias", email: "ventas@rebattery.example", created_at: now, updated_at: now },
      { id: 2, name: "SolarTec Atlántico", email: null, created_at: now, updated_at: now },
    ]);

    // Ajustar el autoincremento (porque hemos puesto los ids a mano)
    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('suppliers', 'id'), (SELECT MAX(id) FROM suppliers));`
    );

    // Relacionar con datos que ya existen (solo si hiciste el paso 3)
    await queryInterface.bulkUpdate("articles", { supplier_id: 1 }, { id: [1, 2] });
  },

  async down(queryInterface) {
    await queryInterface.bulkUpdate("articles", { supplier_id: null }, {});
    await queryInterface.bulkDelete("suppliers", null, {});
  },
};
```

```bash
cd ..
npm run db:seed
```

✅ Sale `seed-suppliers: migrated`, y <http://localhost:3000/api/suppliers> ya muestra los 2 proveedores.
❌ Si falla a mitad: corrígelo y vuelve a ejecutar `npm run db:seed` (solo ejecuta los pendientes).

---

## PASO 12 · Probar con Bruno

1. Bruno → **Open Collection** → `backend/docs/bruno`.
2. Botón derecho en la colección → **New Folder** → `Suppliers`.
3. Dentro, **New Request** para cada fila. El body va en **Body → JSON**, en camelCase.

| # | Petición | Método | URL | Body | Debe dar |
|---|----------|--------|-----|------|----------|
| 1 | Listar | GET | `http://localhost:3000/api/suppliers` | — | 200 |
| 2 | Obtener uno | GET | `http://localhost:3000/api/suppliers/1` | — | 200 (con `articles`) |
| 3 | Crear | POST | `http://localhost:3000/api/suppliers` | `{ "name": "Nuevo", "email": "n@n.com" }` | 201 |
| 4 | Crear sin datos | POST | `http://localhost:3000/api/suppliers` | `{}` | 400 |
| 5 | Editar | PUT | `http://localhost:3000/api/suppliers/1` | `{ "name": "Editado" }` | 200 |
| 6 | Borrar | DELETE | `http://localhost:3000/api/suppliers/3` | — | 204 |
| 7 | No existe | GET | `http://localhost:3000/api/suppliers/999` | — | 404 |

**Probar la relación:**

| # | Petición | Método | URL | Body | Debe dar |
|---|----------|--------|-----|------|----------|
| 8 | Asignar proveedor | PUT | `http://localhost:3000/api/articles/3` | `{ "supplierId": 2 }` | 200, con `supplierId: 2` |
| 9 | Ver sus artículos | GET | `http://localhost:3000/api/suppliers/2` | — | 200, el artículo 3 dentro de `articles` |

**Ctrl + Enter** envía la petición y **Ctrl + S** la guarda. Al final: botón derecho en `Suppliers` → **Run** para lanzarlas todas.

---

## Si algo falla

| Error | Mira en… |
|-------|----------|
| `relation "X" does not exist` | `tableName` del modelo ≠ nombre del `createTable`, o te falta `npm run db:migrate` |
| `column "..." does not exist` | camelCase/snake_case mezclados, o falta la migración del paso 3 |
| `X is not associated to Y` | Paso 6: falta la asociación o el `as` no coincide con el del `include` |
| `404 Ruta no encontrada` | Paso 10: falta `router.use(...)` |
| `Key (id)=(1) already exists` | Paso 11: falta el `setval`, o el seeder ya estaba ejecutado |
| El campo nuevo no se guarda desde Bruno | Paso 5: falta en el `req.body` del controller |
| Error al migrar la FK | La tabla a la que apunta todavía no existe (orden de las migraciones) |

---

## Anexo · Si te piden una relación N:M

Ejemplo: `Supplier` ↔ `Tag` (un proveedor tiene muchos tags y un tag tiene muchos proveedores).

1. **Migración** `create-supplier-tags`:
   ```js
   await queryInterface.createTable("supplier_tags", {
     supplier_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
       references: { model: "suppliers", key: "id" }, onDelete: "CASCADE" },
     tag_id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
       references: { model: "tags", key: "id" }, onDelete: "CASCADE" },
   });
   ```
2. **Modelo** `supplier-tag.model.ts`: `supplierId` y `tagId` con `primaryKey: true`, `tableName: "supplier_tags"`, `timestamps: false`.
3. **Asociaciones**:
   ```ts
   Supplier.belongsToMany(Tag, { through: SupplierTag, foreignKey: "supplierId", otherKey: "tagId", as: "tags" });
   Tag.belongsToMany(Supplier, { through: SupplierTag, foreignKey: "tagId", otherKey: "supplierId", as: "suppliers" });
   ```
4. **Seeder**: `bulkInsert("supplier_tags", [{ supplier_id: 1, tag_id: 1 }, ...])`. No necesita `setval`, porque no tiene `id`.
5. **Include**: `{ model: Tag, as: "tags", through: { attributes: [] } }`.

Para más detalle, mira cómo está hecho `resource-tag` en el proyecto.
