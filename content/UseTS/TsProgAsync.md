+++
draft = false
title = 'Programmation asynchrone avec TypeScript'
weight = 43
+++


La **programmation asynchrone** est essentielle en JavaScript et TypeScript, surtout pour les applications qui doivent effectuer des opérations longues comme les appels réseau, la lecture de fichiers, ou l'accès à des bases de données. TypeScript améliore la gestion asynchrone en offrant un support complet des fonctionnalités asynchrones de JavaScript (comme les `promises`, `async/await`) tout en ajoutant des types pour améliorer la sécurité et la lisibilité du code.

## 🔹**Promises**

Les **promesses** sont au cœur de la programmation asynchrone en JavaScript et TypeScript. Elles représentent une opération qui sera complétée à un moment donné (réussie ou échouée).

### Exemple basique avec des promesses :

```tsx
function delay(ms: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject("Invalid time");
    } else {
      setTimeout(() => resolve(`Waited ${ms} milliseconds`), ms);
    }
  });
}

delay(1000)
  .then((message) => {
    console.log(message); // "Waited 1000 milliseconds"
  })
  .catch((error) => {
    console.error(error);
  });
```

Dans cet exemple :

- `delay` retourne une promesse qui est résolue après un certain temps (simulé avec `setTimeout`).
- Si le délai est valide, la promesse est résolue ; sinon, elle est rejetée.

### Typage des promesses :

Les promesses en TypeScript sont typées, ce qui signifie que tu peux indiquer le type de la valeur qu'une promesse résout ou rejette.

```tsx
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
}

fetchData().then((data) => {
  console.log(data); // "Data fetched"
});
```

Ici, TypeScript sait que la promesse retourne une `string`, donc le type de `data` dans `.then()` est automatiquement inféré.

## 🔹**Async/Await**

Les mots-clés **`async`** et **`await`** sont une alternative moderne et plus lisible aux promesses traditionnelles avec `.then()` et `.catch()`. Ils permettent d'écrire du code asynchrone qui ressemble à du code synchrone.

### Exemple d'`async/await` :

```tsx
async function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
}

async function process() {
  try {
    const data = await fetchData();
    console.log(data); // "Data fetched"
  } catch (error) {
    console.error(error);
  }
}

process();
```

Dans cet exemple :

- `fetchData` est une fonction asynchrone qui retourne une promesse.
- `await` est utilisé dans `process()` pour attendre que la promesse soit résolue avant de continuer l'exécution.

## 🔹**Gestion des erreurs dans Async/Await**

Avec `async/await`, la gestion des erreurs est beaucoup plus simple et plus lisible grâce à l'utilisation de `try/catch`.

### Exemple de gestion d'erreurs :

```tsx
async function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error fetching data");
    }, 1000);
  });
}

async function process() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error("Caught an error:", error);
  }
}

process();  // "Caught an error: Error fetching data"
```

Ici, l'utilisation de `try/catch` permet de capturer les erreurs rejetées par la promesse.

## 🔹**Typage des fonctions `async`**

En TypeScript, une fonction `async` retourne toujours une promesse. Le type de la valeur retournée par la promesse est inféré automatiquement ou peut être spécifié explicitement.

### Exemple avec typage explicite :

```tsx
async function fetchData(): Promise<string> {
  return "Fetched data";
}

async function getNumber(): Promise<number> {
  return 42;
}

fetchData().then((data) => console.log(data));  // Fetched data
getNumber().then((num) => console.log(num));  // 42
```

Dans cet exemple, TypeScript sait que `fetchData` retourne une promesse qui résout une `string`, et `getNumber` retourne une promesse qui résout un `number`.

## 🔹**Exécution parallèle avec `Promise.all`**

Pour exécuter plusieurs opérations asynchrones en parallèle et attendre qu'elles soient toutes terminées, tu peux utiliser **`Promise.all`**. Cela est particulièrement utile pour des opérations comme des requêtes réseau multiples.

### Exemple avec `Promise.all` :

```tsx
async function fetchData1(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
}

async function fetchData2(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Data 2"), 2000));
}

async function processAll() {
  const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
  console.log(data1); // "Data 1"
  console.log(data2); // "Data 2"
}

processAll();
```

Dans cet exemple :

- `Promise.all` permet d'attendre que toutes les promesses soient résolues avant de continuer. Les résultats sont renvoyés dans un tableau.

## 🔹**Chaînage de Promises**

Bien que `async/await` soit plus lisible, tu peux toujours chaîner des promesses de manière traditionnelle avec `.then()` et `.catch()`.

### Exemple :

```tsx
function firstPromise(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

function secondPromise(value: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Value received: ${value}`), 1000);
  });
}

firstPromise()
  .then((result) => secondPromise(result))
  .then((message) => console.log(message));  // "Value received: 10"
```

## 🔹**Fonctions asynchrones avec des interfaces**

En TypeScript, il est possible de définir des fonctions asynchrones au sein d'une interface. Cela peut être utile pour garantir qu'une fonction asynchrone respecte une certaine signature.

### Exemple avec une interface :

```tsx
interface ApiService {
  fetchData(): Promise<string>;
}

class DataService implements ApiService {
  async fetchData(): Promise<string> {
    return "Data from API";
  }
}

async function getData(service: ApiService) {
  const data = await service.fetchData();
  console.log(data);
}

const service = new DataService();
getData(service);  // "Data from API"
```

Dans cet exemple, `ApiService` est une interface qui définit une méthode `fetchData()` retournant une promesse, et `DataService` implémente cette interface.

## 🔹**Exemple d'une requête HTTP asynchrone avec `fetch`**

L'une des utilisations les plus courantes de la programmation asynchrone est de faire des requêtes HTTP. Avec TypeScript, tu peux typer ces requêtes pour améliorer la sécurité et la lisibilité.

### Exemple d'utilisation de `fetch` :

```tsx
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const user: User = await response.json();
  return user;
}

async function displayUser(id: number) {
  try {
    const user = await fetchUser(id);
    console.log(`User: ${user.name}, Email: ${user.email}`);
  } catch (error) {
    console.error(error);
  }
}

displayUser(1);
```

Dans cet exemple :

- `fetchUser` est une fonction asynchrone qui utilise `fetch` pour obtenir des données d'une API. Elle est typée pour retourner un objet `User`.
- La gestion des erreurs est incluse pour vérifier si la requête a échoué.

La programmation asynchrone avec TypeScript utilise principalement les **promesses** et les **`async/await`** pour gérer les opérations qui prennent du temps, comme les appels réseau ou les traitements de fichiers. 

<aside>
ℹ️

Il est possible d’utiliser les **Observables** de la librairie **RxJs** à la place des promesses. Voir le document sur la gestion des flux de données avec les Observables.

</aside>

---
## **Exercice :**
Simulez une requête API qui renvoie une liste de films après 3 secondes en utilisant `async` et `await`.
