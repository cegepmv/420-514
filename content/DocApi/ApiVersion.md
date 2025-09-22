+++
date = '2025-09-21T23:45:12-04:00'
draft = false
title = 'ersionnement des API RESTful'
weight = 73
+++



## 🧠 Pourquoi versionner une API REST?

Le **versionnage** permet d’assurer la stabilité et la compatibilité des applications clientes lorsqu’une API évolue :

* Ajouter de nouvelles fonctionnalités sans casser l’existant
* Supprimer ou modifier un champ ou une structure sans impacter les clients existants
* Faciliter les migrations progressives vers une nouvelle version


## 🎯 Bonnes pratiques générales

| Pratique recommandée                              | Description                                 |
| ------------------------------------------------- | ------------------------------------------- |
| 📌 Commencer à versionner dès la première version | Anticiper les évolutions futures            |
| 💡 Versionner l’API et non les ressources         | Ex: `/v1/users`, pas `/users/v1`            |
| ✅ Utiliser des numéros de version simples         | `v1`, `v2`, etc.                            |
| 🔒 Maintenir plusieurs versions en parallèle      | Jusqu’à ce que tous les clients aient migré |
| 📚 Documenter chaque version séparément           | Swagger ou Postman par version              |


## 🛠️ Méthodes de versionnement

| Méthode               | Exemple                                 | Avantages                      | Inconvénients                                |
| --------------------- | --------------------------------------- | ------------------------------ | -------------------------------------------- |
| **Dans l’URL**        | `GET /api/v1/users`                     | Facile à gérer et à comprendre | Nécessite de dupliquer les routes            |
| **Dans l’en-tête**    | `Accept: application/vnd.myapi.v1+json` | Très flexible et propre        | Moins visible, plus complexe à implémenter   |
| **Dans un paramètre** | `GET /api/users?version=1`              | Simple à tester                | Non recommandé pour les API REST officielles |

🧩 **Recommandation** : Versionner **dans l’URL** pour les APIs REST publiques et documentées.


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



