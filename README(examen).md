Migraciones y seeders con Sequelize v6
1. La idea en 30 segundos

Piensa en tu BD como una casa:

Modelo = el plano en código (TypeScript). Te deja manejar los datos con objetos.
Migración = las obras de la casa (crear tablas, añadir columnas…), con control de versiones. Es como un Git pero de la estructura.
Seeder = la mudanza (meter los muebles, o sea, los datos), también con control de versiones.

¿Y por qué no seguir con sequelize.sync({ force: true })? Porque eso es derribar la casa y reconstruirla cada vez: pierdes todos los datos. Con migraciones cambias la estructura sin perder nada. Por eso el profe dice que necesitamos los tres.

Regla mnemotécnica: Estructura → Migración. Datos → Seeder. Código → Modelo.

2. Cómo funcionan por dentro

Cada archivo tiene dos métodos:

up() → hace el cambio.
down() → lo deshace (siempre debe ser lo contrario exacto de up).

Sequelize apunta en dos tablas qué archivos ya ha ejecutado, y por eso solo ejecuta los pendientes:

SequelizeMeta → migraciones ejecutadas.
SequelizeData → seeders ejecutados (esto lo activa seederStorage: "sequelize" en config.js; por defecto los seeders no se registran).

Los archivos se ejecutan por orden de nombre, y el nombre empieza con un timestamp (20261010185953-create-brands.js). Por eso el orden de creación importa: no puedes crear bicycles antes que brands, porque su FK apuntaría a una tabla que no existe.

Orden del profe: brands → customers → bicycles → bicycle_details → orders → order_items. Los seeders siguen el mismo orden.

3. La configuración (lo que te pueden preguntar)
Todo lo de sequelize-cli vive en backend/database y usa CommonJS, porque el CLI de la v6 no entiende ES Modules. Por eso hay un database/package.json con "type": "commonjs", mientras el resto del proyecto usa "type": "module".
.sequelizerc → le dice al CLI dónde están config.js, migrations y seeders.
config.js → define los 3 entornos (development, test, production) leyendo los .env.*.
cross-env → permite elegir el entorno al ejecutar scripts de npm.
Una BD distinta por entorno (dev, test, prod), y creada de antemano: Sequelize crea tablas, no bases de datos.

Comandos (los scripts del package.json hacen cd database && sequelize-cli ...):

Qué quieres	Comando
Crear archivo de migración	npx sequelize-cli migration:generate --name create-brands
Crear archivo de seeder	npx sequelize-cli seed:generate --name seed-brands
Ejecutar migraciones pendientes	npm run db:migrate -- --env development
Deshacer la última migración	npm run db:migrate:undo
Ver estado de migraciones	npm run db:migrate:status
Ejecutar todos los seeders	npm run db:seed
Deshacer todos los seeders	npm run db:seed:undo
4. Las posibilidades de una migración
A) Tabla simple, sin dependencias (ej. brands, customers)
js
async up(queryInterface, Sequelize) {
  await queryInterface.createTable("brands", {
    id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
    name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
    created_at: { type: Sequelize.DATE },
    updated_at: { type: Sequelize.DATE },
  });
},
async down(queryInterface) {
  await queryInterface.dropTable("brands");
}

Línea por línea:

createTable("nombre", {columnas}) crea la tabla. El nombre va en plural y snake_case.
id es la PK autoincremental.
allowNull: false significa “obligatorio”.
unique: true impide repetidos.
created_at y updated_at los tienes que poner tú a mano: en la migración Sequelize no los añade solo.
down es simplemente dropTable.
B) Tabla con clave foránea (ej. bicycles → brands)

Es lo mismo que A, pero añadiendo la FK:

js
brand_id: {
  type: Sequelize.INTEGER.UNSIGNED,   // MISMO tipo que la PK a la que apunta
  allowNull: false,
  references: { model: "brands", key: "id" },
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
},
references dice a qué tabla (en plural, nombre de tabla, no de clase) y a qué columna apunta.
onDelete / onUpdate dicen qué pasa si se toca el registro padre:
CASCADE → se propaga (borrar marca = borrar sus bicis).
RESTRICT → te lo impide mientras haya hijos (lo que usa el profe al borrar).
SET NULL → pone la FK a NULL (obliga a que allowNull: true).
NO ACTION → parecido a RESTRICT.
C) Tabla de detalle 1:1 (ej. bicycle_details)

Es como la B, pero la FK suele llevar unique: true, para que cada bici tenga como mucho un detalle.

D) Tabla intermedia N:M (ej. order_items)

Lleva dos FKs (order_id y bicycle_id, cada una con su references) más los campos propios de la relación (quantity, unit_price). Puede tener id propio o una PK compuesta por las dos FKs.

E) Modificar una tabla que ya existe (no sale en el PDF, pero cae seguro)

Aquí aplica la regla de oro: nunca edites una migración ya ejecutada en entornos compartidos; crea una nueva. Las más comunes:

js
await queryInterface.addColumn("bicycles", "color", { type: Sequelize.STRING(30), allowNull: true });
await queryInterface.removeColumn("bicycles", "color");
await queryInterface.changeColumn("bicycles", "price", { type: Sequelize.DECIMAL(10, 2), allowNull: false });
await queryInterface.renameColumn("bicycles", "model", "model_name");
await queryInterface.addIndex("bicycles", ["brand_id"]);

El down hace lo inverso: addColumn ↔ removeColumn, renameColumn con los nombres al revés, y en changeColumn vuelves a la definición anterior.

Si añades una columna NOT NULL a una tabla con datos, ponle defaultValue o dará error. Trampa clásica.

5. Las posibilidades de un seeder
A) Seeder básico (sin FKs)
js
async up(queryInterface, Sequelize) {
  const now = new Date();
  await queryInterface.bulkInsert("brands", [
    { id: 1, name: "Orbea", created_at: now, updated_at: now },
    { id: 2, name: "Trek",  created_at: now, updated_at: now },
  ], {});
},
async down(queryInterface) {
  await queryInterface.bulkDelete("brands", { id: [1, 2] });
}
bulkInsert(tabla, [filas], {}) mete varias filas de golpe.
Las claves son los nombres de columna (snake_case), no los de las propiedades del modelo.
Hay que rellenar created_at y updated_at a mano, porque aquí no hay modelo que lo haga. Si te los dejas, quedan en NULL.
down borra exactamente lo que metiste, identificado por sus ids.
B) Seeder con FK (ej. bicycles)

Igual que A, pero con brand_id: 1. La marca 1 tiene que existir ya, así que el seeder de brands va antes (timestamp anterior). Si no, error de clave foránea.

C) Seeder con ajuste de secuencia en PostgreSQL

Cuando insertas id a mano en Postgres, el contador autoincremental no avanza, y el siguiente POST de la API intenta usar el id 1 y falla con “duplicate key”. El profe lo arregla con un setval(...) dentro de un if (getDialect() === "postgres"). En MySQL no hace falta, porque ahí el autoincrement se actualiza solo.

D) Distintas formas de escribir el down
bulkDelete("tabla", { id: [1, 2] }) → borra solo lo que sembraste (la del profe, la más limpia).
bulkDelete("tabla", null, {}) → vacía toda la tabla (útil, pero más bruto).
bulkDelete("tabla", { name: "Orbea" }) → filtras por otro campo.
E) Otras variantes que puedes ver
Muchos datos con un bucle (Array.from({length: 20}, ...)) para no escribir 20 filas a mano.
bulkUpdate para cambiar datos ya existentes (menos común).

Cuando deshaces seeders con db:seed:undo:all, Sequelize los deshace en orden inverso, así que los hijos se borran antes que los padres.

6. Receta para que te salga fluido

Para una migración, parte de tu modelo:

Genera el archivo con migration:generate --name create-xxx.
Copia los campos del init() del modelo dentro de createTable.
Pasa los nombres a snake_case (brandId → brand_id).
Añade id, created_at y updated_at si no están.
Si hay FK: references + onUpdate/onDelete, con el mismo tipo que la PK destino.
down → dropTable.

Para un seeder:

Mismas columnas que la migración, en snake_case, con ids explícitos.
now para created_at y updated_at.
Comprueba que los padres existen antes.
down → bulkDelete con los mismos ids.
7. Errores típicos (y la pista para cazarlos)
Orden equivocado → error de FK. Revisa los timestamps de los nombres.
camelCase en vez de snake_case en migración o seeder → “unknown column”.
Tipos distintos entre FK y PK (INTEGER vs INTEGER.UNSIGNED) → no te deja crear la FK.
Nombre de tabla en singular dentro de references ("brand" en vez de "brands").
Olvidar --env o tener la BD del entorno sin crear.
Un down que no deshace de verdad (olvidar uno de los dropTable o dejar ids sin borrar).
Modelo y migración desincronizados: si cambias uno, cambia el otro.
Seguir con sync({ force/alter: true }) junto a migraciones: el profe lo desaconseja.
8. Chuleta para el examen
up hace, down deshace.
Migración = estructura, seeder = datos.
Todo lo del CLI en database/, en CommonJS.
Nunca editar una migración ya ejecutada en compartido → crear una nueva.
Una BD por entorno, credenciales en .env.*, y los .env fuera de Git (por eso hay .env.production.example).
SequelizeMeta guarda las migraciones y SequelizeData los seeders.
Postgres: hay que ajustar la secuencia tras sembrar con ids manuales.
