# Guía examen UT2 – Sprint 1: entidad ExamAudit

Esta guía tiene tres versiones, según la relación que pida el diagrama ERD:

- **PARTE A – Uno a muchos (1:N)** con **User**: `User ||──o< ExamAudit` (pasos 1–15)
- **PARTE B – Muchos a muchos (N:M)** con **Tag**: `ExamAudit >o──o< Tag` (pasos B1–B15)
- **PARTE C – Uno a uno (1:1)** con **Role**: `Role ||──o| ExamAudit` (pasos C1–C15)
- **ANEXO** – Qué entidades del proyecto sirven y qué cambiar para usar cualquiera de ellas

### ¿Cómo sé cuál me piden? (leer el diagrama)

| Símbolo junto a la entidad | Significa |
|---|---|
| `\|\|` (dos rayitas) | exactamente **uno** |
| `o\|` (círculo + rayita) | cero o uno |
| `>o` / `o<` (pata de gallo + círculo) | cero o **muchos** |
| `>\|` / `\|<` (pata de gallo + rayita) | uno o muchos |

- **Pata de gallo solo en un lado** → **1:N** → la FK va en la tabla del lado "muchos" (PARTE A).
- **Pata de gallo en los dos lados** → **N:M** → hace falta una **tabla intermedia** con las dos FK (PARTE B).
- **Ninguna pata de gallo** (solo rayitas y círculos) → **1:1** → la FK va en una de las dos tablas y además es **UNIQUE** (PARTE C).

---

# PARTE A – Uno a muchos (1:N) con User

Relación pedida en el diagrama ERD: **User (1) ──── (0..N) ExamAudit**.
Cada ExamAudit pertenece a un único User (FK `user_id` NOT NULL) y un User puede tener muchos ExamAudit.

Campos de ExamAudit (además de `id`, `user_id`, `created_at` y `updated_at`):
- `description`: string, **NOT NULL**
- `operation`: puede ser **NULL**, con valores `CREATE`, `MODIFY` o `READ`

Tabla en la base de datos: **`examen_audit`**.

---

## 1. Clonar el proyecto

```bash
git clone https://github.com/isaacnausetbordongarcia-alt/Proyecto-SecondLifeEnergy
cd Proyecto-SecondLifeEnergy
```

---

## 2. Crear la base de datos en Postgres (pgAdmin) y configurar `.env.develop`

En pgAdmin: **Servers → PostgreSQL → clic derecho en Databases → Create → Database…** → nombre: `examen` → Save.
(O en el Query Tool: `CREATE DATABASE examen;`)

Edita `backend/.env.develop` y **guárdalo (Ctrl+S)**:

```
NODE_ENV = development

PORT= 3000
API_URL = http://localhost:3000

DB_DIALECT = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = examen
DB_USER = postgres
DB_PASSWORD = examen
```

Comprueba que se guardó:

```bash
grep DB_ backend/.env.develop
```

> ⚠️ Si `DB_NAME` sigue siendo `secondlifeenergy_development`, todo se hará en la base equivocada.

---

## 3. Crear la rama del examen

La rama tiene que salir de `sprint-1` y llamarse `examen-tu-nombre`:

```bash
git switch sprint-1
git switch -c examen-sergio
git branch          # comprobar que estás en examen-sergio
```

---

## 4. Instalar dependencias (dentro de `backend`)

```bash
cd backend
npm ci
```

---

## 5. Crear las tablas existentes

```bash
npm run db:migrate
```

---

## 6. Rellenar los datos existentes

```bash
npm run db:seed
```

Así ya existen los usuarios 1, 2, 3 y 4, que luego usará el seeder de ExamAudit.

---

## 7. Relación 1 a N: User → ExamAudit (plantilla: article-categories)

Se copia el módulo `article-categories` como plantilla y se renombra:

```bash
cp -r src/modules/article-categories src/modules/examaudit
cd src/modules/examaudit
mv article-category.model.ts      examaudit.model.ts
mv article-category.service.ts    examaudit.service.ts
mv article-category.controller.ts examaudit.controller.ts
mv article-category.routes.ts     examaudit.routes.ts
cd ../../..
ls -la src/modules/examaudit/     # comprobar los 4 nombres
```

> ⚠️ Comprueba que los 4 archivos se llaman igual (`examaudit`, sin letras de más). Si VS Code marca
> `Cannot find module './examaudit.xxx.js'` aunque el nombre esté bien:
> **Ctrl+Shift+P → "TypeScript: Restart TS Server"**.

---

## 8. Modificar la entidad (los 4 archivos del módulo)

Sustituye **todo** el contenido de cada archivo.

### `src/modules/examaudit/examaudit.model.ts`

```ts
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ExamAudit extends Model<
  InferAttributes<ExamAudit>,
  InferCreationAttributes<ExamAudit>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare operation: "CREATE" | "MODIFY" | "READ" | null;
  declare userId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ExamAudit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "examen_audit",
    timestamps: true,
  }
);
```

### `src/modules/examaudit/examaudit.service.ts`

```ts
import { ExamAudit } from "./examaudit.model.js";
import { User } from "../users/user.model.js";

type Operation = "CREATE" | "MODIFY" | "READ" | null;

export class ExamAuditService {

  static async findAll() {
    return ExamAudit.findAll({ order: [["id", "ASC"]] });
  }

  static async findById(id: number) {
    return ExamAudit.findByPk(id);
  }

  static async create(data: {
    description: string;
    operation?: Operation;
    userId: number;
  }) {
    return ExamAudit.create(data);
  }

  static async update(
    examAudit: ExamAudit,
    data: Partial<{
      description: string;
      operation: Operation;
      userId: number;
    }>
  ) {
    return examAudit.update(data);
  }

  static async delete(examAudit: ExamAudit) {
    await examAudit.destroy();
  }

  // Trae el ExamAudit con su User (demuestra que la relación funciona)
  static async findEagerById(id: number) {
    return ExamAudit.findByPk(id, {
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    });
  }

  // Apartado 3: registros con operation = CREATE
  static async findOperationCreate() {
    return ExamAudit.findAll({
      where: { operation: "CREATE" },
      order: [["id", "ASC"]],
    });
  }
}
```

### `src/modules/examaudit/examaudit.controller.ts`

```ts
import { Request, Response, NextFunction } from "express";
import { ExamAuditService } from "./examaudit.service.js";

const OPERATIONS = ["CREATE", "MODIFY", "READ"];

export class ExamAuditController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const examAudits = await ExamAuditService.findAll();
      res.json(examAudits);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { description, operation, userId } = req.body;

      if (!description || !userId) {
        res.status(400).json({ message: "description y userId son obligatorios" });
        return;
      }

      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      const examAudit = await ExamAuditService.create({ description, operation, userId });
      res.status(201).json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      const { operation } = req.body;
      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      const updated = await ExamAuditService.update(examAudit, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      await ExamAuditService.delete(examAudit);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findEagerById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async getOperationCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExamAuditService.findOperationCreate();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
```

### `src/modules/examaudit/examaudit.routes.ts`

```ts
import { Router } from "express";
import { ExamAuditController } from "./examaudit.controller.js";

const router = Router();

router.get("/", ExamAuditController.getAll);
router.get("/operation/create", ExamAuditController.getOperationCreate); // ANTES de "/:id"
router.get("/eagerly/:id", ExamAuditController.getEagerlyById);          // ANTES de "/:id"
router.get("/:id", ExamAuditController.getById);
router.post("/", ExamAuditController.create);
router.put("/:id", ExamAuditController.update);
router.delete("/:id", ExamAuditController.delete);

export default router;
```

> ⚠️ Costumbre: las rutas fijas (`/operation/create`, `/eagerly/:id`) van **antes** de `/:id`.
> Con estas, que tienen dos segmentos, no habría choque, porque `/:id` solo coincide con un segmento. Pero si
> algún día pones una ruta fija de **un solo segmento** (por ejemplo `/creates`) **después** de `/:id`,
> Express tomará "creates" como si fuera un id y nunca llegará a tu ruta.

---

## 9. Modificar el index de rutas y las asociaciones

`server.ts` **no se toca**: ya llama a `defineAssociations()`.

### `src/routes/index.ts`

Junto a los demás imports:

```ts
import examAuditRoutes from "../modules/examaudit/examaudit.routes.js";
```

Junto a los demás `router.use(...)`, antes de `export default router;`:

```ts
router.use("/exam-audits", examAuditRoutes);
```

### `src/models/associations.ts`

Junto a los demás imports:

```ts
import { ExamAudit } from "../modules/examaudit/examaudit.model.js";
```

**Dentro** de `defineAssociations()`, justo antes de la última `}`:

```ts
    // User 1 ---- 0..N ExamAudit
    User.hasMany(ExamAudit, { foreignKey: "userId", as: "examAudits" });
    ExamAudit.belongsTo(User, { foreignKey: "userId", as: "user" });
```

> El `as: "user"` tiene que coincidir con el `as` del `include` del service.

Comprobar que todo compila (si no imprime nada, no hay errores):

```bash
npx tsc --noEmit
```

---

## 10. Crear la migración y el seeder

Desde `backend`:

```bash
cd database
npx sequelize-cli migration:generate --name create-examen-audit
npx sequelize-cli seed:generate --name seed-examen-audit
cd ..
```

Se crean dos archivos con la fecha de hoy:

- `database/migrations/XXXXXXXXXXXXXX-create-examen-audit.js`
- `database/seeders/XXXXXXXXXXXXXX-seed-examen-audit.js`

> ⚠️ **No ejecutes `db:migrate` ni `db:seed` todavía.** Los archivos generados son plantillas vacías.
> Si los ejecutas vacíos, Sequelize los marca como hechos y no vuelve a lanzarlos (ver "Problemas").

---

## 11. Modificar la migración y el seeder

### Migración: `database/migrations/XXXXXXXXXXXXXX-create-examen-audit.js`

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examen_audit", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      description: { type: Sequelize.STRING(255), allowNull: false },
      operation: { type: Sequelize.ENUM("CREATE", "MODIFY", "READ"), allowNull: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("examen_audit");
    // En Postgres el ENUM es un tipo aparte: hay que borrarlo también
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_examen_audit_operation";');
  },
};
```

### Seeder: `database/seeders/XXXXXXXXXXXXXX-seed-examen-audit.js`

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("examen_audit", [
      { description: "Alta de un nuevo artículo", operation: "CREATE", user_id: 1, created_at: new Date(), updated_at: new Date() },
      { description: "Alta de un recurso formativo", operation: "CREATE", user_id: 2, created_at: new Date(), updated_at: new Date() },
      { description: "Cambio de stock de un artículo", operation: "MODIFY", user_id: 2, created_at: new Date(), updated_at: new Date() },
      { description: "Consulta de solicitudes", operation: "READ", user_id: 3, created_at: new Date(), updated_at: new Date() },
      { description: "Registro sin operación", operation: null, user_id: 1, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("examen_audit", null, {});
  },
};
```

Comprobar que los dos tienen contenido:

```bash
cat database/migrations/*examen*
cat database/seeders/*examen*
```

---

## 12. Ejecutar la migración y el seeder nuevos

```bash
npm run db:migrate      # 📸 captura → docs/screenshots (apartado 4)
npm run db:seed         # 📸 captura → docs/screenshots (apartado 5)
npm run db:migrate:status
```

Debe salir:

- `== XXXXXXXXXXXXXX-create-examen-audit: migrated`
- `== XXXXXXXXXXXXXX-seed-examen-audit: migrated`
- En el status: `up XXXXXXXXXXXXXX-create-examen-audit.js`

---

## 13. Crear las peticiones en Bruno

En la colección (`backend/docs/bruno`): clic derecho → **New Folder** → `ExamAudits`.
Dentro, clic derecho → **New Request** para cada una y **Ctrl+S** para guardar:

| Nombre | Método | URL |
|---|---|---|
| GET all | GET | `http://localhost:3000/api/exam-audits` |
| GET by id | GET | `http://localhost:3000/api/exam-audits/1` |
| GET with user | GET | `http://localhost:3000/api/exam-audits/eagerly/1` |
| POST | POST | `http://localhost:3000/api/exam-audits` |
| PUT | PUT | `http://localhost:3000/api/exam-audits/1` |
| DELETE | DELETE | `http://localhost:3000/api/exam-audits/5` |
| **GET operation CREATE** | GET | `http://localhost:3000/api/exam-audits/operation/create` |

Body → JSON del **POST**:

```json
{
  "description": "Prueba desde Bruno",
  "operation": "CREATE",
  "userId": 1
}
```

Body → JSON del **PUT**:

```json
{
  "description": "Modificada desde Bruno",
  "operation": "MODIFY"
}
```

---

## 14. Arrancar y probar

```bash
npm run dev
```

Tiene que salir: **`Connection to postgres established (examen).`**

Orden de prueba en Bruno:

1. **GET all**: devuelve los 5 registros del seeder.
2. **GET operation CREATE**: solo devuelve los registros con `"operation": "CREATE"` → 📸 captura (apartado 3).
3. **GET with user**: el registro trae `"user": { "id": 1, "name": "Admin", ... }` → la relación funciona (apartado 1).
4. **POST**, **PUT** y por último **DELETE** (apartado 2). Si repites el DELETE da 404, es lo esperado.

Capturas que deben quedar en `backend/docs/screenshots`:

- [ ] `db:migrate` con `create-examen-audit: migrated`
- [ ] `db:seed` con `seed-examen-audit: migrated`
- [ ] Bruno con el resultado de `/operation/create`

---

## 15. Guardar el trabajo

```bash
git add .
git commit -m "Examen: ExamAudit con CRUD, consulta CREATE, migración y seeder"
```

---

## Problemas que nos encontramos y cómo se arreglan

| Síntoma | Causa | Solución |
|---|---|---|
| `Connection to postgres established (secondlifeenergy_development)` | `.env.develop` sin cambiar o sin guardar | Poner `DB_NAME = examen`, guardar y reiniciar el servidor (Ctrl+C y `npm run dev`). `tsx watch` no recarga el `.env` solo. |
| `no existe la relación «examen_audit»` con la migración en `up` | La migración se ejecutó cuando el archivo estaba vacío | Pegar el contenido y ejecutar `npm run db:migrate:undo` y después `npm run db:migrate` |
| El seeder se ejecutó vacío | Igual que el anterior | `cd database` → `npx sequelize-cli db:seed:undo --seed NOMBRE.js` → `cd ..` → `npm run db:seed` |
| `Cannot find module './examaudit.xxx.js'` con el nombre bien escrito | Caché de VS Code tras renombrar | Ctrl+Shift+P → **TypeScript: Restart TS Server** |
| `Ruta no encontrada` en Bruno | Falta el `router.use` en `src/routes/index.ts` | Añadir `router.use("/exam-audits", examAuditRoutes);` |
| `User is not associated to ExamAudit` | Falta la asociación o el `as` no coincide | Revisar `associations.ts` (`as: "user"`) |
| Subrayados en rojo en `Model`, `DataTypes`… | Faltan los imports al principio del model | Pegar el bloque `import { ... } from "sequelize";` |

---
---

# PARTE B – Muchos a muchos (N:M) con Tag

Relación en el diagrama ERD: **ExamAudit (0..N) ──── (0..N) Tag** (pata de gallo en los dos lados).

- Un ExamAudit puede tener **muchos** Tags.
- Un Tag puede estar en **muchos** ExamAudit.

> ¿Por qué Tag? Es una entidad sencilla (`id`, `name`, `slug`), su seeder mete los ids 1 a 5 y en
> vuestro proyecto ya hay una relación N:M con ella (Resource–Tag). Así que es el mismo patrón que ya
> conocéis. Si en el examen te toca otra entidad, mira el **ANEXO** al final.

### ¿Qué cambia respecto a 1:N?

En una relación N:M **ninguna de las dos tablas puede guardar la FK**: un ExamAudit tendría que guardar
varios `tag_id` en una sola columna, y eso no se puede hacer. La solución es una **tabla intermedia**
(también llamada tabla puente o de unión) que guarda las parejas *(examAudit, tag)*:

```
examen_audit              exam_audit_tags                tags
────────────              ───────────────                ────
id  ◄──────────────────── exam_audit_id  (PK, FK)
description               tag_id         (PK, FK)  ────► id
operation                                                name
created_at / updated_at                                  slug
```

- La **PK de la tabla intermedia es compuesta**: `(exam_audit_id, tag_id)`. Así no se puede repetir la misma pareja.
- Las dos FK llevan `onDelete: "CASCADE"`: si borras un ExamAudit o un Tag, se borran solas sus filas de la intermedia.

| | 1:N con User (PARTE A) | N:M con Tag (PARTE B) |
|---|---|---|
| FK en `examen_audit` | ✅ `user_id` | ❌ Ninguna |
| Tabla intermedia | ❌ No | ✅ `exam_audit_tags` |
| Modelos | `ExamAudit` | `ExamAudit` + `ExamAuditTag` |
| Asociación en Sequelize | `hasMany` + `belongsTo` | `belongsToMany` en los dos lados |
| Alias del include | `as: "user"` (un objeto) | `as: "tags"` (un array) |
| FK en el body del POST | `userId` obligatorio | No va: se asocia después con `POST /:id/tags/:tagId` |
| Endpoints extra | — | asociar y desasociar Tags |

Los pasos **B1 a B6** son los mismos que en la PARTE A. Cambia todo lo demás desde el paso B7.

---

## B1–B6. Igual que la PARTE A

Haz los pasos 1 a 6 de la PARTE A, en el mismo orden:

```bash
git clone https://github.com/isaacnausetbordongarcia-alt/Proyecto-SecondLifeEnergy
cd Proyecto-SecondLifeEnergy
# pgAdmin: crear la base "examen" y poner DB_NAME = examen y DB_PASSWORD = examen en backend/.env.develop (GUARDAR)
git switch sprint-1
git switch -c examen-sergio
cd backend
npm ci
npm run db:migrate
npm run db:seed
```

---

## B7. Copiar la plantilla y crear el modelo de la tabla intermedia

Igual que en 1:N, copiamos `article-categories` y renombramos. **Además** creamos un quinto archivo
vacío para el modelo de la tabla intermedia:

```bash
cp -r src/modules/article-categories src/modules/examaudit
cd src/modules/examaudit
mv article-category.model.ts      examaudit.model.ts
mv article-category.service.ts    examaudit.service.ts
mv article-category.controller.ts examaudit.controller.ts
mv article-category.routes.ts     examaudit.routes.ts
touch examaudit-tag.model.ts
cd ../../..
ls -la src/modules/examaudit/     # tienen que salir 5 archivos
```

---

## B8. Modificar la entidad (los 5 archivos del módulo)

Sustituye **todo** el contenido de cada archivo.

### `src/modules/examaudit/examaudit.model.ts`

Es igual que en 1:N, pero **sin ninguna FK**, porque la relación se guarda en la tabla intermedia.

```ts
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ExamAudit extends Model<
  InferAttributes<ExamAudit>,
  InferCreationAttributes<ExamAudit>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare operation: "CREATE" | "MODIFY" | "READ" | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ExamAudit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "examen_audit",
    timestamps: true,
  }
);
```

### `src/modules/examaudit/examaudit-tag.model.ts` (NUEVO: tabla intermedia)

Solo tiene las dos FK, y las dos son `primaryKey: true` (PK compuesta). No lleva `id` ni timestamps,
igual que `resource-tag` en vuestro proyecto.

```ts
import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../../config/database.js";

// Tabla intermedia de la relación N:M entre ExamAudit y Tag
export class ExamAuditTag extends Model<
  InferAttributes<ExamAuditTag>,
  InferCreationAttributes<ExamAuditTag>
> {
  declare examAuditId: number;
  declare tagId: number;
}

ExamAuditTag.init(
  {
    examAuditId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "exam_audit_tags",
    timestamps: false,
  }
);
```

> El proyecto tiene `underscored: true` en `config/database.ts`, así que `examAuditId` se guarda en la
> columna `exam_audit_id` y `tagId` en `tag_id`. Por eso en la migración las columnas van en snake_case.

### `src/modules/examaudit/examaudit.service.ts`

Novedades respecto a 1:N:
- El `include` usa `as: "tags"` (plural) y `through: { attributes: [] }`, para que la respuesta no
  muestre las columnas de la tabla intermedia.
- Los `attributes` del include son `["id", "name"]`, porque Tag **no tiene `email`** como User.
- Tres métodos nuevos para gestionar la intermedia: `exists`, `link` y `unlink`.

```ts
import { ExamAudit } from "./examaudit.model.js";
import { ExamAuditTag } from "./examaudit-tag.model.js";
import { Tag } from "../tags/tag.model.js";

type Operation = "CREATE" | "MODIFY" | "READ" | null;

// Include de los tags relacionados (sin mostrar las columnas de la tabla intermedia)
const includeTags = {
  model: Tag,
  as: "tags",
  attributes: ["id", "name"],
  through: { attributes: [] },
};

export class ExamAuditService {

  static async findAll() {
    return ExamAudit.findAll({ order: [["id", "ASC"]] });
  }

  static async findById(id: number) {
    return ExamAudit.findByPk(id);
  }

  static async create(data: { description: string; operation?: Operation }) {
    return ExamAudit.create(data);
  }

  static async update(
    examAudit: ExamAudit,
    data: Partial<{ description: string; operation: Operation }>
  ) {
    return examAudit.update(data);
  }

  static async delete(examAudit: ExamAudit) {
    await examAudit.destroy();
  }

  // ExamAudit con todos sus Tags (demuestra que la relación N:M funciona)
  static async findEagerById(id: number) {
    return ExamAudit.findByPk(id, { include: [includeTags] });
  }

  // Apartado 3: registros con operation = CREATE
  static async findOperationCreate() {
    return ExamAudit.findAll({
      where: { operation: "CREATE" },
      order: [["id", "ASC"]],
    });
  }

  // ---- Gestión de la tabla intermedia ----

  static async exists(examAuditId: number, tagId: number) {
    const link = await ExamAuditTag.findOne({ where: { examAuditId, tagId } });
    return link !== null;
  }

  static async link(examAuditId: number, tagId: number) {
    return ExamAuditTag.create({ examAuditId, tagId });
  }

  static async unlink(examAuditId: number, tagId: number) {
    const deleted = await ExamAuditTag.destroy({ where: { examAuditId, tagId } });
    return deleted > 0;
  }
}
```

### `src/modules/examaudit/examaudit.controller.ts`

Novedades respecto a 1:N:
- `create` ya **no pide ninguna FK**: solo `description` (obligatoria) y `operation` (opcional).
- Dos métodos nuevos: `linkTag` (asocia) y `unlinkTag` (desasocia). `linkTag` comprueba que existan
  el ExamAudit y el Tag y que la pareja no esté repetida (409).

```ts
import { Request, Response, NextFunction } from "express";
import { ExamAuditService } from "./examaudit.service.js";
import { Tag } from "../tags/tag.model.js";

const OPERATIONS = ["CREATE", "MODIFY", "READ"];

export class ExamAuditController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const examAudits = await ExamAuditService.findAll();
      res.json(examAudits);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { description, operation } = req.body;

      if (!description) {
        res.status(400).json({ message: "description es obligatorio" });
        return;
      }

      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      const examAudit = await ExamAuditService.create({ description, operation });
      res.status(201).json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      const { operation } = req.body;
      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      const updated = await ExamAuditService.update(examAudit, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      await ExamAuditService.delete(examAudit);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findEagerById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async getOperationCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExamAuditService.findOperationCreate();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/exam-audits/:id/tags/:tagId  -> asocia un Tag al ExamAudit
  static async linkTag(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tagId = Number(req.params.tagId);

      if (!(await ExamAuditService.findById(id))) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      if (!(await Tag.findByPk(tagId))) {
        res.status(404).json({ message: "Tag no encontrado" });
        return;
      }

      if (await ExamAuditService.exists(id, tagId)) {
        res.status(409).json({ message: "Ese Tag ya está asociado a este ExamAudit" });
        return;
      }

      const link = await ExamAuditService.link(id, tagId);
      res.status(201).json(link);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/exam-audits/:id/tags/:tagId  -> quita la asociación
  static async unlinkTag(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tagId = Number(req.params.tagId);

      const removed = await ExamAuditService.unlink(id, tagId);
      if (!removed) {
        res.status(404).json({ message: "La asociación no existe" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
```

### `src/modules/examaudit/examaudit.routes.ts`

Son las mismas rutas que en 1:N, más las dos de la relación al final:

```ts
import { Router } from "express";
import { ExamAuditController } from "./examaudit.controller.js";

const router = Router();

router.get("/", ExamAuditController.getAll);
router.get("/operation/create", ExamAuditController.getOperationCreate);
router.get("/eagerly/:id", ExamAuditController.getEagerlyById);
router.get("/:id", ExamAuditController.getById);
router.post("/", ExamAuditController.create);
router.put("/:id", ExamAuditController.update);
router.delete("/:id", ExamAuditController.delete);

// Relación N:M con Tag (tabla intermedia exam_audit_tags)
router.post("/:id/tags/:tagId", ExamAuditController.linkTag);
router.delete("/:id/tags/:tagId", ExamAuditController.unlinkTag);

export default router;
```

---

## B9. Modificar el index de rutas y las asociaciones

`server.ts` **no se toca**.

### `src/routes/index.ts` (igual que en 1:N)

```ts
import examAuditRoutes from "../modules/examaudit/examaudit.routes.js";
// ...
router.use("/exam-audits", examAuditRoutes);
```

### `src/models/associations.ts`

`Tag` ya está importado en este archivo (por la relación Resource–Tag). Solo hay que añadir los **dos
modelos nuevos**:

```ts
import { ExamAudit } from "../modules/examaudit/examaudit.model.js";
import { ExamAuditTag } from "../modules/examaudit/examaudit-tag.model.js";
```

**Dentro** de `defineAssociations()`, justo antes de la última `}`:

```ts
    // ExamAudit N ---- M Tag (a través de exam_audit_tags)
    ExamAudit.belongsToMany(Tag, {
        through: ExamAuditTag,
        foreignKey: "examAuditId",
        otherKey: "tagId",
        as: "tags",
    });

    Tag.belongsToMany(ExamAudit, {
        through: ExamAuditTag,
        foreignKey: "tagId",
        otherKey: "examAuditId",
        as: "examAudits",
    });
```

Cómo se leen:
- `through`: el modelo de la tabla intermedia.
- `foreignKey`: la columna de la intermedia que apunta al modelo **desde el que defines** la relación.
- `otherKey`: la columna que apunta al **otro** modelo.
- Por eso en las dos líneas `foreignKey` y `otherKey` aparecen **intercambiados**.
- `as: "tags"` tiene que coincidir con el `as` del `includeTags` del service.
- Tag ya tiene el alias `"resources"` por su otra relación. El nuevo (`"examAudits"`) no puede llamarse
  igual que ninguno de los que ya tiene.

Comprueba que compila (si no imprime nada, todo va bien):

```bash
npx tsc --noEmit
```

---

## B10. Crear la migración y el seeder

Igual que en 1:N. **Una sola migración** crea las dos tablas y **un solo seeder** rellena las dos:

```bash
cd database
npx sequelize-cli migration:generate --name create-examen-audit
npx sequelize-cli seed:generate --name seed-examen-audit
cd ..
```

> ⚠️ **No ejecutes `db:migrate` ni `db:seed` todavía.** Primero pega el contenido (paso B11).

---

## B11. Modificar la migración y el seeder

### Migración: `database/migrations/XXXXXXXXXXXXXX-create-examen-audit.js`

El orden importa:
- En `up`, primero se crea `examen_audit` y después la intermedia, porque la intermedia la referencia.
- En `down` va al revés: primero se borra la intermedia.
- `tags` ya existe (la crea una migración anterior del proyecto), así que solo se referencia.

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Tabla principal (SIN ninguna FK)
    await queryInterface.createTable("examen_audit", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      description: { type: Sequelize.STRING(255), allowNull: false },
      operation: { type: Sequelize.ENUM("CREATE", "MODIFY", "READ"), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });

    // 2) Tabla intermedia N:M (PK compuesta por las dos FK)
    await queryInterface.createTable("exam_audit_tags", {
      exam_audit_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "examen_audit", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tag_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "tags", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    // Orden inverso: primero la intermedia (depende de examen_audit)
    await queryInterface.dropTable("exam_audit_tags");
    await queryInterface.dropTable("examen_audit");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_examen_audit_operation";');
  },
};
```

### Seeder: `database/seeders/XXXXXXXXXXXXXX-seed-examen-audit.js`

Aquí ponemos **ids fijos** en `examen_audit`, porque la tabla intermedia necesita saber a qué id
apunta. Los `tag_id` tienen que existir: el seeder de tags crea los ids **1 a 5**. Al final se ajusta
el autoincremento de Postgres; si no, el primer POST desde Bruno intentaría usar el id 1 y fallaría por
duplicado.

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // 1) Registros de examen_audit (ids fijos para poder relacionarlos abajo)
    await queryInterface.bulkInsert("examen_audit", [
      { id: 1, description: "Alta de un nuevo artículo", operation: "CREATE", created_at: new Date(), updated_at: new Date() },
      { id: 2, description: "Alta de un recurso formativo", operation: "CREATE", created_at: new Date(), updated_at: new Date() },
      { id: 3, description: "Cambio de stock de un artículo", operation: "MODIFY", created_at: new Date(), updated_at: new Date() },
      { id: 4, description: "Consulta de solicitudes", operation: "READ", created_at: new Date(), updated_at: new Date() },
      { id: 5, description: "Registro sin operación", operation: null, created_at: new Date(), updated_at: new Date() },
    ]);

    // 2) Relaciones en la tabla intermedia (tags del seeder de tags: 1 a 5)
    await queryInterface.bulkInsert("exam_audit_tags", [
      { exam_audit_id: 1, tag_id: 1 },
      { exam_audit_id: 1, tag_id: 2 },   // el ExamAudit 1 tiene 2 Tags
      { exam_audit_id: 2, tag_id: 2 },
      { exam_audit_id: 3, tag_id: 2 },   // el Tag 2 está en 3 ExamAudit
      { exam_audit_id: 4, tag_id: 4 },
      { exam_audit_id: 5, tag_id: 5 },
    ]);

    // 3) Como hemos puesto ids a mano, ajustamos el autoincremento de Postgres
    await queryInterface.sequelize.query(`
      SELECT setval(
        pg_get_serial_sequence('public.examen_audit', 'id'),
        COALESCE((SELECT MAX(id) FROM public.examen_audit), 0) + 1,
        false
      );
    `);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("exam_audit_tags", null, {});
    await queryInterface.bulkDelete("examen_audit", null, {});
  },
};
```

Comprueba que los dos tienen contenido:

```bash
cat database/migrations/*examen*
cat database/seeders/*examen*
```

---

## B12. Ejecutar la migración y el seeder nuevos

```bash
npm run db:migrate      # 📸 captura → docs/screenshots (apartado 4)
npm run db:seed         # 📸 captura → docs/screenshots (apartado 5)
npm run db:migrate:status
```

Tiene que salir:

- `== XXXXXXXXXXXXXX-create-examen-audit: migrated`
- `== XXXXXXXXXXXXXX-seed-examen-audit: migrated`

---

## B13. Crear las peticiones en Bruno

Carpeta `ExamAudits` en la colección (`backend/docs/bruno`). Las 7 primeras son como en 1:N y las 3
últimas son nuevas:

| Nombre | Método | URL |
|---|---|---|
| GET all | GET | `http://localhost:3000/api/exam-audits` |
| GET by id | GET | `http://localhost:3000/api/exam-audits/1` |
| GET with tags | GET | `http://localhost:3000/api/exam-audits/eagerly/1` |
| POST | POST | `http://localhost:3000/api/exam-audits` |
| PUT | PUT | `http://localhost:3000/api/exam-audits/1` |
| DELETE | DELETE | `http://localhost:3000/api/exam-audits/5` |
| **GET operation CREATE** | GET | `http://localhost:3000/api/exam-audits/operation/create` |
| 🆕 Link tag | POST | `http://localhost:3000/api/exam-audits/2/tags/3` |
| 🆕 GET with tags (después del link) | GET | `http://localhost:3000/api/exam-audits/eagerly/2` |
| 🆕 Unlink tag | DELETE | `http://localhost:3000/api/exam-audits/2/tags/3` |

Body → JSON del **POST**. **No lleva ninguna FK**:

```json
{
  "description": "Prueba desde Bruno",
  "operation": "CREATE"
}
```

Body → JSON del **PUT**:

```json
{
  "description": "Modificada desde Bruno",
  "operation": "MODIFY"
}
```

**Link tag** y **Unlink tag** no llevan body: los ids van en la URL.

---

## B14. Arrancar y probar

```bash
npm run dev
```

Tiene que salir: **`Connection to postgres established (examen).`**

Orden de prueba en Bruno:

1. **GET all**: devuelve los 5 registros (sin tags, porque no hay FK en la tabla).
2. **GET operation CREATE**: solo los de `"operation": "CREATE"` → 📸 captura (apartado 3).
3. **GET with tags** (`/eagerly/1`): tiene que salir `"tags": [ {"id":1,"name":"Baterías"}, {"id":2,"name":"Energía solar"} ]`.
   Un ExamAudit con **varios** Tags demuestra que la relación N:M funciona (apartado 1).
4. **Link tag** (`POST /2/tags/3`): devuelve `{"examAuditId":2,"tagId":3}` con 201.
   - Si lo repites → 409 "ya está asociado".
   - Con un Tag que no existe (`/2/tags/99`) → 404.
5. **GET with tags** (`/eagerly/2`): ahora salen "Energía solar" **y** "Reciclaje".
6. **Unlink tag** (`DELETE /2/tags/3`): 204. Si lo repites → 404.
7. **POST**, **PUT** y por último **DELETE** (apartado 2). Al borrar el ExamAudit 5, su fila de la
   tabla intermedia se borra sola gracias al `CASCADE`.

Capturas en `backend/docs/screenshots`:

- [ ] `db:migrate` con `create-examen-audit: migrated`
- [ ] `db:seed` con `seed-examen-audit: migrated`
- [ ] Bruno con el resultado de `/operation/create`
- [ ] (recomendable) Bruno con `/eagerly/1` mostrando varios `tags`

---

## B15. Guardar el trabajo

```bash
git add .
git commit -m "Examen: ExamAudit N:M con Tag, CRUD, consulta CREATE, migración y seeder"
git push -u origin examen-sergio
```

---

## Problemas propios de N:M

Además de los de la tabla de la PARTE A:

| Síntoma | Causa | Solución |
|---|---|---|
| `Tag is not associated to ExamAudit!` | Falta el `belongsToMany` o no se importó `ExamAuditTag` en `associations.ts` | Revisar el paso B9 (los dos imports y los dos `belongsToMany`) |
| `SequelizeEagerLoadingError` con un alias | El `as` del include (`"tags"`) no coincide con el de `associations.ts` | Poner `as: "tags"` en los dos sitios |
| `You have used the alias ... in two separate associations` | Has repetido un alias que Tag ya usa (`"resources"`) | Usar un alias nuevo: `"examAudits"` |
| `no existe la columna «email»` | Has copiado `attributes: ["id", "name", "email"]` del include de User | Tag solo tiene `id`, `name` y `slug` → `["id", "name"]` |
| La respuesta trae un objeto `ExamAuditTag` dentro de cada tag | Falta `through: { attributes: [] }` en el include | Añadirlo en `includeTags` |
| `no existe la columna «exam_audit_id»` o `«examAuditId»` | Nombres de columna distintos entre migración y modelo | Migración en snake_case (`exam_audit_id`, `tag_id`) y modelo en camelCase (`examAuditId`, `tagId`) |
| La migración falla con `no existe la relación «examen_audit»` al crear la intermedia | Tablas creadas en orden incorrecto | En `up`, primero `examen_audit` y luego `exam_audit_tags` |
| `db:migrate:undo` falla porque otra tabla depende de ella | `down` en orden incorrecto | En `down`, primero `dropTable("exam_audit_tags")` |
| El seeder falla con `viola la llave foránea` en `tag_id` | Un `tag_id` que no existe | Usar solo tags 1 a 5 |
| El primer POST da `llave duplicada viola restricción de unicidad «examen_audit_pkey»` | El seeder metió ids a mano y no se ajustó la secuencia | Falta el bloque `setval(...)` al final del seeder |
| Link tag da 500 en lugar de 404 con un Tag que no existe | Falta la comprobación `Tag.findByPk` en `linkTag` | Revisar el controller del paso B8 |

---
---

# PARTE C – Uno a uno (1:1) con Role

Relación en el diagrama ERD: **Role (1) ──── (0..1) ExamAudit**, es decir `Role ||──o| ExamAudit`.

- Cada ExamAudit pertenece a **exactamente un** Role.
- Cada Role tiene **como mucho un** ExamAudit (cero o uno).

> ¿Por qué Role? Es una entidad sencilla (`id`, `name`, `description`) y su seeder mete los ids 1 a 4.
> Si en el examen te toca otra entidad, mira el **ANEXO** al final.

### ¿Dónde va la FK en un 1:1?

En un 1:1 la FK puede ir en cualquiera de las dos tablas. La regla práctica es ponerla en la tabla
del lado **opcional**: el que tiene `o|` (cero o uno). Aquí ese lado es ExamAudit, así que
`examen_audit` lleva `role_id`.

Así un Role puede existir sin ExamAudit, pero un ExamAudit no puede existir sin su Role.

### ¿Qué cambia respecto a 1:N?

**Casi nada.** La tabla es como la de la PARTE A (con `role_id` en vez de `user_id`), con una sola
diferencia en la base de datos: la columna `role_id` lleva **`unique: true`**. Eso impide que dos
ExamAudit apunten al mismo Role, y es justo lo que convierte un "uno a muchos" en un "uno a uno".

| | 1:N con User (PARTE A) | 1:1 con Role (PARTE C) |
|---|---|---|
| FK en `examen_audit` | `user_id` NOT NULL | `role_id` NOT NULL **+ UNIQUE** |
| Tabla intermedia | ❌ | ❌ |
| Asociación en el lado "uno" | `User.hasMany(ExamAudit)` | `Role.hasOne(ExamAudit)` |
| Asociación en el lado de ExamAudit | `ExamAudit.belongsTo(User)` | `ExamAudit.belongsTo(Role)` |
| Alias desde el otro lado | `as: "examAudits"` (plural, array) | `as: "examAudit"` (singular, objeto) |
| POST con uno que ya tiene ExamAudit | ✅ Se crea otro | ❌ 409 Conflict |
| Endpoint extra | — | `GET /api/exam-audits/role/:roleId` (el ExamAudit de un Role) |
| Seeder | Un User puede repetirse | Cada `role_id` aparece **una sola vez** |

Los pasos **C1 a C6** son los mismos que en la PARTE A.

---

## C1–C6. Igual que la PARTE A

```bash
git clone https://github.com/isaacnausetbordongarcia-alt/Proyecto-SecondLifeEnergy
cd Proyecto-SecondLifeEnergy
# pgAdmin: crear la base "examen" y poner DB_NAME = examen y DB_PASSWORD = examen en backend/.env.develop (GUARDAR)
git switch sprint-1
git switch -c examen-sergio
cd backend
npm ci
npm run db:migrate
npm run db:seed
```

---

## C7. Copiar la plantilla

Igual que en 1:N, con 4 archivos:

```bash
cp -r src/modules/article-categories src/modules/examaudit
cd src/modules/examaudit
mv article-category.model.ts      examaudit.model.ts
mv article-category.service.ts    examaudit.service.ts
mv article-category.controller.ts examaudit.controller.ts
mv article-category.routes.ts     examaudit.routes.ts
cd ../../..
ls -la src/modules/examaudit/
```

---

## C8. Modificar la entidad (los 4 archivos del módulo)

Sustituye **todo** el contenido de cada archivo.

### `src/modules/examaudit/examaudit.model.ts`

`roleId` lleva **`unique: true`**.

```ts
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ExamAudit extends Model<
  InferAttributes<ExamAudit>,
  InferCreationAttributes<ExamAudit>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare operation: "CREATE" | "MODIFY" | "READ" | null;
  declare roleId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ExamAudit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // 1:1 -> un Role solo puede tener un ExamAudit
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "examen_audit",
    timestamps: true,
  }
);
```

### `src/modules/examaudit/examaudit.service.ts`

Novedades respecto a 1:N:
- `findByRoleId` usa **`findOne`** (no `findAll`), porque cada Role tiene como mucho un ExamAudit. El
  controller lo usa también para comprobar si el Role ya está "ocupado".
- Los `attributes` del include son `["id", "name"]`, porque Role **no tiene `email`** como User.

```ts
import { ExamAudit } from "./examaudit.model.js";
import { Role } from "../roles/role.model.js";

type Operation = "CREATE" | "MODIFY" | "READ" | null;

const includeRole = { model: Role, as: "role", attributes: ["id", "name"] };

export class ExamAuditService {

  static async findAll() {
    return ExamAudit.findAll({ order: [["id", "ASC"]] });
  }

  static async findById(id: number) {
    return ExamAudit.findByPk(id);
  }

  // 1:1 -> como mucho hay UN ExamAudit por Role, por eso findOne
  static async findByRoleId(roleId: number) {
    return ExamAudit.findOne({ where: { roleId }, include: [includeRole] });
  }

  static async create(data: {
    description: string;
    operation?: Operation;
    roleId: number;
  }) {
    return ExamAudit.create(data);
  }

  static async update(
    examAudit: ExamAudit,
    data: Partial<{
      description: string;
      operation: Operation;
      roleId: number;
    }>
  ) {
    return examAudit.update(data);
  }

  static async delete(examAudit: ExamAudit) {
    await examAudit.destroy();
  }

  // ExamAudit con su Role (demuestra que la relación funciona)
  static async findEagerById(id: number) {
    return ExamAudit.findByPk(id, { include: [includeRole] });
  }

  // Apartado 3: registros con operation = CREATE
  static async findOperationCreate() {
    return ExamAudit.findAll({
      where: { operation: "CREATE" },
      order: [["id", "ASC"]],
    });
  }
}
```

### `src/modules/examaudit/examaudit.controller.ts`

Novedades respecto a 1:N:
- En `create`, después de comprobar que el Role existe, se mira si **ya tiene un ExamAudit**. Si lo
  tiene, devuelve **409 Conflict**.
- En `update`, si se cambia el `roleId`, se hacen las mismas comprobaciones con el Role nuevo.
- Método nuevo `getByRoleId`, para ver el ExamAudit de un Role.

> La base de datos ya impide los duplicados gracias al `UNIQUE`. Si no comprobáramos antes, Postgres
> lanzaría un error y la API respondería **500**. Comprobando antes, respondemos un **409** con un
> mensaje claro.

```ts
import { Request, Response, NextFunction } from "express";
import { ExamAuditService } from "./examaudit.service.js";
import { Role } from "../roles/role.model.js";

const OPERATIONS = ["CREATE", "MODIFY", "READ"];

export class ExamAuditController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const examAudits = await ExamAuditService.findAll();
      res.json(examAudits);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { description, operation, roleId } = req.body;

      if (!description || !roleId) {
        res.status(400).json({ message: "description y roleId son obligatorios" });
        return;
      }

      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      if (!(await Role.findByPk(roleId))) {
        res.status(404).json({ message: "Role no encontrado" });
        return;
      }

      // 1:1 -> el Role no puede tener ya un ExamAudit
      if (await ExamAuditService.findByRoleId(roleId)) {
        res.status(409).json({ message: "Ese Role ya tiene un ExamAudit" });
        return;
      }

      const examAudit = await ExamAuditService.create({ description, operation, roleId });
      res.status(201).json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      const { operation, roleId } = req.body;
      if (operation != null && !OPERATIONS.includes(operation)) {
        res.status(400).json({ message: "operation debe ser CREATE, MODIFY, READ o null" });
        return;
      }

      // Si se cambia de Role, el nuevo tiene que existir y no tener ya otro ExamAudit
      if (roleId !== undefined && roleId !== examAudit.roleId) {
        if (!(await Role.findByPk(roleId))) {
          res.status(404).json({ message: "Role no encontrado" });
          return;
        }
        if (await ExamAuditService.findByRoleId(roleId)) {
          res.status(409).json({ message: "Ese Role ya tiene un ExamAudit" });
          return;
        }
      }

      const updated = await ExamAuditService.update(examAudit, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      await ExamAuditService.delete(examAudit);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const examAudit = await ExamAuditService.findEagerById(id);

      if (!examAudit) {
        res.status(404).json({ message: "ExamAudit no encontrado" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }

  static async getOperationCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExamAuditService.findOperationCreate();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/exam-audits/role/:roleId -> el ExamAudit de un Role (uno o ninguno)
  static async getByRoleId(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.roleId);
      const examAudit = await ExamAuditService.findByRoleId(roleId);

      if (!examAudit) {
        res.status(404).json({ message: "Ese Role no tiene ExamAudit" });
        return;
      }

      res.json(examAudit);
    } catch (error) {
      next(error);
    }
  }
}
```

### `src/modules/examaudit/examaudit.routes.ts`

Son las mismas rutas que en 1:N, más `/role/:roleId`:

```ts
import { Router } from "express";
import { ExamAuditController } from "./examaudit.controller.js";

const router = Router();

router.get("/", ExamAuditController.getAll);
router.get("/operation/create", ExamAuditController.getOperationCreate);
router.get("/eagerly/:id", ExamAuditController.getEagerlyById);
router.get("/role/:roleId", ExamAuditController.getByRoleId);
router.get("/:id", ExamAuditController.getById);
router.post("/", ExamAuditController.create);
router.put("/:id", ExamAuditController.update);
router.delete("/:id", ExamAuditController.delete);

export default router;
```

---

## C9. Modificar el index de rutas y las asociaciones

`server.ts` **no se toca**.

### `src/routes/index.ts` (igual que en 1:N)

```ts
import examAuditRoutes from "../modules/examaudit/examaudit.routes.js";
// ...
router.use("/exam-audits", examAuditRoutes);
```

### `src/models/associations.ts`

`Role` ya está importado en este archivo. Solo hay que añadir el import de ExamAudit:

```ts
import { ExamAudit } from "../modules/examaudit/examaudit.model.js";
```

**Dentro** de `defineAssociations()`, justo antes de la última `}`:

```ts
    // Role 1 ---- 0..1 ExamAudit
    Role.hasOne(ExamAudit, { foreignKey: "roleId", as: "examAudit" });
    ExamAudit.belongsTo(Role, { foreignKey: "roleId", as: "role" });
```

Cómo se leen:
- **`hasOne`** (en lugar de `hasMany`): un Role tiene **un** ExamAudit. Se pone en el lado que **no**
  tiene la FK.
- **`belongsTo`**: se pone en el lado que **sí** tiene la FK (`role_id` está en `examen_audit`).
- Truco para recordarlo: **`belongsTo` siempre va en la tabla que guarda la FK**, tanto en 1:1 como en 1:N.

Comprueba que compila:

```bash
npx tsc --noEmit
```

---

## C10. Crear la migración y el seeder

```bash
cd database
npx sequelize-cli migration:generate --name create-examen-audit
npx sequelize-cli seed:generate --name seed-examen-audit
cd ..
```

> ⚠️ **No ejecutes `db:migrate` ni `db:seed` todavía.** Primero pega el contenido (paso C11).

---

## C11. Modificar la migración y el seeder

### Migración: `database/migrations/XXXXXXXXXXXXXX-create-examen-audit.js`

`role_id` lleva **`unique: true`** y apunta a la tabla `roles`. Postgres crea sola una restricción
`examen_audit_role_id_key`.

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examen_audit", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      description: { type: Sequelize.STRING(255), allowNull: false },
      operation: { type: Sequelize.ENUM("CREATE", "MODIFY", "READ"), allowNull: true },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // 1:1 -> no se puede repetir el mismo role_id
        references: { model: "roles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("examen_audit");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_examen_audit_operation";');
  },
};
```

### Seeder: `database/seeders/XXXXXXXXXXXXXX-seed-examen-audit.js`

**Cada `role_id` solo puede aparecer una vez.** El seeder de roles crea 4 roles (1 a 4), así que como
máximo puede haber 4 registros. Si repites un `role_id`, el seeder falla por el `UNIQUE`.

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // 1:1 -> cada role_id aparece UNA sola vez (hay 4 roles en el seeder de roles)
    await queryInterface.bulkInsert("examen_audit", [
      { description: "Alta de un nuevo artículo", operation: "CREATE", role_id: 1, created_at: new Date(), updated_at: new Date() },
      { description: "Alta de un recurso formativo", operation: "CREATE", role_id: 2, created_at: new Date(), updated_at: new Date() },
      { description: "Cambio de stock de un artículo", operation: "MODIFY", role_id: 3, created_at: new Date(), updated_at: new Date() },
      { description: "Consulta de solicitudes", operation: "READ", role_id: 4, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("examen_audit", null, {});
  },
};
```

Comprueba que los dos tienen contenido:

```bash
cat database/migrations/*examen*
cat database/seeders/*examen*
```

---

## C12. Ejecutar la migración y el seeder nuevos

```bash
npm run db:migrate      # 📸 captura → docs/screenshots (apartado 4)
npm run db:seed         # 📸 captura → docs/screenshots (apartado 5)
npm run db:migrate:status
```

---

## C13. Crear las peticiones en Bruno

Carpeta `ExamAudits` en la colección. Son las mismas que en 1:N más una nueva. **Ojo con el POST**:
los Roles 1 a 4 ya tienen su ExamAudit por el seeder, así que necesitas un Role libre.

| Nombre | Método | URL |
|---|---|---|
| GET all | GET | `http://localhost:3000/api/exam-audits` |
| GET by id | GET | `http://localhost:3000/api/exam-audits/1` |
| GET with role | GET | `http://localhost:3000/api/exam-audits/eagerly/1` |
| 🆕 GET by role | GET | `http://localhost:3000/api/exam-audits/role/2` |
| POST | POST | `http://localhost:3000/api/exam-audits` |
| PUT | PUT | `http://localhost:3000/api/exam-audits/1` |
| DELETE | DELETE | `http://localhost:3000/api/exam-audits/4` |
| **GET operation CREATE** | GET | `http://localhost:3000/api/exam-audits/operation/create` |

Body → JSON del **POST**, con `roleId: 5`, un Role nuevo que crearás en la prueba:

```json
{
  "description": "Prueba desde Bruno",
  "operation": "CREATE",
  "roleId": 5
}
```

Body → JSON del **PUT**:

```json
{
  "description": "Modificada desde Bruno",
  "operation": "MODIFY"
}
```

---

## C14. Arrancar y probar

```bash
npm run dev
```

Tiene que salir: **`Connection to postgres established (examen).`**

Orden de prueba en Bruno:

1. **GET all**: devuelve los 4 registros del seeder.
2. **GET operation CREATE**: solo los de `"operation": "CREATE"` → 📸 captura (apartado 3).
3. **GET with role** (`/eagerly/1`): tiene que salir `"role": { "id": 1, "name": "admin" }` (apartado 1).
4. **GET by role** (`/role/2`): devuelve el único ExamAudit del Role 2 ("technician").
5. **Demostrar el 1:1**: lanza el POST cambiando `roleId` a `1`. Tiene que devolver **409 "Ese Role ya
   tiene un ExamAudit"**. Esto demuestra que un Role no puede tener dos.
6. **Crear un Role libre**: lanza la petición que ya existe en `Roles` → POST `http://localhost:3000/api/roles`
   con body `{ "name": "tester" }`. Se crea el Role 5.
7. **POST** con `roleId: 5`: devuelve 201.
8. **PUT** y por último **DELETE** `/4`. Después del DELETE, `GET /role/4` devuelve 404, porque ese
   Role se ha quedado sin ExamAudit, y eso está permitido (es el "cero" del `0..1`).

Capturas en `backend/docs/screenshots`:

- [ ] `db:migrate` con `create-examen-audit: migrated`
- [ ] `db:seed` con `seed-examen-audit: migrated`
- [ ] Bruno con el resultado de `/operation/create`
- [ ] (recomendable) Bruno con el 409 del paso 5, que demuestra el 1:1

---

## C15. Guardar el trabajo

```bash
git add .
git commit -m "Examen: ExamAudit 1:1 con Role, CRUD, consulta CREATE, migración y seeder"
git push -u origin examen-sergio
```

---

## Problemas propios de 1:1

Además de los de la tabla de la PARTE A:

| Síntoma | Causa | Solución |
|---|---|---|
| El seeder falla con `llave duplicada viola restricción de unicidad «examen_audit_role_id_key»` | Un `role_id` repetido en el seeder | Cada `role_id` una sola vez (como máximo 1, 2, 3 y 4) |
| El seeder falla con `viola la llave foránea` | Un `role_id` que no existe | Usar solo roles 1 a 4 |
| El seeder vuelve a fallar con el mismo error tras arreglarlo | El seeder se ejecutó a medias o ya había datos en la tabla | `cd database` → `npx sequelize-cli db:seed:undo --seed NOMBRE.js` → `cd ..` → `npm run db:seed` |
| El POST devuelve 409 | Ese Role ya tiene un ExamAudit: **es lo esperado en 1:1** | Usar un Role libre (crea uno con `POST /api/roles`) |
| El POST devuelve 500 en lugar de 409 | Falta la comprobación `findByRoleId` en el controller y salta el error de Postgres | Revisar el `create` del paso C8 |
| Se pueden crear dos ExamAudit para el mismo Role | Falta `unique: true` en la **migración** (en el modelo solo no basta) | Añadirlo en la migración → `npm run db:migrate:undo` → `npm run db:migrate` → `npm run db:seed` |
| `no existe la columna «email»` | Has copiado `attributes: ["id", "name", "email"]` del include de User | Role solo tiene `id`, `name` y `description` → `["id", "name"]` |
| Desde Role sale un array en vez de un objeto | Has puesto `hasMany` en vez de `hasOne` | Cambiar a `Role.hasOne(...)` con `as: "examAudit"` |

---
---

# ANEXO – Qué entidades del proyecto sirven para relacionar con ExamAudit

He revisado todas las entidades del proyecto con la base de datos recién migrada y con los seeders
ejecutados. Para cada una monté la relación con ExamAudit y la probé: migración, seeder, include,
consulta CREATE y POST.

## ✅ Se pueden usar sin problema (para 1:N, N:M o 1:1)

| Entidad | Import | Tabla (`references`) | Ids del seeder | Campos para el include |
|---|---|---|---|---|
| **User** | `../users/user.model.js` | `users` | 1–4 | `id`, `name`, `email` |
| **Role** | `../roles/role.model.js` | `roles` | 1–4 | `id`, `name` |
| **Tag** | `../tags/tag.model.js` | `tags` | 1–5 | `id`, `name` |
| **ForumCategory** | `../forum-categories/forum-category.model.js` | `forum_categories` | 1–4 | `id`, `name` |
| **ArticleCategory** | `../article-categories/article-category.model.js` | `article_categories` | 1–6 | `id`, `name`, `description` |
| **Permission** | `../permissions/permission.model.js` | `permissions` | 1–7 | `id`, `code`, `description` |
| **Request** | `../requests/request.model.js` | `requests` | 1–3 | `id`, `reference`, `status` |
| **Question** | `../questions/question.model.js` | `questions` | 1–3 | `id`, `title`, `status` |

## ❌ Evítalas

| Entidad | Problema |
|---|---|
| **Article**, **Resource**, **Simulation** | El modelo usa `tableName: "Articles"`, `"Resources"` y `"Simulations"`, pero la migración crea `articles`, `resources` y `simulations`. En Postgres las mayúsculas cuentan, así que da `relation "Articles" does not exist`. Sus propios endpoints ya devuelven 500, y al relacionarlas con ExamAudit también fallan (probado). |
| **RequestItem**, **AuditLog**, **SimulationArticles** | El mismo fallo de mayúsculas (`RequestItems`, `AuditLogs`, `SimulationArticles`): sus GET dan 500. |
| **UserRole**, **RolePermission**, **KitComponent**, **SimulationResource**, **ResourceTag**, **ArticleResource** | Son tablas intermedias sin columna `id`. No sirven como "la otra entidad". |
| **StockMovement** | Después del seeder la tabla queda vacía, así que no tienes ids a los que apuntar. |

## Qué cambiar para usar cualquiera de ellas

Coge la PARTE que corresponda a tu relación (A, B o C) y sustituye estos nombres. Los ejemplos de la
guía están hechos con **User** (A), **Tag** (B) y **Role** (C).

| Entidad | Clase | Campo FK (modelo) | Columna FK (migración) | Alias singular | Alias plural | Tabla intermedia N:M |
|---|---|---|---|---|---|---|
| User | `User` | `userId` | `user_id` | `"user"` | `"users"` | `exam_audit_users` |
| Role | `Role` | `roleId` | `role_id` | `"role"` | `"roles"` | `exam_audit_roles` |
| Tag | `Tag` | `tagId` | `tag_id` | `"tag"` | `"tags"` | `exam_audit_tags` |
| ForumCategory | `ForumCategory` | `forumCategoryId` | `forum_category_id` | `"forumCategory"` | `"forumCategories"` | `exam_audit_forum_categories` |
| ArticleCategory | `ArticleCategory` | `articleCategoryId` | `article_category_id` | `"articleCategory"` | `"articleCategories"` | `exam_audit_article_categories` |
| Permission | `Permission` | `permissionId` | `permission_id` | `"permission"` | `"permissions"` | `exam_audit_permissions` |
| Request | `Request` (⚠️ en el controller: `RequestModel`) | `requestId` | `request_id` | `"request"` | `"requests"` | `exam_audit_requests` |
| Question | `Question` | `questionId` | `question_id` | `"question"` | `"questions"` | `exam_audit_questions` |

Sitios donde cambia el nombre (revísalos uno a uno):

1. **Model** (`examaudit.model.ts`): el `declare` y el campo FK (en 1:N y 1:1; en N:M no hay FK).
2. **Modelo de la intermedia** (solo N:M): nombre de la clase, el campo FK de la otra entidad y `tableName`.
3. **Service**: el `import` de la entidad, el `include` (modelo, `as` y `attributes`) y los nombres de
   los métodos (`findByRoleId`, `link`/`unlink`, etc.).
4. **Controller**: el `import`, la comprobación `X.findByPk(...)`, la FK que se lee de `req.body` y los mensajes.
5. **Routes**: en N:M `/:id/tags/:tagId` pasa a `/:id/<plural>/:<campoFK>`; en 1:1 `/role/:roleId` pasa a `/<singular>/:<campoFK>`.
6. **associations.ts**: el `import` (si no estaba ya), el modelo en `hasMany`/`hasOne`/`belongsToMany`/`belongsTo`, `foreignKey`, `otherKey` y `as`.
7. **Migración**: el nombre de la columna FK y `references: { model: "<tabla>", key: "id" }`.
8. **Seeder**: el nombre de la columna FK y **solo ids que existan** (columna "Ids del seeder").
9. **Bruno**: el campo FK en el body del POST y las URLs nuevas.

## Trampas que salieron en las pruebas

1. **Los atributos del include.** Si copias `["id", "name", "email"]` del ejemplo de User, con
   cualquier otra entidad falla (`no existe la columna «email»`). Usa los de la tabla de arriba.
2. **Request choca con Express en el controller.** El controller ya importa `Request` de `express`. Si
   eliges esta entidad, en el **controller** impórtala con otro nombre:
   ```ts
   import { Request as RequestModel } from "../requests/request.model.js";
   ```
   y usa `RequestModel.findByPk(...)`. En el **service** y en `associations.ts` no se importa nada de
   Express, así que allí puedes usar `Request` normal. En `associations.ts` ya está importado.
3. **Aliases repetidos.** Algunas entidades ya tienen aliases por otras relaciones (por ejemplo Tag
   tiene `"resources"` y Role tiene `"users"`, `"permissions"`, `"userRoles"`, `"invitations"`...). El
   alias hacia ExamAudit (`"examAudit"` / `"examAudits"`) no choca con ninguno, pero no le pongas uno
   que ya exista.
4. **1:1 y el POST de prueba.** Si el seeder ocupa todos los ids de la otra entidad, antes de probar el
   POST crea uno nuevo con su petición de Bruno (ya existe en la colección):
   - User → `POST /api/users` con `{ "name": "darthvader", "email": "darthvader@example.com", "passwordHash": "1234" }`
   - Role → `POST /api/roles` con `{ "name": "tester" }`
   - Tag → `POST /api/tags` con `{ "name": "Litio", "slug": "litio" }`
   - ForumCategory → `POST /api/forum-categories` con `{ "name": "Reciclaje" }`
   - ArticleCategory → `POST /api/article-categories` con `{ "name": "Nueva categoría" }`
   - Permission → `POST /api/permissions` con `{ "code": "test.permission" }`
   - Request → `POST /api/requests` con `{ "reference": "REQ-2026-0004", "contactName": "Luke Skywalker", "contactEmail": "luke@example.com", "status": "pending" }`
   - Question → `POST /api/questions` con `{ "categoryId": 1, "authorId": 2, "title": "¿Cuánto dura una batería?", "content": "Quiero saber cuántos años dura.", "status": "open" }`
