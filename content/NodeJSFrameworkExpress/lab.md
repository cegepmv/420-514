+++
draft = false
title = 'Laboratoire : Commencer avec Node.js et Express.js'
+++

## 1. Installer Node.js

Assurez-vous que Node.js est installé sur votre machine. Vous pouvez le télécharger depuis [le site officiel de Node.js](https://nodejs.org/).

### Vérifier l’installation :

```bash
node -v
npm -v
```

### Exécuter un script :

```js
// hello.js
console.log("Hello Node.js 🚀");
```

Puis :

```bash
node hello.js
```

## 2. Initialiser un Nouveau Projet Node.js

Ouvrez votre terminal et créez un nouveau dossier pour votre projet. Accédez à ce dossier, puis exécutez la commande suivante pour initialiser un nouveau projet Node.js :

```bash
mkdir mon-projet-express
cd mon-projet-express
npm init -y
```

Le drapeau `-y` accepte les valeurs par défaut pour toutes les options, créant ainsi un fichier `package.json` de base.

## 3. Installer Express.js

Installez Express.js en tant que dépendance dans votre projet :

```bash
npm install express --save 
```
Express facilite la gestion des routes et des réponses.

## 4. Configurer le Serveur Express

Créez un fichier `index.js` dans le dossier racine de votre projet, puis ajoutez-y le code suivant pour configurer un serveur de base avec Express.js :

```jsx
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});
```

## 5. Démarrer le Serveur

Vous pouvez maintenant démarrer votre serveur en exécutant la commande suivante dans votre terminal :

```bash
node index.js
```

Cela démarrera le serveur et affichera `Serveur en écoute sur http://localhost:3000`. Vous pouvez accéder à cette URL via votre navigateur pour voir le message "Hello, World!".

## 6. Installer Nodemon pour un Développement Plus Efficace

Pour un développement plus pratique, vous pouvez installer `nodemon`. Cet outil redémarre automatiquement le serveur à chaque fois que vous modifiez le code :

```bash
npm install -g nodemon
```

Ensuite, au lieu de lancer votre serveur avec `node index.js`, utilisez :

```bash
nodemon index.js
```

Si vous rencontrez cette erreur sur Windows :

![image.png](image.png)

Vous pouvez la restriction de la politique de sécurité avec la commande suivante :

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

On peut aussi démarrer le serveur node en mode `watch-path` pour une mise à jour immédiate à chaque fois un fichier dans le dossier racine change. Il faut donc déplacer votre fichier dans un dossier `src` :

```powershell
node --watch-path=./src .\src\index.js
```

## 7. Structurer Votre Projet

Il est recommandé de structurer votre projet de manière à ce qu'il soit facilement maintenable :

- **`index.js`** : Point d'entrée de l'application.
- **`routes/`** : Contient les fichiers de routage.
- **`controllers/`** : Logique métier.
- **`models/`** : Modèles de données si vous utilisez une base de données.
- **`public/`** : Contient les fichiers statiques comme les CSS, images, etc.
- **`views/`** : Si vous utilisez un moteur de template comme EJS ou Pug.

<aside>
ℹ️ **EJS** et **Pug** sont principalement utilisés pour générer des pages statiques ou semi-dynamiques. Toute interactivité sur la page générée doit être gérée avec JavaScript séparément (souvent via des frameworks comme jQuery ou React).

</aside>

## 8. Ajouter des Middlewares

Vous pouvez ajouter des middlewares pour gérer les requêtes, comme le parsing des corps de requêtes JSON :

```jsx
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

## 9. Ajouter des Routes Supplémentaires

Commençons par ajouter des routes supplémentaires dans votre application. Pour une meilleure organisation, nous allons créer un dossier `routes/` où nous stockerons les différents fichiers de routes.

```jsx
const express = require('express');
const app = express();
const port = 3000;

// Route de base qui renvoie un message de bienvenue
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Express!');
});

// Route pour afficher un message personnalisé
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Bonjour, ${name}!`);
});

// Route qui renvoie les informations sur le serveur
app.get('/info', (req, res) => {
  res.json({
    version: '1.0.0',
    description: 'Ceci est un serveur simple utilisant Express.js',
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});
```

### 9.1 Créer un Fichier de Routes

Créez un fichier `routes/users.js` :

```jsx
const express = require('express');
const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/', (req, res) => {
  res.send('Liste des utilisateurs');
});

// Route pour récupérer un utilisateur par ID
router.get('/:id', (req, res) => {
  res.send(`Utilisateur avec ID ${req.params.id}`);
});

module.exports = router;
```

### 9.2 Utiliser les Routes dans l'Application Principale

Modifiez votre fichier `index.js` pour inclure ces nouvelles routes :

```jsx
const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Utiliser les routes définies dans le fichier users.js
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});
```

## 10. Accès aux fichiers

```js
const fs = require('fs');

// Écriture
fs.writeFileSync('data.txt', 'Hello Node!');

// Lecture
const data = fs.readFileSync('data.txt', 'utf8');
console.log(data);
```

## 11. Asynchrone et Promises

```js
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('data.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
```
