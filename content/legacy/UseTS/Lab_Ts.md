+++
draft = true
title = '🧪 Laboratoire : Intégrer TypeScript avec Express'
weight = 45
+++


La librairie `type-express` (ou parfois appelée `@types/express`) est une collection de définitions de types TypeScript pour la bibliothèque `Express.js`. Elle permet d'utiliser `Express.js` avec TypeScript tout en bénéficiant de l'intelligence du compilateur TypeScript pour la vérification des types, l'autocomplétion, et la documentation inline.

Pour lancer un projet Node.js avec Express en utilisant TypeScript, voici les étapes à suivre :

### 1. Initialiser le projet

Tout d'abord, assurez-vous d'avoir Node.js installé. Ensuite, initialisez un projet Node.js.

```bash
mkdir mon-projet-express-typescript
cd mon-projet-express-typescript
npm init -y
```

### 2. Installer les dépendances

Installez les dépendances pour Express et TypeScript, ainsi que les types pour ces bibliothèques.

```bash
npm install express
npm install typescript ts-node-dev @types/node @types/express --save-dev
```

<aside>
ℹ️

- `typescript` : pour utiliser TypeScript.
- `ts-node-dev` : pour lancer le serveur avec TypeScript et avoir le rechargement automatique (hot-reloading).
- `@types/node` et `@types/express` : types pour Node.js et Express.
</aside>

### 3. Configurer TypeScript

Initialisez un fichier de configuration TypeScript (`tsconfig.json`).

```bash
npx tsc --init
```

Modifiez `tsconfig.json` pour activer les options nécessaires :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]   // Exclure ces répertoires
}
```

### 4. Créer la structure du projet

Créez la structure du projet et les fichiers nécessaires.

```bash
mkdir src
touch src/index.ts
```

### 5. Écrire le code Express en TypeScript

Une fois les types installés, vous pouvez les utiliser directement dans votre code TypeScript en important `express`. 

Dans `src/index.ts`, ajoutez le code suivant pour démarrer un serveur Express simple en TypeScript avec les types intégrés ::

```tsx
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware de parsing du JSON
app.use(express.json());

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});
```

<aside>
ℹ️

- `express` est importé pour utiliser les fonctionnalités d'Express.js.
- `Request` et `Response` sont importés depuis `@types/express` pour annoter les types des objets de requête et de réponse. Cela permet à TypeScript de savoir quelles propriétés et méthodes sont disponibles sur ces objets.
- Vous pouvez utiliser les middlewares et les routes d'`express` tout en bénéficiant de la vérification des types. Par exemple, si vous essayez d'accéder à une propriété qui n'existe pas sur `Request` ou `Response`, TypeScript vous avertira avec une erreur de compilation.
</aside>

### 6. Mettre à jour les scripts dans `package.json`

Ajoutez un script pour démarrer le serveur avec `ts-node-dev` pour le rechargement automatique lors des modifications du code.

```json
{
  "scripts": {
    "start": "ts-node-dev --respawn src/index.ts"
  }
}
```

### 7. Lancer le projet

Enfin, lancez le projet avec la commande suivante :

```bash
npm run start
```

Le serveur Express devrait être accessible sur `http://localhost:3000` et répondre avec "Hello World!" lorsqu'il est visité.

### Pourquoi d'Utiliser `@types/express` ?

- **Vérification des Types** : Assure que les données passées entre les fonctions respectent les types définis, ce qui réduit les erreurs de runtime.
- **Autocomplétion** : L'environnement de développement (comme VSCode) propose l'autocomplétion pour les méthodes et propriétés des objets `Request`, `Response`, et autres objets d'Express.
- **Documentation Inline** : Les types ajoutent de la clarté au code, permettant une meilleure compréhension des méthodes et propriétés disponibles, facilitant ainsi la maintenance.

### Middleware avec des Types

Vous pouvez créer des middlewares typés pour assurer que les types sont correctement vérifiés tout au long de la chaîne de traitement.

```tsx
const logMiddleware = (req: Request, res: Response, next: Function) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logMiddleware);
```

### Utilisation des Interfaces pour Structurer les Données

En combinant TypeScript avec Express, vous pouvez définir des interfaces pour structurer vos données.

```jsx
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
];

// Route pour obtenir tous les utilisateurs
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// Route pour obtenir un utilisateur par ID
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
```

### Gestion des Erreurs Typée

Vous pouvez typer les middlewares de gestion des erreurs pour assurer une meilleure sécurité des types lors de la gestion des exceptions.

```jsx
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// Middleware de gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue', error: err.message });
});

// Exemple de route qui provoque une erreur
app.get('/error', (req: Request, res: Response) => {
  throw new Error('Erreur simulée!');
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
```

## Structure de projet recommandée :

Voici une structure de projet recommandée pour organiser les interfaces ainsi que les autres éléments du projet.

### Structure de Projet TypeScript avec des Interfaces Séparées

```
├── src/
│   ├── interfaces/
│   │   ├── user.interface.ts
│   │   ├── product.interface.ts
│   │   ├── order.interface.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── order.model.ts
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   ├── product.controller.ts
│   │   ├── order.controller.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   ├── routes/
│   │   ├── user.route.ts
│   │   ├── product.route.ts
│   ├── utils/
│   │   ├── logger.ts
│   ├── app.ts
│   ├── index.ts
├── tests/
│   ├── user.test.ts
│   ├── product.test.ts
├── tsconfig.json
├── package.json
└── README.md
```

[Création de la structure proposée](https://www.notion.so/Cr-ation-de-la-structure-propos-e-5a0b468f68de40af8e4303eb1c2b75b8?pvs=21)

### Explication de la Structure

1. **`src/`** : Dossier principal contenant tout le code source du projet.
2. **`interfaces/`** : Ce dossier regroupe toutes les interfaces du projet. Chaque interface est placée dans un fichier séparé et nommée en fonction du domaine auquel elle appartient. Par exemple, les interfaces liées aux utilisateurs se trouvent dans `user.interface.ts`.
    - **Exemple** : `user.interface.ts`
        
        ```tsx
        export interface User {
          id: number;
          name: string;
          email: string;
        }
        ```
        
3. **`models/`** : Contient les modèles de données. Les modèles sont souvent des classes qui implémentent les interfaces définies dans le dossier `interfaces/`.
    - **Exemple** : `user.model.ts`
        
        ```tsx
        import { User } from '../interfaces/user.interface';
        
        export class UserModel implements User {
          constructor(public id: number, public name: string, public email: string) {}
        }
        ```
        
4. **`controllers/`** : Contient les fichiers qui gèrent la logique des routes, c'est-à-dire les contrôleurs. Chaque contrôleur est lié à un domaine spécifique comme les utilisateurs, les produits, etc.
    - **Exemple** : `user.controller.ts`
        
        ```tsx
        import { Request, Response } from 'express';
        import { UserService } from '../services/user.service';
        
        export class UserController {
          public async getAllUsers(req: Request, res: Response): Promise<void> {
            const users = await UserService.getAllUsers();
            res.json(users);
          }
        }
        ```
        
5. **`services/`** : Contient la logique métier, c'est-à-dire les services. Les services sont responsables de l'interaction avec les bases de données, les APIs externes, ou toute autre logique métier.
    - **Exemple** : `user.service.ts`
        
        ```tsx
        import { User } from '../interfaces/user.interface';
        import { UserModel } from '../models/user.model';
        
        export class UserService {
          public static async getAllUsers(): Promise<User[]> {
            // Logique pour récupérer tous les utilisateurs
            return [new UserModel(1, 'John Doe', 'john.doe@example.com')];
          }
        }
        ```
        
6. **`middlewares/`** : Contient les middlewares utilisés par l'application, tels que l'authentification, la gestion des erreurs, etc.
    - **Exemple** : `auth.middleware.ts`
        
        ```tsx
        import { Request, Response, NextFunction } from 'express';
        
        export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
          // Logique d'authentification
          next();
        }
        ```
        
7. **`routes/`** : Ce dossier contient les fichiers de routes qui définissent les points d'entrée (endpoints) de l'application. Ces routes appellent généralement les contrôleurs pour traiter les requêtes.
    - **Exemple** : `user.route.ts`
        
        ```tsx
        import { Router } from 'express';
        import { UserController } from '../controllers/user.controller';
        
        const router = Router();
        const userController = new UserController();
        
        router.get('/users', userController.getAllUsers);
        
        export default router;
        ```
        
8. **`utils/`** : Ce dossier contient des utilitaires ou des fonctions réutilisables comme la gestion des logs, les helpers, etc.
    - **Exemple** : `logger.ts`
        
        ```tsx
        import winston from 'winston';
        
        export const logger = winston.createLogger({
          level: 'info',
          format: winston.format.json(),
          transports: [new winston.transports.Console()],
        });
        ```
        
9. **`tests/`** : Contient les tests unitaires et d'intégration. Chaque test est généralement lié à un fichier source.
    - **Exemple** : `user.test.ts`
        
        ```tsx
        import { UserService } from '../src/services/user.service';
        
        test('should return all users', async () => {
          const users = await UserService.getAllUsers();
          expect(users.length).toBe(1);
        });
        ```
        
        Cet exemple utilise la librairie de test `Jest`, il faut donc l’installer avant : 
        
        ```powershell
        # Installer Jest et ts-jest
        npm install jest ts-jest @types/jest --save-dev
        
        # Initialiser Jest avec TypeScript
        npx ts-jest config:init
        ```
        
10. **`app.ts`** : Fichier d'entrée principal de l'application où l'initialisation d'Express et d'autres configurations de base sont effectuées.
    - **Exemple** :
        
        ```tsx
        import express from 'express';
        import userRoutes from './routes/user.route';
        import productRoutes from './routes/product.route';
        import { errorMiddleware } from './middlewares/error.middleware';
        
        const app = express();
        
        app.use(express.json());
        
        app.use('/api', userRoutes);
        app.use('/api', productRoutes);
        
        app.use(errorMiddleware);
        
        export default app;
        ```
        
11. **`server.ts`** : Fichier pour démarrer le serveur Node.js.
    - **Exemple** :
        
        ```tsx
        import app from './app';
        
        const port = 3000;
        
        app.listen(port, () => {
          console.log(`Serveur en écoute sur <http://localhost>:${port}`);
        });
        ```
        

<aside>
ℹ️

Cette structure de projet permet de séparer les préoccupations (concerns) de manière claire et maintenable. Les interfaces sont isolées dans leur propre dossier (`interfaces/`), ce qui rend le projet modulaire et évolutif. Chaque composant (modèles, contrôleurs, services, etc.) est organisé dans des dossiers dédiés, facilitant ainsi la navigation et la gestion du code dans des projets de grande envergure.

</aside>

## Test de l’Api

![resultat test de l'app](/420-514/images/lab_TS_res.png)


Créez une collection Postman pour tester l'Api.