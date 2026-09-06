+++
draft = false
title = '🧪 Laboratoire : Intégration de MongoDB avec Node.js (V3)'
+++

**Objectif principal** : Concevoir un projet Node.js complet en intégrant MongoDB, la validation des données, la configuration des environnements, l’organisation professionnelle du code par version (v1, v2, v3), ainsi qu’une documentation Swagger.

## Contexte du laboratoire

Vous développez un service Web RESTful pour gérer les utilisateurs, produits et commandes d'une plateforme. Le projet évolue à travers **trois versions** d’API (v1, v2, v3), chacune correspondant à une étape d’évolution de l’architecture ou du modèle de données.

## 🗂 Structure du projet

Le projet adopte **l’approche B** avec une organisation par **version d’API** :

```
src/
├── app.ts
├── config/             # Configuration selon l'environnement (dev, prod)
├── common/             # Middlewares, helpers, constantes, erreurs globales
│
├── v1/                 # Première version de l’API
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   └── validations/
│
├── v2/                 # Évolution des règles métier
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   └── validations/
│
└── v3/                 # Version professionnelle avec MongoDB, Swagger, etc.
    ├── controllers/
    ├── services/
    ├── models/
    ├── routes/
    ├── validations/
    ├── aggregations/
    └── swagger/

```

## Classes et entités

Les modèles d’objet suivants sont attendus, dans la **v3** :

```tsx
// User
id: number;
name: string;
email: string;
username: string;
password: string;
role?: string;

// Product
id: number;
name: string;
description: string;
price: number;
stock: number;

// Order
id: number;
userId: number;
productId: number;
quantity: number;
totalPrice: number;

```

🟨 **Ajout recommandé** : méthode d’agrégation pour calculer les ventes totales par produit, ou les commandes par utilisateur.

## Étapes :

### Étape 1 : Initialisation du projet

1. Cloner votre projet qui inclu les version V1 et V2 de votre projet template. Si vous ne l’avez pas créez le projet avec `npm init` et installez :
    
    ```bash
    npm install express mongoose dotenv cors swagger-ui-express
    npm install -D typescript ts-node nodemon @types/express @types/node
    ```
    
2. Générez les dossiers et la structure de version.
    
    ```
    src/
    ├── app.ts
    ├── config/             # Configuration selon l'environnement (dev, prod)
    ├── common/             # Middlewares, helpers, constantes, erreurs globales
    │
    ├── v1/                 # Première version de l’API
    │   ├── controllers/
    │   ├── services/
    │   ├── models/
    │   ├── routes/
    │   └── validations/
    │
    ├── v2/                 # Évolution des règles métier
    │   ├── controllers/
    │   ├── services/
    │   ├── models/
    │   ├── routes/
    │   └── validations/
    │
    └── v3/                 # Version professionnelle avec MongoDB, Swagger, etc.
        ├── controllers/
        ├── services/
        ├── models/
        ├── routes/
        ├── validations/
        ├── aggregations/
        └── swagger/
    ```
    
3. Ajoutez la configuration TypeScript (`tsconfig.json`) et un `.env` pour la connexion MongoDB.

### Étape 2 : Intégration de MongoDB (v3)

- Créez une base `ecommerce-db`.
- Créez les **schémas Mongoose** pour `User`, `Product`, `Order`.
- Utilisez des **validations** avec Joi ou zod (email, mot de passe, prix > 0, stock ≥ 0, etc.).
- Implémentez les services pour CRUD de chaque entité.
- Testez les routes avec Postman.

### Étape 3 : Ajout des agrégations

Ajoutez des routes GET qui utilisent des opérations d’agrégation :

- `/api/v3/orders/summary`
- `/api/v3/products/most-sold`
- `/api/v3/users/top-buyers`

### Étape 4 : Swagger et documentation

- Créez un fichier `swagger.json` dans `v3/swagger/`.
Dans `swagger.ts` :
    
    ```tsx
    import swaggerUi from 'swagger-ui-express';
    import { Router } from 'express';
    import * as fs from 'fs';
    import * as path from 'path';
    
    const swaggerRouter = Router();
    
    const swaggerDocs = {
      v1: JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/v1/swagger.json'), 'utf-8')),
      v2: JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/v2/swagger.json'), 'utf-8')),
      v3: JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/v3/swagger.json'), 'utf-8'))
    };
    
    swaggerRouter.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs.v1));
    swaggerRouter.use('/v2', swaggerUi.serve, swaggerUi.setup(swaggerDocs.v2));
    swaggerRouter.use('/v3', swaggerUi.serve, swaggerUi.setup(swaggerDocs.v3));
    
    export default swaggerRouter;
    ```
    
    ```tsx
    import express from 'express';
    import swaggerRouter from './swagger';
    
    const app = express();
    app.use('/api-docs', swaggerRouter);
    ```
    
- Ajoutez la documentation des routes (Users, Products, Orders).
    
    ```tsx
    import express from 'express';
    import { connectDB } from './config/db';
    import swaggerUi from 'swagger-ui-express';
    import swaggerDocument from '../public/swagger.json';
    
    const app = express();
    connectDB();
    app.use(express.json());
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/v1/', require('./v1/routes'));
    app.use('/api/v2/', require('./v2/routes'));
    app.use('/api/v3/', require('./v3/routes'));
    
    app.listen(process.env.PORT, () => {
      console.log(`Server on port ${process.env.PORT}`);
    });
    ```
    
- Montez Swagger UI sur `/api-docs/v3`.

### Étape 5 : Configuration des environnements

- `.env.development` et `.env.production`
- `config/index.ts` charge les bons paramètres pour charger la bon BD.

## Bonus (si le temps le permet)

- Pagination et tri dans les listes de produits