# Second Life Energy

API REST del proyecto **Second Life Energy**: plataforma con gestión de usuarios, roles y permisos, catálogo de artículos y kits con control de stock, solicitudes de material, recursos formativos con etiquetas, simulaciones, foro de preguntas y respuestas con moderación y registro de auditoría.

---

## Stack

| Capa | Tecnología |
|---|---|
| Runtime | Node.js (ES Modules) |
| Lenguaje | TypeScript (strict) |
| Framework | Express 5 |
| ORM | Sequelize 6 |
| Base de datos | PostgreSQL (`pg`, `pg-hstore`); MySQL soportado con `mysql2` |
| Migraciones y seeders | `sequelize-cli` |
| Dev tooling | `tsx`, `cross-env` |
| Autenticación (Sprint 2) | JWT, con autorización comprobada en el servidor |
| Documentación de la API | Colección de Bruno (`backend/docs/bruno`) |
| Frontend (ver [guía](#guía-del-frontend)) | React + TypeScript + Vite, Tailwind CSS v4 + Headless UI |

---

## Requisitos

- Node.js 18 o superior
- PostgreSQL
- npm

---

## Instalación y arranque

```bash
cd backend
npm install
```

1. Crea la base de datos en PostgreSQL:

   ```sql
   CREATE DATABASE secondlifeenergy_development;
   ```

2. Copia `.env.example` como `.env.develop` (y `.env.testing` si usas el entorno de test) y rellena tus datos.

3. Aplica las migraciones y carga los datos de ejemplo:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. Arranca el servidor:

   ```bash
   npm run dev
   ```

La API queda en `http://localhost:3000`.

```bash
curl http://localhost:3000/
# {"message":"API is working"}
```

---

## Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor en desarrollo con recarga (`NODE_ENV=development`, `tsx watch`) |
| `npm run dev:test` | Servidor con `NODE_ENV=test` |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta `dist/server.js` |
| `npm run db:migrate` | Aplica las migraciones pendientes |
| `npm run db:migrate:undo` | Revierte la última migración |
| `npm run db:migrate:status` | Muestra el estado de las migraciones |
| `npm run db:seed` | Ejecuta todos los seeders |
| `npm run db:seed:undo` | Revierte todos los seeders |

---

## Variables de entorno

El fichero cargado depende de `NODE_ENV`:

| `NODE_ENV` | Origen |
|---|---|
| `development` (por defecto) | `.env.develop` |
| `test` | `.env.testing` |
| `production` | Variables del propio entorno (`process.env`) |

```env
NODE_ENV=development

PORT=3000
API_URL=http://localhost:3000

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=secondlifeenergy_development
DB_USER=postgres
DB_PASSWORD=tu-contraseña
```

| Variable | Valor por defecto |
|---|---|
| `PORT` | `3000` |
| `DB_DIALECT` | `postgres` |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `secondlifeenergy` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | `1234` |

> Los secretos (contraseñas, claves JWT) nunca se suben al repositorio: solo `.env.example` con valores de ejemplo.

---

## Estructura

```
backend/
├── src/
│   ├── server.ts                 # Arranque: asociaciones, conexión BD, listen
│   ├── app.ts                    # Express: json, cors, rutas, middlewares de error
│   ├── config/
│   │   ├── env.ts                # Carga de variables de entorno
│   │   └── database.ts           # Instancia de Sequelize (underscored: true)
│   ├── routes/index.ts           # Router raíz (/api)
│   ├── middlewares/
│   │   ├── not-found.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/associations.ts    # Todas las relaciones entre modelos
│   └── modules/                  # Un directorio por recurso (26 módulos)
├── database/
│   ├── .sequelizerc              # Rutas de config, migraciones y seeders
│   ├── config.js                 # Conexión por entorno para sequelize-cli
│   ├── migrations/               # 27 migraciones
│   └── seeders/                  # 27 seeders
├── docs/bruno/                   # Colección de peticiones de la API
├── .env.example
├── .env.develop
├── .env.testing
├── .env.production
├── package.json
└── tsconfig.json
```

Cada módulo sigue el mismo patrón por capas:

```
*.model.ts       → definición Sequelize
*.service.ts     → acceso a datos
*.controller.ts  → validación básica y respuestas HTTP
*.routes.ts      → definición de endpoints
```

---

## Módulos

| Área | Módulos |
|---|---|
| Usuarios y acceso | `users`, `roles`, `permissions`, `userRole`, `rolePermissions`, `invitations` |
| Catálogo y stock | `article-categories`, `articles`, `article-images`, `kit-components`, `article-reviews`, `stock-movements` |
| Solicitudes | `requests`, `request-item` |
| Recursos formativos | `resources`, `tags`, `resource-tag`, `article-resource` |
| Simulaciones | `simulations`, `simulation-articles`, `simulation-resources` |
| Foro | `forum-categories`, `questions`, `answers`, `moderations` |
| Auditoría | `audit-log` |

---

## Modelo de datos

### Usuarios y acceso

| Tabla | Campos |
|---|---|
| `users` | `id`, `name`, `email` (único), `password_hash`, `is_active`, `created_at`, `updated_at` |
| `roles` | `id`, `name` (único), `description` |
| `permissions` | `id`, `code` (único), `description` |
| `user_roles` | `user_id`, `role_id` (PK compuesta), `assigned_at` |
| `role_permissions` | `role_id`, `permission_id` (PK compuesta) |
| `invitations` | `id`, `invited_by_id`, `role_id`, `email`, `token_hash` (único), `expires_at`, `used_at`, `created_at` |

### Catálogo y stock

| Tabla | Campos |
|---|---|
| `article_categories` | `id`, `name` (único), `description`, `parent_category_id` (autorreferencia) |
| `articles` | `id`, `category_id`, `created_by_id`, `name`, `description`, `type`, `specifications`, `stock`, `status`, `created_at`, `updated_at` |
| `article_images` | `id`, `article_id`, `url`, `alt_text`, `sort_order` |
| `kit_components` | `kit_id`, `component_id` (PK compuesta), `quantity` (mín. 1) |
| `article_reviews` | `id`, `article_id`, `reviewer_id`, `decision`, `comments`, `created_at` |
| `stock_movements` | `id`, `article_id`, `user_id`, `type`, `quantity`, `reason`, `created_at` |

### Solicitudes

| Tabla | Campos |
|---|---|
| `requests` | `id`, `reference` (único), `contact_name`, `contact_email`, `notes`, `status` (def. `pending`), `created_at` |
| `request_items` | `id`, `request_id`, `article_id`, `quantity` (mín. 1) |

### Recursos y simulaciones

| Tabla | Campos |
|---|---|
| `resources` | `id`, `author_id`, `title`, `description`, `type`, `topic`, `difficulty`, `url`, `status`, `published_at`, `created_at` |
| `tags` | `id`, `name` (único), `slug` (único) |
| `resource_tags` | `resource_id`, `tag_id` (PK compuesta) |
| `article_resources` | `article_id`, `resource_id` (PK compuesta) |
| `simulations` | `id`, `title`, `description`, `platform`, `url`, `objectives`, `materials` |
| `simulation_articles` | `simulation_id`, `article_id` (PK compuesta) |
| `simulation_resources` | `simulation_id`, `resource_id` (PK compuesta) |

### Foro y auditoría

| Tabla | Campos |
|---|---|
| `forum_categories` | `id`, `name` (único), `description` |
| `questions` | `id`, `category_id`, `author_id`, `accepted_answer_id`, `title`, `content`, `status`, `created_at` |
| `answers` | `id`, `question_id`, `author_id`, `content`, `status`, `created_at` |
| `moderations` | `id`, `moderator_id`, `question_id`, `answer_id`, `action`, `reason`, `created_at` |
| `audit_logs` | `id`, `user_id`, `entity`, `entity_id`, `action`, `previous_values` (JSON), `new_values` (JSON), `created_at` |

### Relaciones principales

- `User` ↔ `Role` (N:M, vía `UserRole`) y `Role` ↔ `Permission` (N:M, vía `RolePermission`).
- `Invitation` pertenece a un `User` (quien invita) y a un `Role`.
- `Article` pertenece a una `ArticleCategory` (con subcategorías) y a un `User` creador; tiene imágenes, reseñas y movimientos de stock.
- `Article` ↔ `Article` (N:M, vía `KitComponent`): un kit se compone de artículos con cantidad.
- `Request` tiene muchos `RequestItem`, cada uno referido a un `Article`.
- `Resource` ↔ `Tag` (vía `ResourceTag`) y `Resource` ↔ `Article` (vía `ArticleResource`).
- `Simulation` ↔ `Article` (vía `SimulationArticles`) y `Simulation` ↔ `Resource` (vía `SimulationResource`).
- `ForumCategory` → `Question` → `Answer`; `Question` referencia su respuesta aceptada; `Moderation` apunta a una pregunta o respuesta y a un moderador.
- `AuditLog` pertenece a un `User`.

---

## API

Prefijo base: `/api`.

### Endpoints

Los recursos con CRUD estándar exponen:

| Método | Ruta | Respuesta |
|---|---|---|
| `GET` | `/api/<recurso>` | `200` |
| `GET` | `/api/<recurso>/:id` | `200` / `404` |
| `POST` | `/api/<recurso>` | `201` / `400` |
| `PUT` | `/api/<recurso>/:id` | `200` / `404` |
| `DELETE` | `/api/<recurso>/:id` | `204` / `404` |

| Recurso | Ruta base | Particularidades |
|---|---|---|
| Usuarios | `/api/users` | CRUD estándar |
| Roles | `/api/roles` | CRUD estándar |
| Permisos | `/api/permissions` | CRUD estándar |
| Invitaciones | `/api/invitations` | CRUD estándar |
| Categorías de artículo | `/api/article-categories` | CRUD + `GET /eagerly/:id` |
| Artículos | `/api/articles` | CRUD estándar |
| Imágenes de artículo | `/api/article-images` | CRUD estándar |
| Reseñas de artículo | `/api/article-reviews` | CRUD + `GET /eagerly/:id` |
| Solicitudes | `/api/requests` | CRUD estándar |
| Ítems de solicitud | `/api/request-items` | CRUD + `GET /request/:requestId` |
| Recursos | `/api/resources` | CRUD estándar |
| Etiquetas | `/api/tags` | CRUD estándar |
| Simulaciones | `/api/simulations` | CRUD estándar |
| Categorías de foro | `/api/forum-categories` | CRUD estándar |
| Preguntas | `/api/questions` | CRUD + `GET /eagerly/:id` |
| Respuestas | `/api/answers` | CRUD + `GET /eagerly/:id` |
| Moderaciones | `/api/moderations` | CRUD + `GET /eagerly/:id` |

Recursos con clave compuesta o comportamiento propio:

| Recurso | Endpoints |
|---|---|
| Roles de usuario | `GET /api/user-roles` · `GET`/`PUT`/`DELETE /api/user-roles/:userId/:roleId` · `POST /api/user-roles` |
| Permisos de rol | `GET /api/role-permissions` · `GET`/`DELETE /api/role-permissions/:roleId/:permissionId` · `POST /api/role-permissions` |
| Componentes de kit | `GET /api/kit-components` · `GET`/`PUT`/`DELETE /api/kit-components/:kitId/:componentId` · `POST /api/kit-components` |
| Artículos de simulación | `GET /api/simulation-articles` · `GET`/`DELETE /api/simulation-articles/:simulationId/:articleId` · `POST /api/simulation-articles` |
| Recursos de simulación | `GET /api/simulation-resources` · `GET /api/simulation-resources/eagerly/:simulationId/:resourceId` · `GET`/`DELETE /api/simulation-resources/:simulationId/:resourceId` · `POST /api/simulation-resources` |
| Movimientos de stock | `GET /api/stock-movements` · `GET /api/stock-movements/:id` · `POST /api/stock-movements` |
| Logs de auditoría | `GET /api/audit-logs` · `GET /api/audit-logs/:id` · `GET /api/audit-logs/entity/:entity/:entityId` |
| Recursos ↔ artículos | `GET /api/articles/:articleId/resources` · `POST`/`DELETE /api/articles/:articleId/resources/:resourceId` · `GET /api/resources/:resourceId/articles` |
| Recursos ↔ etiquetas | `GET /api/resources/:resourceId/tags` · `POST`/`DELETE /api/resources/:resourceId/tags/:tagId` · `GET /api/tags/:tagId/resources` |

Respuestas generales: ruta inexistente `404 {"message": "Ruta no encontrada"}`; error interno `500 {"message": "Error interno del servidor"}`. Las respuestas de usuarios no incluyen `passwordHash`.

### Ejemplo

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com","passwordHash":"<hash>"}'
```

### Colección Bruno

En `backend/docs/bruno/` hay una colección (`SecondLifeEnergy`) con peticiones de ejemplo, una carpeta por recurso, apuntando a `http://localhost:3000/api/...`. Ábrela desde Bruno con *Open Collection*.

---

## Roles y permisos

Los permisos se comprueban **en el backend** (middleware de autorización sobre cada endpoint según el rol del token JWT); la interfaz solo oculta opciones, nunca sustituye esa comprobación. El destinatario de una invitación no elige su propio rol.

### Roles

Roles definidos en `seed-roles`:

| id | Rol | Descripción |
|---|---|---|
| 1 | `ADMIN` | Total access to the platform |
| 2 | `TEACHER` | Manages students and educational resources |
| 3 | `CLIENT` | Registered user |
| 4 | `GUEST` | Unregistered user |
| 5 | `STUDENT` | Registered user by invitation |

> En el documento de requisitos estos roles aparecen con otros nombres: `Teacher`/`Docente`/`Manager` → `TEACHER`, `Customer` → `CLIENT` y `Visitor` → `GUEST`. `STUDENT` no tiene columna propia en las tablas originales; ver la nota bajo las matrices.

Leyenda: ✅ permitido · ❌ denegado · ✅* permitido **solo sobre lo propio** (ver notas) · — sin definir en el documento.

### Usuarios y acceso

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `User` | create / update / delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| `Role` | manage | ✅ | ❌ | ❌ | ❌ | ❌ |
| `Permission` | manage | ✅ | ❌ | ❌ | ❌ | ❌ |
| `UserRole` | read / create / update / delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| `RolePermission` | read / create / update / delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| `Invitation` | read | ✅ | ❌ ¹ | ❌ | ❌ | ❌ |
| `Invitation` | create | ✅ | ✅* | ❌ | ❌ | ❌ |
| `Invitation` | update | ✅ | ❌ | ❌ | ❌ | ❌ |
| `Invitation` | delete | ✅ | ✅* | ❌ | ❌ | ❌ |
| `Invitation` | createTeacher | ✅ | ❌ | ❌ | ❌ | ❌ |
| `Invitation` | createStudent | ✅ | ✅* | ❌ | ❌ | ❌ |

¹ Las tablas del documento no coinciden: la tabla de la Épica 4 (HU-06) deja la lectura solo para administración, mientras que la de la Épica 1 y la de `Sergio` dan lectura también al docente. Aquí se aplica la Épica 4; confirmar con el equipo.

### Catálogo y stock

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `Article` | read | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Article` | create | ✅ | ✅ | ✅ | ❌ | — |
| `Article` | update / delete | ✅ | ✅ | ❌ | ❌ | ❌ |
| `ArticleImage` | read | ✅ | ✅ | ✅ | ✅ | ✅ |
| `ArticleImage` | create / update / delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| `KitComponent` | read | ✅ | ✅ | ✅ | ✅ | ✅ |
| `KitComponent` | create / update | ✅ | ✅ | ❌ | ❌ | ❌ |
| `KitComponent` | delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| `ArticleCategory` | read | ✅ | ✅ | ✅ | — | — |
| `ArticleCategory` | create / update / delete | ✅ | ✅* | ❌ | — | — |
| `ArticleReview` | read | ✅ | ✅ | ✅ | — | — |
| `ArticleReview` | create / update / delete | ✅ | ✅* | ❌ | — | — |
| `StockMovement` | read / create / update / delete | ✅ | ❌ | ❌ | ❌ | ❌ |

### Solicitudes

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `RequestItem` | read / update / delete | ✅ | ✅ | ✅* | — | — |
| `RequestItem` | create | ✅ | ✅ | ✅ | — | — |

### Recursos formativos

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `Resource` | read | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Resource` | create / update | ✅ | ✅* | ❌ | ❌ | ❌ |
| `Resource` | delete | ✅ | ❌ | ❌ | ❌ | ❌ |
| `Tag` | read / create | ✅ | ✅ | ✅ | — | — |
| `Tag` | update / delete | ✅ | ✅ | ✅* | — | — |
| `ResourceTag` | read / create | ✅ | ✅ | ✅ | — | — |
| `ResourceTag` | update / delete | ✅ | ❌ | ❌ | — | — |
| `ArticleResource` | read | ✅ | ✅ | ✅ | — | — |
| `ArticleResource` | create | ✅ | ✅ | ❌ | — | — |
| `ArticleResource` | update / delete | ✅ | ❌ | ❌ | — | — |

### Simulaciones

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `Simulation` | read / create / delete | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Simulation` | payment (confirmar solicitud ficticia) | ✅ | ✅ | ✅ | ✅ | ✅ |
| `SimulationArticle` | read | ✅ | ✅ | ✅ | — | — |
| `SimulationArticle` | create | ✅ | ✅ | ❌ | — | — |
| `SimulationArticle` | update / delete | ✅ | ❌ | ❌ | — | — |
| `SimulationResource` | read | ✅ | ✅ | ✅ | — | — |
| `SimulationResource` | create / update / delete | ✅ | ✅* | ❌ | — | — |

### Foro y moderación

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `Question` | read | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Question` | create | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Question` | update / delete | ✅ | ✅ | ✅* | ✅* | ✅* |
| `Answer` | read | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Answer` | create | ✅ | ✅ | ✅ | ✅ | ✅ |
| `Answer` | update / delete | ✅ | ✅ | ✅* | ✅* | ✅* |
| `Moderation` | read / create / update / delete | ✅ | ❌ | ❌ | ❌ | ❌ |

### Auditoría

| Recurso | Operación | Admin | Teacher | Client | Guest | Student |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `AuditLog` | read | ✅ | ❌ | ❌ | ❌ | ❌ |
| `AuditLog` | create / update / delete | ❌ | ❌ | ❌ | ❌ | ❌ |

> Los registros de auditoría los genera el sistema; nadie los crea, edita ni borra desde la API.

### Notas sobre las restricciones `*`

- **Invitaciones (docentes):** solo pueden invitar a sus propios alumnos (rol `STUDENT`), y solo crear y borrar sus propias invitaciones.
- **Preguntas y respuestas (`CLIENT`, `GUEST` y `STUDENT`):** solo pueden actualizar o borrar sus propios comentarios.
- **`RequestItem` (`CLIENT`):** solo puede leer, actualizar y borrar los ítems de sus propias solicitudes.
- **`Resource` (docente):** gestiona solo sus propios contenidos; la administración gestiona todos sin alterar la autoría.
- **`Tag` (`CLIENT`):** solo puede modificar o borrar las etiquetas que haya creado.
- **Entidades marcadas con `*` en las tablas de `Haridian`** (`SimulationResource`, `ArticleCategory`, `ArticleReview`): el docente solo modifica o crea lo suyo.

### Columna `STUDENT`

El documento no define permisos propios para `STUDENT`. Se ha rellenado así:

- Si `GUEST` puede hacer la acción (✅ o ✅*), `STUDENT` también, con la misma restricción.
- Si `ADMIN` es el único con permiso, `STUDENT` queda en ❌.
- En el resto de casos queda en — hasta definirlo. La HU-11 menciona que el alumnado autorizado crea borradores y los envía a revisión, pero no concreta permisos.

### Orden de prioridad al construir `seed-role-permission`

1. Tablas por épica del documento (HU-03, HU-04, HU-06, HU-07, HU-09, HU-10).
2. Tablas por persona (`Isaac`, `Sergio`, `Alberto`, `Haridian`) para lo que las épicas no cubran.
3. Lo no definido (—) se deniega por defecto hasta confirmarlo.

---

## Migraciones

Gestionadas con `sequelize-cli`. La configuración está en `database/.sequelizerc` y `database/config.js` (entornos `development`, `test` y `production`; el historial de migraciones y seeders se guarda en la propia base de datos).

| Fecha | Migración |
|---|---|
| 2026-10-29 | `create-roles`, `create-requests`, `create-tags`, `create-simulations`, `create-users`, `create-permissions`, `create-forum-categories` |
| 2026-10-29 | `create-user-role`, `create-article-categories`, `create-articles`, `create-resources`, `create-role-permissions`, `create-kit-component`, `create-article-image`, `create-invitations`, `create-stock-movement` |
| 2026-11-03 | `create-questions`, `create-answers`, `create-moderations`, `create-article-reviews`, `create-simulation-resources`, `create-request-items`, `create-article-resources`, `create-resource-tags`, `create-simulation-articles`, `create-audit-logs` |
| 2026-11-05 | `add-indexes-to-forum` (índices en `questions` y `answers`) |

```bash
npm run db:migrate           # aplicar
npm run db:migrate:status    # estado
npm run db:migrate:undo      # revertir la última
```

---

## Seeders

Ubicados en `database/seeders/`. Cargan datos de ejemplo con ids fijos y, en PostgreSQL, reajustan la secuencia del autoincremento tras insertar.

| Seeder | Tabla | Contenido |
|---|---|---|
| `seed-users` | `users` | 4 usuarios: Admin, Laura Técnica, Carlos Moderador, Ana Usuaria (inactiva) |
| `seed-roles` | `roles` | `ADMIN`, `TEACHER`, `CLIENT`, `GUEST`, `STUDENT` |
| `seed-permissions` | `permissions` | `users.manage`, `articles.create`, `articles.review`, `stock.manage`, `resources.publish`, `forum.moderate`, `requests.manage` |
| `seed-requests` | `requests` | Solicitudes de ejemplo |
| `seed-tags` | `tags` | Etiquetas de ejemplo |
| `seed-forum-categories` | `forum_categories` | Categorías del foro |
| `seed-simulations` | `simulations` | Simulaciones de ejemplo |
| `seed-article-categories` | `article_categories` | Categorías de artículo (dos seeders: base y ampliación) |
| `seed-article` | `articles` | Artículos de ejemplo |
| `seed-resource` | `resources` | Recursos de ejemplo |
| `seed-resource-tag` | `resource_tags` | Relación recurso–etiqueta |
| `seed-article-resource` | `article_resources` | Relación artículo–recurso |
| `seed-simulation-article` | `simulation_articles` | Relación simulación–artículo |
| `seed-request-item` | `request_items` | Ítems de las solicitudes |
| `seed-auditlog` | `audit_logs` | Registros de auditoría |
| `seed-user-role` | `user_roles` | Asignación de roles a usuarios |
| `seed-role-permission` | `role_permissions` | Asignación de permisos a roles según la matriz de [Roles y permisos](#roles-y-permisos) |
| `seed-kit-component` | `kit_components` | Composición de kits |
| `seed-article-image` | `article_images` | Imágenes de artículos |
| `seed-invitation` | `invitations` | Invitaciones de ejemplo |
| `seed-stock-movement` | `stock_movements` | Movimientos de stock |
| `seed-questions` | `questions` | Preguntas del foro |
| `seed-answers` | `answers` | Respuestas del foro |
| `seed-moderations` | `moderations` | Acciones de moderación |
| `seed-article-reviews` | `article_reviews` | Reseñas de artículos |
| `seed-simulation-resources` | `simulation_resources` | Relación simulación–recurso |

```bash
npm run db:seed          # cargar todos
npm run db:seed:undo     # deshacer todos
```

---

## Flujo de puesta en marcha

```bash
cd backend
npm install
cp .env.example .env.develop     # rellenar datos de PostgreSQL
npm run db:migrate
npm run db:seed
npm run dev
```

---

## Guía del frontend

Cada equipo desarrolla su propio frontend, que consume esta API. Stack de referencia del proyecto:

| Capa | Tecnología |
|---|---|
| Framework | React + TypeScript + Vite |
| UI / componentes | Tailwind CSS v4 + Headless UI |
| Prototipado | Figma |
| Autenticación | JWT (la autorización real se verifica siempre en el servidor) |
| Contenedores y despliegue | Docker + Docker Compose, IsardVDI con HTTPS vía Caddy |

### Arranque (propuesta)

```bash
cd frontend
npm install
cp .env.example .env.local      # definir VITE_API_URL
npm run dev                     # Vite en http://localhost:5173
```

```env
VITE_API_URL=http://localhost:3000/api
```

La API debe tener CORS habilitado para el origen del frontend (`http://localhost:5173` en desarrollo).

### Estructura sugerida

```
frontend/
├── src/
│   ├── api/            # Cliente HTTP y funciones por recurso (articles, resources, ...)
│   ├── components/     # Componentes reutilizables (tarjetas, formularios, modales)
│   ├── pages/          # Una página por ruta (inicio, catálogo, ficha, foro, ...)
│   ├── hooks/          # Hooks propios (useAuth, useCart, ...)
│   ├── context/        # Sesión y rol del usuario
│   ├── types/          # Tipos TypeScript alineados con los modelos de la API
│   └── main.tsx
├── .env.example
└── vite.config.ts
```

### Consumo de la API

- Prefijo base `/api` y respuestas JSON; códigos `200`, `201`, `204`, `400`, `404` y `500` descritos en la sección [API](#api).
- Las rutas con `eagerly` devuelven el recurso con sus relaciones; úsalas en fichas de detalle para evitar varias peticiones.
- Cuando exista autenticación, enviar el token en cada petición protegida:

  ```ts
  fetch(`${import.meta.env.VITE_API_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  ```

- Un `403` o `401` debe llevar a la pantalla de acceso o mostrar un mensaje claro; no asumir nunca que ocultar un botón basta como seguridad.

### Roles en la interfaz

- Guardar el rol de la sesión en un contexto y usarlo para mostrar u ocultar acciones según la matriz de [Roles y permisos](#roles-y-permisos).
- Las acciones marcadas con `*` (solo lo propio) deben comprobar además que el autor del contenido coincide con el usuario actual.
- Sin registro público de perfiles internos: el acceso se hace por invitación y la persona invitada no elige su rol.

### Requisitos por historia de usuario

| HU | Qué debe cubrir el frontend |
|---|---|
| HU-02 | Inicio con presentación, kits, recursos y accesos a foro y simuladores; menú y pie usables en móvil y escritorio |
| HU-03 | Listado con búsqueda, filtros y ordenación con el estado reflejado en la URL; ficha con imágenes, especificaciones, componentes y recursos relacionados; artículos agotados visibles pero no solicitables |
| HU-04 | Añadir, eliminar y vaciar artículos; máximo 1 unidad por kit y 10 por componente; la selección se conserva al recargar; avisos claros de modo demostración |
| HU-05 | Formulario accesible con paso de revisión; referencia inequívocamente ficticia; sin enviar datos personales a terceros |
| HU-07 | Biblioteca con filtros por tipo, tema y dificultad; PDF de demostración señalados; enlaces externos por HTTPS con destino visible |
| HU-09 | Lectura pública, escritura solo para invitados; marcado de solución; contenido de usuarios mostrado sin ejecutar HTML arbitrario |
| HU-10 | Catálogo de simulaciones con objetivos y materiales; acceso a CircuitJS1 y Wokwi con alternativa por enlace externo si no se puede incrustar |

### Accesibilidad y diseño

- Navegación completa por teclado, encabezados semánticos y estados de foco visibles.
- Diseño adaptable (móvil primero) y estados de carga, vacío y error accesibles.
- Componentes interactivos (menús, diálogos, listas desplegables) con Headless UI para heredar accesibilidad.
- Prototipos en Figma antes de implementar cada pantalla.
