+++
draft = false
title = '📘 NodeJs'
weight = 21
+++


## Introduction à Node.js
### Historique
Avant 2009 le langage (JavaScript) n'était utilisé qu'au côté client et ne peut être exécuté que dans le navigateur (browser) 
Le code JavaScript était donc cantonné au côté client. Il servait à :
- manipuler le DOM (Document Object Model),
- valider des formulaires,
- créer des animations simples,
- ajouter de l’interactivité à la page.

⚠️ Aucune possibilité de gérer :

- des fichiers sur le serveur,
- une base de données,
- un système de fichiers ou un réseau.

Tout cela était réservé aux langages côté serveur (PHP, Java, Python, C#, etc.).

![Browser runtine enviroment and engine](/420-514/images/Browser_runtine_env-engine.png)

En 2009, Ryan Dahl introduit Node.js, une innovation qui a changé l’histoire de JavaScript.
Node.js reprend le moteur V8 de Google Chrome (rapide et optimisé en C++).

![Chrome Node V8](/420-514/images/Node_Chrome_V8.png)

Il l’embarque en dehors du navigateur, créant un nouvel environnement d’exécution JavaScript côté serveur.
Avec Node.js, JavaScript peut enfin :
- lire et écrire dans des fichiers,
- gérer des connexions réseau,
- dialoguer avec des bases de données,
- exécuter des applications serveur complètes.

👉 Environnement d’exécution = Node.js (hors navigateur)

👉 Moteur = V8, mais intégré dans un cadre élargi avec des API système.

{{% notice warning "Attention : moteur <> environnement" %}} 

* Moteur JavaScript : logiciel qui traduit le code JavaScript en instructions machine. (Ex. : V8, SpiderMonkey).
* Environnement d’exécution : contexte dans lequel s’exécute le code, incluant le moteur + les API disponibles.
* Dans le navigateur : API DOM, événements, cookies…
* Dans Node.js : API fichiers, réseau, processus, modules système…{{% /notice %}}

### Que'est-ce que c'est Node.js ?
**Node.js** est un environnement d'exécution open-source pour créer des applications et outils côté serveur en JavaScript (tel que les APIs), utilisé hors navigateur (directement sur l'ordinateur ou le serveur). Node se distingue par d'excellentes performances, un code uniquement en JavaScript, et un vaste écosystème via NPM, ce qui simplifie le développement d'applications web performantes.

![Serveur nodeJS](/420-514/images/clientServerNodeExchange.png)

Source : [https://app.pluralsight.com/library/courses/nodejs-express-foundations/description](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)

### Avantages de Node.js

- **Performance** : Optimisé pour les applications web évolutives, notamment en temps réel.
- **Un langage unique** : JavaScript est utilisé à la fois côté client et serveur.
- **Écosystème NPM** : Accès à de nombreuses bibliothèques réutilisables.

### Installer Node js

Pour installer Node Js aller sur le lien suivant : [https://nodejs.org/fr/download/package-manager](https://nodejs.org/fr/download/package-manager) 

### Exemples de code

**Hello Node.js** : Un exemple simple de serveur web Node.js qui répond "Salut tout le monde".

```jsx

function sayHello(name) {
    console.log(`Hello ${name}!`);
}

sayHello('students');
```

---
### Le système node module

#### 🌍 Les objets globaux : Navigateur vs Node.js

 ##### Dans le navigateur

* L’environnement d’exécution est le **navigateur**.
* L’objet global est : **`window`**.
* Tous les objets, fonctions ou variables globales sont **attachés à `window`**.

Exemple :

```js
console.log(window.document); // Accède au DOM
window.alert("Bonjour depuis le navigateur !");
```

##### Dans Node.js

* L’environnement d’exécution est **Node.js** (hors navigateur).
* L’objet global est : **`global`**.
* Tous les objets et fonctions globales comme :
  - `console.log()` 
  - `setTimeout()`
  - `clearTimeout()`
  - `setInterval()`
  - `clearInterval()`
  - etc.

sont **attachés à `global`**.

Exemple :

```js
global.console.log("Salut depuis Node.js 👋");

setTimeout(() => {
  global.console.log("Ceci s’exécute après 1 seconde");
}, 1000);
```

⚠️ Dans Node.js, il n’y a pas de `window` ni de `document` → pas de DOM.


> Node.js fournit aussi un alias **`globalThis`**, qui est un standard JavaScript moderne : 
    ```js
    globalThis.console.log("Salut avec globalThis");
    ```

👉 Ainsi, on a :

* Navigateur : `window === globalThis` ✅
* Node.js : `global === globalThis` ✅


en résumé

| Contexte            | Objet global | Exemple                       |
| ------------------- | ------------ | ----------------------------- |
| Navigateur          | `window`     | `window.alert("Bonjour")`     |
| Node.js             | `global`     | `global.console.log("Salut")` |
| Standard (les deux) | `globalThis` | `globalThis.setTimeout(...)`  |


#### 📦 Les modules en Node.js
En node chaque fichier est un module et les fonctions ainsi que les variables définies dans ce fichier ne sont disponible qu'à l'interieur de ce module. 
Cela permet :
- d’organiser le code en plusieurs fichiers,
- d’éviter la duplication,
- de partager des fonctionnalités entre projets.

#####  Types de modules dans Node.js
1. **Modules internes (built-in)**

   * Déjà fournis avec Node.js.
   * Exemples :

     * `fs` (fichiers),
     * `http` (serveur web),
     * `path` (chemins de fichiers),
     * `os` (système d’exploitation).

   ```js
   const fs = require('fs');
   fs.writeFileSync('test.txt', 'Bonjour Node.js !');
   ```

2. **Modules locaux (créés par nous)**

   * Nos propres fichiers `.js`.
   * Exemple :

   ```js
   // fichier math.js
   function addition(a, b) {
     return a + b;
   }
   module.exports = addition;
   ```

   ```js
   // fichier app.js
   const addition = require('./math');
   console.log(addition(2, 3)); // 5
   ```

3. **Modules tiers (installés avec npm)**

   * Modules créés par la communauté.
   * Exemple : `express`, `lodash`, `mongoose`.

   ```bash
   npm install express
   ```

   ```js
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => res.send('Hello Express 🚀'));
   app.listen(3000);
   ```

##### 📦Systèmes de modules

###### a) CommonJS (historiquement utilisé par Node.js)

* Utilise `require()` pour importer.
* Utilise `module.exports` pour exporter.

```js
// math.js
module.exports = {
  addition: (a, b) => a + b,
  multiplication: (a, b) => a * b
};
```

```js
// app.js
const math = require('./math');
console.log(math.addition(2, 3));
```

###### b) ES Modules (standard moderne JavaScript)

* Utilise `import` / `export`.
* Nécessite d’ajouter `"type": "module"` dans `package.json`.

```js
// math.mjs
export function addition(a, b) {
  return a + b;
}
```

```js
// app.mjs
import { addition } from './math.mjs';
console.log(addition(4, 5));
```

Voici un résumé comparatif

| Type de module                    | Exemple import                   | Exemple export                                |
| --------------------------------- | -------------------------------- | --------------------------------------------- |
| **CommonJS** (par défaut Node.js) | `const x = require('./fichier')` | `module.exports = ...`                        |
| **ES Module** (standard moderne)  | `import x from './fichier.js'`   | `export default ...` ou `export function ...` |


### Utilisation des Modules

Les modules permettent d'organiser et réutiliser le code. Vous pouvez créer et importer des modules en utilisant `require()`.

**Exemple de module :**

```jsx
exports.area = function (width) {
  return width * width;
};

exports.perimeter = function (width) {
  return 4 * width;
};
```

Ou

```jsx
// dans mathOperations.js

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division par zéro');
  }
  return a / b;
}

// Export des fonctions pour les rendre disponibles dans d'autres fichiers
module.exports = {
  add,
  subtract,
  multiply,
  divide
};
```


Exemple d'un simple serveur

```jsx
const http = require("http");
const hostname = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Salut tout le monde");
});

server.listen(port, hostname, () => {
  console.log(`Le serveur tourne à l'adresse http:\\${hostname}:${port}/`);
});
```
##### Gestion des paquets avec npm

- Initialiser un projet : `npm init -y`
- Installer un module : `npm install express`
- Sauvegarder en dépendances dans `package.json`.

Scripts personnalisés :
```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```
---

### Lire et écrire dans des fichiers
Node.js fournit le module fs (File System) :
```js
// files.js
const fs = require('fs');

// Écriture
fs.writeFileSync('message.txt', 'Bonjour Node.js !');

// Lecture
const data = fs.readFileSync('message.txt', 'utf8');
console.log("Contenu du fichier :", data);
```

### Asynchronisme en Node.js

Node.js excelle dans les opérations asynchrones (lecture de fichiers, accès réseau).
```js
// async.js
const fs = require('fs');

fs.readFile('message.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log("Lecture asynchrone :", data);
});

console.log("Cette ligne s’affiche avant la lecture du fichier !");
```

👉 Résultat : la lecture se fait en arrière-plan, pendant que le reste du code continue à s’exécuter.

### Gestion des événements (EventEmitter)

Node.js est basé sur un modèle événementiel.
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('salut', (nom) => {
  console.log(`Bonjour ${nom} !`);
});

emitter.emit('salut', 'Alice');
```

👉 Utile pour créer des systèmes réactifs (logs, notifications, etc.).

---

## Liens utiles :

Site de Node.js : 

[Node.js — Exécuter du JavaScript partout](https://nodejs.org/fr)

[Documentation officielle de Node.js](https://nodejs.org/docs/latest/api/)

Formation : [https://app.pluralsight.com/library/courses/nodejs-express-foundations](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)