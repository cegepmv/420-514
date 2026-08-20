+++
draft = false
title = 'Génériques en TypeScript'
weight = 44
+++


## 🔹Génériques en TypeScript

Les **génériques** en TypeScript sont un outil puissant qui permet de créer des composants réutilisables tout en conservant une sécurité de typage. Ils permettent de définir des fonctions, des classes, des interfaces ou des types qui fonctionnent avec **n'importe quel type**, tout en offrant une flexibilité pour spécifier le type exact lors de l'utilisation.

Les génériques sont particulièrement utiles lorsque l'on souhaite écrire du code qui peut fonctionner avec plusieurs types sans sacrifier la sécurité et la clarté des types.

## 🔹**Fonctions génériques**

Les fonctions génériques permettent d'écrire des fonctions qui fonctionnent avec différents types tout en garantissant le type correct lors de l'utilisation.

### Exemple basique d'une fonction générique :

```tsx
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("Hello"); // "Hello"
const numberResult = identity<number>(42);       // 42
```

Dans cet exemple :

- `T` est un **paramètre de type générique**.
- La fonction `identity` retourne le même type qu'elle reçoit, et le type est déterminé au moment de l'appel de la fonction (`string` ou `number` dans cet exemple).

### Utilisation de l'inférence de types :

TypeScript est capable d'inférer le type générique si ce n'est pas explicitement spécifié.

```tsx
const inferredString = identity("World");  // TypeScript infère que T est string
```

## 🔹**Classes génériques**

Les **classes génériques** permettent de créer des classes qui peuvent travailler avec différents types de données tout en conservant la sécurité des types.

### Exemple d'une classe générique :

```tsx
class Box<T> {
  content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }
}

const stringBox = new Box<string>("Hello");
console.log(stringBox.getContent());  // "Hello"

const numberBox = new Box<number>(123);
console.log(numberBox.getContent());  // 123
```

Dans cet exemple, la classe `Box` est générique et peut être instanciée avec différents types (`string`, `number`, etc.).

## 🔹**Interfaces génériques**

Les **interfaces génériques** permettent de décrire des structures de données qui dépendent d'un type variable.

### Exemple d'une interface générique :

```tsx
interface Pair<T, U> {
  first: T;
  second: U;
}

const numberPair: Pair<number, number> = { first: 1, second: 2 };
const mixedPair: Pair<string, number> = { first: "Alice", second: 25 };
```

Dans cet exemple, l'interface `Pair` accepte deux types génériques (`T` et `U`) qui permettent de créer des paires de différents types.

## 🔹**Contraintes sur les types génériques**

Il est possible de restreindre les types génériques à certains types ou à des interfaces spécifiques en utilisant le mot-clé `extends`.

### Exemple avec une contrainte de type :

```tsx
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength({ length: 10, value: "Hello" }); // Fonctionne
// logLength(3);  // Erreur car le nombre n'a pas de propriété 'length'
```

Dans cet exemple, le type `T` est contraint à être un type qui possède une propriété `length` (comme une chaîne de caractères ou un tableau).

## 🔹**Types génériques par défaut**

On peut aussi définir des valeurs par défaut pour les types génériques si aucun type n'est spécifié lors de l'appel de la fonction ou de l'instanciation de la classe.

### Exemple avec type par défaut :

```tsx
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const stringArray = createArray(3, "Hello"); // Type inferé est string[]
const numberArray = createArray<number>(3, 42); // Spécifie explicitement number[]
```

Dans cet exemple, si aucun type n'est spécifié, TypeScript utilise `string` par défaut pour le type générique.

## 🔹**Fonctions génériques avec plusieurs types**

Il est possible d'utiliser plusieurs types génériques dans une même fonction ou classe.

### Exemple avec plusieurs types génériques :

```tsx
function combine<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

const combined = combine<string, number>("Alice", 25); // ["Alice", 25]
```

Dans cet exemple, la fonction `combine` prend deux arguments de types différents `T` et `U` et retourne un tableau contenant les deux valeurs.

## 🔹**Types génériques dans les classes utilitaires**

Les génériques sont souvent utilisés dans des classes utilitaires comme les collections ou les types de données complexes.

### Exemple d'une pile (stack) générique :

```tsx
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop());  // 20

const stringStack = new Stack<string>();
stringStack.push("A");
stringStack.push("B");
console.log(stringStack.pop());  // "B"
```

Dans cet exemple, la classe `Stack` peut être utilisée avec n'importe quel type, et les opérations `push` et `pop` sont sécurisées par rapport au type des éléments de la pile.

## 🔹**Utilisation des génériques dans les Promises**

Les **Promises** en TypeScript sont également génériques, et cela permet de garantir que les valeurs résolues par la promesse sont du bon type.

### Exemple avec `Promise` :

```tsx
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data fetched"), 1000);
  });
}

fetchData().then((data) => {
  console.log(data);  // TypeScript sait que `data` est une `string`
});
```

Dans cet exemple, la promesse est typée pour retourner une `string`, ce qui garantit que le type de `data` dans `.then()` sera correctement inféré.

## 🔹**Génériques avec des clés de type d'objet**

TypeScript permet d'utiliser des génériques avec des objets pour accéder aux clés et valeurs d'un objet de manière dynamique et typée.

### Exemple avec des clés d'objet :

```tsx
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 25 };

const name = getProperty(person, "name");  // name est de type string
const age = getProperty(person, "age");    // age est de type number
```

Dans cet exemple, `K` est contraint à être une clé de l'objet `T`, et la fonction retourne le type correct pour la propriété demandée (`string` pour `name` et `number` pour `age`).

## 🔹**Utilisation avancée : Génériques conditionnels**

TypeScript permet également d'utiliser des types conditionnels pour manipuler les types en fonction des types passés à un générique.

### Exemple avec un type conditionnel :

```tsx
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false
```

Dans cet exemple, le type `IsString<T>` vérifie si le type `T` est une `string` et renvoie `true` ou `false` en fonction de cela.

**Exercice :**
Créez une fonction générique `purge<T>` qui prend un tableau d'éléments et en retire un certain nombre.

---

### Exercice supplémentaire :

Créez une petite application web en TypeScript qui affiche une liste de films et permet de filtrer ces films par réalisateur, année ou genre.

---

## Références

[JavaScript With Syntax For Types.](https://www.typescriptlang.org/)