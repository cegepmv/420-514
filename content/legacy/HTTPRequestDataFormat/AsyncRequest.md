+++
draft = false
title = '🌐 Requêtes asynchrones'
weight = 32
+++


## 🔹 Définition

Une **requête asynchrone** est une requête qui ne bloque pas l’exécution du programme pendant l’attente de la réponse.
Le programme peut continuer à effectuer d’autres tâches, et traite la réponse uniquement lorsqu’elle est disponible (via un mécanisme de notification, callback, promesse, ou événement).


## 🔹 Pourquoi asynchrone ?

* **Performance** : éviter qu’une application soit bloquée par une opération lente (accès réseau, lecture disque).
* **Scalabilité** : permettre à un serveur de gérer plusieurs connexions simultanées.
* **Expérience utilisateur** : garder les interfaces réactives (ex. : chargement d’un contenu sans recharger toute la page).


## 🔹 Cas d’utilisation

* **Web** : AJAX (Asynchronous JavaScript and XML) pour charger des données sans recharger la page.
* **Applications mobiles** : appel à une API distante tout en maintenant l’interface fluide.
* **Systèmes distribués** : communication entre microservices.
* **Base de données** : requêtes envoyées en tâche de fond.


## 🔹 Comparaison avec les requêtes synchrones

* **Synchrone** : le programme attend la fin de la requête avant de continuer → simple, mais bloquant.
* **Asynchrone** : le programme envoie la requête, continue d’exécuter d’autres instructions, puis gère la réponse quand elle arrive.


## 🔹 Modes de gestion

1. **Callbacks** : fonction appelée quand la réponse arrive.
2. **Promesses** : objet représentant une valeur future (résolue ou rejetée).
3. **async/await** : syntaxe moderne pour écrire du code asynchrone de manière lisible.
4. **Événements/observables** : modèle réactif, utile pour gérer des flux continus de données.

## 🔹 Exemple générique (pseudo-code)

```pseudo
print("Début du programme")

envoyer requête asynchrone à l’API:
    quand la réponse est reçue:
        afficher("Réponse :", données)

print("Fin du programme (la réponse arrivera plus tard)")
```

👉 Résultat : le programme affiche **“Début”** et **“Fin”** immédiatement, puis seulement après l’arrivée de la réponse, il affiche les données.

## 🔹 Exemples :
Ci-dessous un exemple simple de requête asynchrone pour chacun des modes de gestion(callbacks, promesses, async/await, événements/observables).

### 🔹 1. Callbacks

C’est le style historique : on passe une **fonction de rappel** qui sera exécutée quand la réponse arrive.

```js
function getDataCallback(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => callback(null, data))   // succès
    .catch(err => callback(err, null));   // erreur
}

console.log("Début");
getDataCallback("https://jsonplaceholder.typicode.com/posts/1", (err, data) => {
  if (err) {
    console.error("Erreur :", err);
  } else {
    console.log("Réponse (callback) :", data);
  }
});
console.log("Fin (le callback arrivera plus tard)");
```

### 🔹 2. Promises

Une **promesse** représente une valeur qui sera disponible plus tard. On utilise `.then()` et `.catch()`.

```js
console.log("Début");
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log("Réponse (promise) :", data))
  .catch(err => console.error("Erreur :", err));
console.log("Fin");
```

### 🔹 3. async/await

Syntaxe moderne qui rend le code asynchrone **plus lisible**, comme du code synchrone.

```js
async function getData() {
  try {
    console.log("Début");
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log("Réponse (async/await) :", data);
    console.log("Fin");
  } catch (err) {
    console.error("Erreur :", err);
  }
}
getData();
```

### 🔹 4. Événements / Observables

Dans ce mode, la donnée arrive sous forme de **flux continu** (par exemple WebSocket, ou un Observable RxJS).
Chaque réponse est **émise comme un événement**, et on y réagit avec un **listener**.

#### Exemple avec `EventEmitter` en Node.js :

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Abonnement à l'événement "data"
emitter.on('data', (msg) => {
  console.log("Donnée reçue (event) :", msg);
});

// Simulation d’arrivée asynchrone
console.log("Début");
setTimeout(() => emitter.emit('data', { id: 1, text: "Bonjour 👋" }), 1000);
console.log("Fin (les données arrivent en événement)");
```

#### Exemple RxJS (Observables) :

```js
import { fromFetch } from "rxjs/fetch";
import { switchMap } from "rxjs";

console.log("Début");
fromFetch("https://jsonplaceholder.typicode.com/posts/1")
  .pipe(switchMap(res => res.json()))
  .subscribe({
    next: data => console.log("Réponse (observable) :", data),
    error: err => console.error("Erreur :", err),
    complete: () => console.log("Flux terminé"),
  });
console.log("Fin");
```

## Notion d’asynchronisme avec Node.js

En Node.js, la majorité des opérations liées aux échanges de données (fichiers, réseau, API, base de données) sont asynchrones.

Cela signifie que le programme ne bloque pas pendant l’attente d’une réponse : il continue à exécuter d’autres instructions et reprend le traitement lorsque le résultat est disponible.

Ce comportement repose sur la boucle d’événements (event loop).

**Pour résumé** :
Les requêtes asynchrones permettent de **séparer l’envoi et la réception** d’une requête, optimisant ainsi la performance, la réactivité et la capacité à traiter plusieurs opérations en parallèle.

Résumé des modes de gestion des rquêtes asynchrones :
* **Callback** : fonction déclenchée quand la réponse arrive.
* **Promise** : objet représentant un résultat futur (succès ou erreur).
* **async/await** : syntaxe simplifiée basée sur les promesses.
* **Événements/Observables** : idéal pour flux continus de données.

## Autres ressources :
[MDN : 
Introduction au JavaScript asynchrone](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Async_JS/Introducing)
