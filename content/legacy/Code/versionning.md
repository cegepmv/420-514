
## 📁 Exemple : Structure de projet avec versionnement

```
/src
 ├── routes
 │   ├── v1
 │   │    └── users.routes.ts
 │   └── v2
 │        └── users.routes.ts
 ├── controllers
 │   ├── v1
 │   │    └── users.controller.ts
 │   └── v2
 │        └── users.controller.ts
 └── app.ts
```

## Implémentation dans Express (Node.js/TypeScript)

### 📄 `app.ts`

```ts
import express from 'express';

const app = express();

app.use('/api/v1', require('./routes/v1/users.routes'));
app.use('/api/v2', require('./routes/v2/users.routes'));

app.listen(3000, () => console.log("API running on http://localhost:3000"));
```

### 📄 `routes/v1/users.routes.ts`

```ts
import { Router } from 'express';
import { getUsersV1 } from '../../controllers/v1/users.controller';

const router = Router();
router.get('/users', getUsersV1);
module.exports = router;
```

## 📄 Swagger – Documentation versionnée

Vous pouvez créer un fichier Swagger différent pour chaque version :

### 🗂️ Arborescence

```
/docs
 ├── swagger.v1.json
 └── swagger.v2.json
```

Dans chaque fichier, vous définissez le champ `"servers"` :

```json
"servers": [
  { "url": "http://localhost:3000/api/v1" }
]
```

Et les routes propres à la version.



