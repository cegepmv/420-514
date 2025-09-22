+++
date = '2025-09-21T22:19:32-04:00'
draft = false
title = 'Intégration de Swagger'
weight = 72
+++


Pour documenter une API créée avec Node.js et Express, l'une des meilleures pratiques est d'utiliser **Swagger** via l'outil **Swagger UI Express** et la spécification **OpenAPI**. Voici les étapes pour mettre en place la documentation de votre API.

## Étapes pour intégrer Swagger à une API Node.js/Express

### 1. **Installation des dépendances**

Commencez par installer les packages nécessaires dans votre projet Express. Dans votre terminal, exécutez :

```bash
npm install swagger-ui-express swagger-jsdoc
npm install --save-dev @types/swagger-jsdoc
npm install --save-dev @types/swagger-ui-express
```

- **swagger-ui-express** : Permet de servir une documentation Swagger via une interface web.
- **swagger-jsdoc** : Génère la documentation Swagger à partir de commentaires dans votre code.

### 2. **Configuration de Swagger dans votre projet Express**

Voici un exemple de fichier `app.ts` ou `server.ts` où Swagger est configuré :

```jsx
import express, {Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

// Définir les options de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users',
    },
  },
  apis: ['./src/routes/*.ts'], // Fichier où les routes de l'API sont définies
};

// Générer la documentation à partir des options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Servir la documentation Swagger via '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Autres routes et middleware Express
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express! Connexion sécurisée.');
});

// Exemple de route
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

![Swagger](/420-514/images/Swagger.png)

### 3. **Décrire les routes avec Swagger**

Pour que Swagger puisse générer la documentation, vous devez ajouter des commentaires dans vos fichiers de route. Par exemple, dans un fichier `routes/users.ts` :

```jsx
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the API. Can be used to populate a list of users in your system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
});
```

### 4. **Accéder à la documentation**

Après avoir configuré Swagger, démarrez votre serveur Express et accédez à l'URL suivante dans votre navigateur : `http://localhost:3000/api-docs`. Vous verrez une interface Swagger interactive où vous pourrez explorer les endpoints de votre API.

### Exemple de documentation statique avec Redoc

Installation :

```bash
npx redoc-cli bundle swagger.json
```

Un fichier HTML statique sera généré (utile pour un dépôt GitHub ou hébergement statique).


### 🔐 Ajout d’exemples sécurisés avec JWT

#### Headers à ajouter pour authentification :

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Exemple dans Swagger (pour une route sécurisée) :

```json
"security": [
  {
    "bearerAuth": []
  }
]
```

#### Déclaration du schéma de sécurité :

```json
"components": {
  "securitySchemes": {
    "bearerAuth": {
      "type": "http",
      "scheme": "bearer"
    }
  }
}
```

### Bonnes pratiques pour documenter une API avec Swagger

1. **Descriptions claires et concises** : Chaque route doit avoir une description claire de sa fonctionnalité. Utilisez la section `summary` et `description` pour expliquer ce que fait chaque endpoint.
2. **Schémas de données** : Décrivez les objets JSON attendus ou retournés par votre API dans les réponses. Utilisez la section `schema` pour spécifier les types de données (integer, string, etc.) et des exemples pour clarifier l'utilisation.
3. **Documentation des paramètres** : Chaque paramètre de route (ex : `/users/{id}`) ou paramètre de requête (ex : `/users?name=John`) doit être documenté avec les sections `parameters` et `in`.
4. **Gestion des réponses d'erreur** : Documentez toutes les réponses possibles, y compris les erreurs, avec leurs codes HTTP correspondants (`400`, `404`, `500`, etc.).
    
    Par exemple :
    
    ```jsx
    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Numeric ID of the user to retrieve
     *     responses:
     *       200:
     *         description: A single user.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   example: 1
     *                 name:
     *                   type: string
     *                   example: John Doe
     *       404:
     *         description: User not found.
     */
    app.get('/users/:id', (req, res) => {
      const user = { id: req.params.id, name: 'John Doe' };
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
    ```
    

### Outils supplémentaires pour faciliter la documentation :

- **Postman** : Vous pouvez exporter vos collections Postman sous forme de documentation ou les intégrer avec Swagger pour générer des fichiers OpenAPI.
- **ReDoc** : Une alternative à Swagger UI pour rendre la documentation plus professionnelle et personnalisée.

---
# OpenAPI

Pour documenter votre API avec OpenAPI en utilisant Swagger, vous devez suivre un processus similaire à celui décrit précédemment, mais en vous assurant que les spécifications OpenAPI sont correctement suivies. OpenAPI est la spécification qui sous-tend Swagger, et il est souvent utilisé pour générer automatiquement des documents et des interfaces pour les API RESTful.

## Exemple pour annoter les routes avec OpenAPI

Vous devez annoter vos routes avec des commentaires conformes à la spécification OpenAPI. Modifiez `routes/users.ts` comme suit :

### 1. Configurer Swagger et OpenAPI

Modifiez votre fichier `index.ts` pour inclure la configuration Swagger conforme à OpenAPI 3.0 :

**`index.ts`** :

```jsx
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Définir les options pour swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful des utilisateurs',
      version: '1.0.0',
      description: 'Une API RESTful simple pour gérer une collection d utilisateurs',
    },
    servers: [
      {
        url: '<http://localhost:3000>',
      },
    ],
  },
  apis: ['./routes/*.js'], // Fichiers où Swagger va chercher les annotations
};

// Initialiser Swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Utiliser Swagger-UI-express pour servir la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes );

app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});
```

### 2. Annoter les routes avec OpenAPI

```jsx
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/user');

// Schéma de validation
const userSchema = Joi.object({
  email: Joi.string().min(3).required(),
  name: Joi.string().min(3).required()
});

// Middleware de validation
function validateUser(req, res, next) {
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de l'utilisateur
 *         name:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         email:
 *           type: string
 *           description: L'adrese mail de l'utilisateur
 *       example:
 *         id: 60b7253a6dd0f12e4d3d8aef
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 */

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API pour gérer les utilisateurs
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste de tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: utilisateur non trouvé
 */
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Crée un nouveau utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requête invalide
 */
router.post('/', validateUser, async (req, res) => {
  const user = new User({
    id: req.body.id,
    name: req.body.name
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: utilisateur non trouvé
 *       400:
 *         description: Requête invalide
 */
router.put('/:id', [getUser, validateUser], async (req, res) => {
  if (req.body.title != null) {
    res.user.title = req.body.title;
  }
  if (req.body.author != null) {
    res.user.author = req.body.author;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID e l'utilisateur
 *     responses:
 *       200:
 *         description: utilisateur supprimé avec succès
 *       404:
 *         description: utilisateur non trouvé
 */
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour obtenir un utilisateur par ID
async function geUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'utilisateur non trouvé' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
```


### Exemple de documentation avec Swagger (OpenAPI) dans un fichier swagger.json

Il faut créer un fichier `swagger.json`.

```pgsql
sales-api/
├── src/
│   ├── routes/
│   │   ├── users.routes.ts
│   │   └── orders.routes.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Order.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── controllers/
│   ├── app.ts
│   └── server.ts
├── swagger.json
├── postman_collection.json
├── .env
├── .gitignore
└── db.json
```
Fichier `swagger.json` (extrait)


```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API Sales",
    "version": "1.0.0",
    "description": "API RESTful pour la gestion des utilisateurs, des commandes et l’authentification sécurisée"
  },
  "servers": [
    {
      "url": "http://localhost:3000/api"
    }
  ],
  "paths": {
    "/users": {
      "get": {
        "summary": "Lister les utilisateurs",
        "tags": ["Users"],
        "responses": {
          "200": {
            "description": "Liste des utilisateurs"
          }
        }
      },
      "post": {
        "summary": "Créer un nouvel utilisateur",
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserCreate"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Utilisateur créé"
          },
          "400": {
            "description": "Erreur de validation"
          }
        }
      }
    },
    "/users/login": {
      "post": {
        "summary": "Authentifier un utilisateur",
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserLogin"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Authentification réussie"
          },
          "401": {
            "description": "Échec de l'authentification"
          }
        }
      }
    },
    "/orders": {
      "get": {
        "summary": "Lister les commandes",
        "tags": ["Orders"],
        "security": [{ "bearerAuth": [] }],
        "responses": {
          "200": {
            "description": "Liste des commandes"
          },
          "401": {
            "description": "Non autorisé"
          }
        }
      },
      "post": {
        "summary": "Créer une commande",
        "tags": ["Orders"],
        "security": [{ "bearerAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OrderCreate"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Commande créée"
          },
          "400": {
            "description": "Requête invalide"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "UserCreate": {
        "type": "object",
        "properties": {
          "username": { "type": "string", "example": "alice42" },
          "email": { "type": "string", "format": "email" },
          "password": { "type": "string", "minLength": 6 }
        },
        "required": ["username", "email", "password"]
      },
      "UserLogin": {
        "type": "object",
        "properties": {
          "email": { "type": "string", "format": "email" },
          "password": { "type": "string" }
        },
        "required": ["email", "password"]
      },
      "OrderCreate": {
        "type": "object",
        "properties": {
          "userId": { "type": "string", "example": "abc123" },
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "productId": { "type": "string" },
                "quantity": { "type": "integer", "minimum": 1 }
              },
              "required": ["productId", "quantity"]
            }
          }
        },
        "required": ["userId", "items"]
      }
    }
  }
}

```

#### Intégration dans `app.ts`

Assurez-vous d'abord que dans le fichier `tsconfig.json` dans le `"compilerOptions":` la propriété suivante est à `true`.

```ts
"resolveJsonModule": true,                        /* Enable importing .json files. */
```

```ts
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```
[Exemple de Swagger Editor](https://editor-next.swagger.io/?_gl=1*1wb8ror*_gcl_au*NDE5NTE0ODQ4LjE3NTg1MTEwNTU.)
