+++
draft = false
title = 'Introduction à TypeScript'
weight = 41
+++

## 🔹Qu’est-ce que TypeScript ?

TypeScript est un langage de programmation open-source, c’est un sur-ensemble de JavaScript qui ajoute la vérification statique des types, ce qui signifie que les types de données sont définis explicitement lors de l'écriture du code.

TypeScript met l'accent sur le typage fort et vous permet d'écrire du code plus sûr : lisible, moins sujet aux erreurs et plus facile à maintenir.

## 🔹Pourquoi utiliser TypeScript plutôt que JavaScript ?

Utiliser TypeScript plutôt que JavaScript présente plusieurs avantages, notamment pour les projets complexes ou de grande envergure. Voici quelques uns :

### 1. **Typage statique** :

- **JavaScript** : Le typage est dynamique, ce qui signifie que les types de variables peuvent changer au fil de l'exécution. Cela peut entraîner des erreurs difficiles à détecter, notamment dans de gros projets où des erreurs de type peuvent se propager.
- **TypeScript** : Le typage statique signifie que les types sont vérifiés à la compilation. Si une variable est définie comme un nombre (`number`), elle ne pourra pas être utilisée comme une chaîne de caractères (`string`). Cela permet de détecter de nombreuses erreurs avant même l'exécution.

### Exemple :

```jsx
// JavaScript
let x = 10;
x = 'hello';  // Pas d'erreur dans JavaScript, même si c'est incohérent.
```

```tsx
// TypeScript
let x: number = 10;
x = 'hello';  // Erreur à la compilation : Type 'string' is not assignable to type 'number'.
```

### 2. **Détection d'erreurs plus rapide** :

- **JavaScript** : Les erreurs liées aux types et aux incohérences logiques ne sont souvent détectées qu'au moment de l'exécution, ce qui peut rendre le débogage plus difficile.
- **TypeScript** : Grâce à la compilation et à la vérification des types avant l'exécution, TypeScript aide à attraper ces erreurs en amont. Cela permet de réduire les bugs en production.

### Exemple :

```tsx
function multiply(a: number, b: number): number {
  return a * b;
}

multiply(5, '10');  // Erreur à la compilation car '10' est une chaîne et non un nombre.
```

### 3. **Meilleure lisibilité et maintenabilité** :

- **JavaScript** : Sans typage statique, il peut être difficile de comprendre rapidement quelles sont les structures de données attendues, surtout dans un grand projet où de nombreuses fonctions et objets sont en interaction.
- **TypeScript** : Avec les annotations de types, il est plus facile de comprendre ce que fait une fonction ou quelles propriétés un objet doit avoir. Cela rend le code plus explicite et aide les équipes à maintenir de grands projets à long terme.

### Exemple :

```tsx
interface User {
  name: string;
  age: number;
  email?: string;  // propriété optionnelle
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}
```

Dans cet exemple, l'interface `User` définit clairement la structure de l'objet, rendant le code plus facile à comprendre et à maintenir.

### 4. **Support des outils de développement** :

- **JavaScript** : Bien qu'il existe de nombreux bons outils pour JavaScript, la nature dynamique du langage limite certaines fonctionnalités avancées, comme l'auto-complétion précise ou la navigation facile dans le code.
- **TypeScript** : Les éditeurs comme Visual Studio Code bénéficient énormément des informations de type fournies par TypeScript. Cela améliore l'auto-complétion, les suggestions de code, la documentation en ligne et la navigation à travers les fichiers.

### Exemple :

Lorsque tu passes la souris sur une variable ou une fonction dans un éditeur comme VS Code avec TypeScript, tu obtiens des informations sur les types, les arguments attendus et les types de retour, ce qui facilite l'écriture de code.

### 5. **Support de fonctionnalités modernes de JavaScript** :

- **JavaScript** : Les nouvelles fonctionnalités de JavaScript (ES6, ESNext) peuvent être utilisées, mais cela dépend du support des environnements d'exécution ou de la compatibilité avec les anciens navigateurs.
- **TypeScript** : TypeScript compile le code vers une version spécifique de JavaScript (comme ES5 ou ES6). Cela permet d'utiliser les fonctionnalités les plus récentes de JavaScript tout en garantissant la compatibilité avec les anciens environnements.

### Exemple :

TypeScript te permet d'utiliser des fonctionnalités comme les **async/await**, les **classes**, les **modules**, même si on doit prendre en charge des environnements qui n'ont pas encore adopté ces fonctionnalités.

### 6. **Programmation orientée objet** :

- **JavaScript** : JavaScript est un langage orienté prototype, et bien qu'il prenne en charge la POO avec les classes ES6, son support n'est pas aussi strict.
- **TypeScript** : TypeScript introduit une POO plus formelle avec des classes, des interfaces, des modificateurs d'accès (`public`, `private`, `protected`), et des constructeurs qui facilitent l'encapsulation et la réutilisation de code de manière plus structurée.

### Exemple :

```tsx
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const john = new Person('John');
console.log(john.getName());  // John
```

### 7. **Interopérabilité avec JavaScript** :

- **JavaScript** : C'est la base de TypeScript, donc tout code JavaScript valide est également valide en TypeScript.
- **TypeScript** : TypeScript permet d'utiliser du code JavaScript existant, ce qui facilite la transition progressive. Tu peux convertir un projet JavaScript en TypeScript de manière incrémentale, sans tout réécrire d'un coup.

### Exemple :

```tsx
// Fichier JavaScript que tu peux migrer progressivement
const greet = (name) => {
  console.log(`Hello, ${name}`);
};

greet('Alice');  // Fonctionne en TypeScript aussi
```

### 8. **Écosystème de types** :

- **JavaScript** : Les bibliothèques et frameworks sont écrits en JavaScript, mais il peut être difficile de savoir exactement quels types de données sont attendus par ces bibliothèques.
- **TypeScript** : Grâce aux définitions de types fournies par les fichiers `@types`, on peut avoir une meilleure connaissance des types utilisés par des bibliothèques comme Express, React, ou même des API tiers, ce qui nous permet d’intégrer ces bibliothèques tout en conservant la sécurité des types.

### Exemple :

```tsx
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});
```

Ici, TypeScript te donne un support de typage pour les objets `Request` et `Response` d'Express, rendant ton code plus robuste.

### 9. **Grande communauté et adoption croissante** :

- **JavaScript** : Il reste largement utilisé et est essentiel pour le développement web.
- **TypeScript** : Grâce à sa compatibilité avec JavaScript et ses nombreux avantages, TypeScript a été massivement adopté par de grandes entreprises comme Microsoft, Google, et même des projets open-source comme Angular et Vue.js. Cela crée un écosystème riche avec une communauté active.

On peut dire que **TypeScript** offre une expérience de développement plus sécurisée, plus robuste et plus maintenable, surtout pour les projets complexes ou à long terme. Il aide à réduire les bugs, à améliorer la productivité grâce à des outils de développement avancés et à rendre le code plus lisible et plus structuré. Cependant, il demande une phase de compilation supplémentaire, et la courbe d’apprentissage peut être plus raide pour ceux qui viennent du pur JavaScript.

## 🔹Installation et configuration d'un environnement de développement TypeScript

### **Intégration TypeScript dans un projet Node.js/Express**

L'intégration de TypeScript dans un projet Node.js/Express est assez simple. Voici les étapes :

1. **Initialiser le projet** :
Si tu n’as pas encore de projet Node.js/Express, initialise-le avec `npm` :
    
    ```bash
    npm init -y
    ```
    
2. **Installer TypeScript et les types pour Node et Express** :
    
    ```bash
    npm install express
    npm install typescript @types/node @types/express ts-node-dev --save-dev
    
    ```
    
3. **Créer un fichier de configuration `tsconfig.json`** :
    
    ```bash
    npx tsc --init
    ```
    
    Cela génère un fichier de configuration TypeScript qui peut être ajusté en fonction des besoins. Voici un exemple basique :
    
    ```json
    {
      "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "strict": true
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules"]
    }
    ```
    
4. **Créer une structure de répertoire TypeScript** :
Dans le dossier `src`, tu peux créer tes fichiers `.ts`. Par exemple, un fichier `src/index.ts` pour ton serveur Express :
    
    ```tsx
    import express, { Request, Response } from 'express';
    
    const app = express();
    const port = 3000;
    
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello TypeScript with Express!');
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    ```
    
5. **Lancer le projet avec TypeScript** :
Tu peux utiliser `ts-node-dev` pour lancer ton serveur avec TypeScript :
    
    ```bash
    npx ts-node-dev src/index.ts
    ```
    

## 🔹Les types de base et déclarations de variables

### 1. **Déclaration de variables**

En TypeScript, tu peux déclarer des variables de plusieurs façons similaires à JavaScript, mais avec la possibilité de spécifier explicitement les types.

- **`let`** : Déclare une variable dont la valeur peut être modifiée.
- **`const`** : Déclare une variable constante, dont la valeur ne peut pas être réassignée.
- **`var`** : Ne doit plus être utilisé car `let` et `const` sont préférés pour éviter les comportements inattendus liés à l'étendue de la variable.

#### Exemple :

```tsx
let age: number = 30;   // variable modifiable
const name: string = "Alice";   // variable constante
```

### 2. **Les types de base**

Voici les types primitifs de base les plus courants en TypeScript :

#### a. **`number`** : pour les nombres

Tous les nombres en TypeScript (qu'ils soient entiers ou décimaux) sont de type `number`.

```tsx
let age: number = 25;
let price: number = 19.99;
```

#### b. **`string`** : pour les chaînes de caractères

Les chaînes de caractères sont définies avec des guillemets simples ou doubles.

```tsx
let name: string = "Alice";
let greeting: string = `Hello, ${name}`;  // utilisation des template strings
```

#### c. **`boolean`** : pour les valeurs booléennes

Le type `boolean` accepte les valeurs `true` et `false`.

```tsx
let isStudent: boolean = true;
let hasGraduated: boolean = false;
```

#### d. **`array`** : pour les tableaux

Les tableaux peuvent être typés pour contenir un type spécifique d'éléments. Deux syntaxes sont possibles :

1. Utilisation des crochets `[]` :
    
    ```tsx
    let numbers: number[] = [1, 2, 3, 4];
    let names: string[] = ["Alice", "Bob", "Charlie"];
    ```
    
2. Utilisation du type `Array<type>` :
    
    ```tsx
    let numbers: Array<number> = [1, 2, 3, 4];
    let names: Array<string> = ["Alice", "Bob", "Charlie"];
    ```
    

#### e. **`tuple`** : pour les tableaux de longueurs fixes avec des types prédéfinis pour chaque élément

Un `tuple` est un tableau avec un nombre d'éléments fixe, où chaque élément peut avoir un type différent.

```tsx
let person: [string, number] = ["Alice", 25];
```

Dans cet exemple, le premier élément du tuple est une chaîne et le second est un nombre.

#### f. **`enum`** : pour les ensembles de valeurs nommées

Les énumérations (`enum`) permettent de définir un ensemble de valeurs nommées. Par défaut, elles sont numérotées à partir de 0, mais tu peux aussi attribuer des valeurs personnalisées.

```tsx
enum Color {
  Red,     // 0
  Green,   // 1
  Blue     // 2
}

let myColor: Color = Color.Green;
console.log(myColor);  // 1
```

Avec des valeurs personnalisées :

```tsx
enum Status {
  Active = 1,
  Inactive = 0,
  Pending = -1
}

let userStatus: Status = Status.Active;
console.log(userStatus);  // 1
```

#### g. **`any`** : pour désactiver la vérification des types

Le type `any` désactive la vérification des types et permet de stocker des valeurs de n’importe quel type. À utiliser avec précaution, car cela peut annuler les avantages du typage statique.

```tsx
let randomValue: any = 10;
randomValue = "Hello";  // autorisé
randomValue = true;     // autorisé

```

#### h. **`void`** : pour les fonctions sans valeur de retour

Le type `void` est utilisé pour spécifier qu'une fonction ne retourne rien.

```tsx
function logMessage(message: string): void {
  console.log(message);
}

```

#### i. **`null` et `undefined`** : pour l'absence de valeur

TypeScript a des types spécifiques pour `null` et `undefined`. Par défaut, une variable de type `null` ou `undefined` n'est pas assignable à d'autres types à moins que le mode strict soit désactivé ou explicitement défini.

```tsx
let u: undefined = undefined;
let n: null = null;
```

#### j. **`object`** : pour tout type qui n’est ni un type primitif

Le type `object` est utilisé pour désigner tout type qui n'est ni `number`, `string`, `boolean`, `symbol`, `null`, ni `undefined`.

```tsx
let person: object = { name: "Alice", age: 25 };
```

### 3. **Déclarations de types personnalisés**

#### a. **Type unions**

Les unions permettent de combiner plusieurs types. Une variable de type union peut prendre plusieurs types de valeurs.

```tsx
let id: number | string;
id = 123;    // valide
id = "ABC";  // valide
```

#### b. **Alias de type**

Les alias de type permettent de définir un nom pour un ensemble de types. Cela rend le code plus lisible, surtout pour les types complexes.

```tsx
type UserId = number | string;
let userId: UserId;
userId = 123;     // valide
userId = "ABC";   // valide
```

### 4. **Type inference (inférence de type)**

TypeScript est capable de déduire les types sans que tu aies besoin de les spécifier explicitement. Par exemple, si tu initialises une variable avec un nombre, TypeScript comprendra qu'elle est de type `number`.

#### Exemple :

```tsx
let age = 30;  // TypeScript infère automatiquement que `age` est de type `number`.
age = "30";    // Erreur, car `age` est supposé être un nombre.
```

### 5. **Types littéraux**

Un type littéral permet de restreindre les valeurs qu'une variable peut prendre à des valeurs spécifiques.

```tsx
let direction: "left" | "right" | "up" | "down";
direction = "left";  // valide
direction = "center";  // Erreur, "center" n'est pas un type valide
```

### 6.  **Annotations** et **l'inférence de types**

En TypeScript, il existe deux méthodes principales pour gérer les types : **les annotations de types** et **l'inférence de types**.

#### a. **Annotations de types**

Les **annotations de types** permettent de spécifier explicitement le type d'une variable, d'un paramètre de fonction ou de la valeur de retour d'une fonction. Cela aide à renforcer la sécurité des types et à rendre le code plus lisible.

#### Exemple basique :

```tsx
let age: number = 30;
let name: string = "Alice";
let isStudent: boolean = true;
```

Dans cet exemple :

- `age` est explicitement annoté comme un `number`.
- `name` est un `string`.
- `isStudent` est un `boolean`.

Les annotations peuvent également être utilisées dans les fonctions pour spécifier les types des paramètres et des valeurs de retour.

#### Exemple avec fonction :

```tsx
function greet(name: string): string {
  return `Hello, ${name}`;
}

let message: string = greet("Alice");  // "Hello, Alice"
```

Ici :

- Le paramètre `name` doit être de type `string`.
- La fonction retourne une valeur de type `string`.

#### Avantages des annotations de types :

- Elles rendent le code plus **prévisible** et plus facile à comprendre.
- Elles permettent d'attraper les erreurs liées aux types **avant l'exécution**.
- Elles offrent un contrôle total sur les types utilisés dans le code.

#### b. **Inférence de types**

L'**inférence de types** est le mécanisme par lequel TypeScript déduit automatiquement le type d'une variable ou d'une fonction sans que tu aies besoin de le spécifier explicitement.

#### Exemple d'inférence de types :

```tsx
let age = 30;
let name = "Alice";
```

Dans cet exemple, TypeScript infère automatiquement que :

- `age` est de type `number` car il a été initialisé avec un nombre.
- `name` est de type `string` car il a été initialisé avec une chaîne de caractères.

TypeScript est capable de déduire les types dans la plupart des cas à partir des valeurs initiales assignées aux variables.

#### Inférence dans les fonctions :

Si TypeScript peut déduire le type de retour d'une fonction à partir du code de la fonction, il n'est pas nécessaire de spécifier explicitement un type de retour.

```tsx
function add(a: number, b: number) {
  return a + b;
}

let result = add(10, 20);  // TypeScript infère que result est de type number
```

Dans cet exemple, TypeScript infère que la fonction `add` retourne un `number` (car l'addition de deux nombres retourne un nombre) et déduit que `result` est également de type `number`.

#### Limites de l'inférence :

Bien que l'inférence de types soit puissante, elle n'est pas toujours idéale, notamment dans les cas complexes où il peut être difficile pour TypeScript de deviner le type exact attendu. C'est pourquoi l'utilisation d'annotations de types est parfois préférable.

#### c. **Combinaison d'annotations de types et d'inférence**

On peut combiner les deux approches dans ton code. Par exemple, on peut laisser TypeScript inférer certains types simples tout en utilisant des annotations explicites pour les types plus complexes.

#### Exemple :

```tsx
let age = 30;  // TypeScript infère que age est un number
let name: string = "Alice";  // Type annoté explicitement
```

Dans cet exemple, `age` est laissé à l'inférence de TypeScript, tandis que `name` est annoté explicitement.

#### d. **Annotations de types dans les objets et tableaux**

TypeScript permet également d'annoter les types des objets, des tableaux, et des tuples.

#### Objet annoté explicitement :

```tsx
let person: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
```

#### Tableau annoté explicitement :

```tsx
let numbers: number[] = [1, 2, 3, 4];
```

#### e. **Annotations de types dans les fonctions**

L'annotation des fonctions permet de contrôler non seulement les types des paramètres mais aussi ceux des valeurs de retour.

#### Exemple avec paramètres et type de retour :

```tsx
function multiply(a: number, b: number): number {
  return a * b;
}
```

Dans cet exemple :

- `a` et `b` sont des paramètres annotés comme des `number`.
- La fonction retourne un `number`, ce qui est explicitement indiqué.

#### Type implicite pour la valeur de retour :

Si TypeScript peut inférer le type de retour, il n'est pas nécessaire de l'annoter.

```tsx
function subtract(a: number, b: number) {
  return a - b;  // TypeScript infère que la valeur de retour est un number
}
```

#### f. **Inférence de type dans les fonctions anonymes et les fonctions fléchées**

Dans les fonctions anonymes ou fléchées, TypeScript infère automatiquement les types à partir du contexte.

#### Exemple :

```tsx
let greet = (name: string) => {
  return `Hello, ${name}`;
};
```

TypeScript déduit ici que la fonction fléchée `greet` prend un paramètre de type `string` et retourne également une `string`, sans qu'il soit nécessaire de spécifier explicitement le type de retour.

#### g. **Avantages de l'inférence de type**

- **Simplicité** : L'inférence de type permet d'écrire du code plus concis, car il n'est pas nécessaire de toujours déclarer les types.
- **Lisibilité** : Dans des cas simples ou évidents, l'inférence permet de ne pas surcharger le code avec des annotations de types inutiles.

#### h. **Cas où les annotations sont nécessaires**

Il y a des situations où l'inférence seule n'est pas suffisante ou peut mener à des comportements inattendus. Voici quelques exemples où les annotations sont indispensables :

### 7. **Les objets complexes**

Pour des objets ou structures de données complexes, il est souvent nécessaire d'utiliser des annotations explicites pour clarifier les types.

```tsx
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
```

### 8. **Les fonctions avec des retours implicites multiples**

Lorsque tu as plusieurs retours possibles dans une fonction, TypeScript pourrait inférer des types incohérents. Utiliser des annotations de type de retour dans ces situations est plus sûr.

```tsx
function getResult(success: boolean): string | number {
  if (success) {
    return "Success";
  } else {
    return 404;
  }
}
```

### 9. **Cas où l'inférence de type est suffisante**

Dans des situations simples, comme l'affectation directe de valeurs primitives (`number`, `string`, `boolean`), l'inférence de types est souvent suffisante.

```tsx
let counter = 0;  // TypeScript infère que `counter` est de type number
let message = "Hello!";  // TypeScript infère que `message` est de type string
```

L'équilibre entre annotations et inférence dépend de la complexité du code et de la clarté souhaitée. Les annotations sont essentielles pour des fonctions complexes ou des structures de données avancées, tandis que l'inférence fonctionne bien dans des cas plus simples.

## 🔹Les fonctions et les classes

### 1. **Fonctions**

Les fonctions en TypeScript ressemblent beaucoup à celles en JavaScript, mais avec des fonctionnalités supplémentaires liées au typage.

#### a. **Définition de fonctions avec types**

Dans TypeScript, tu peux définir les types des paramètres et le type de retour d'une fonction.

#### Exemple simple :

```tsx
function add(a: number, b: number): number {
  return a + b;
}
```

- Ici, les paramètres `a` et `b` sont des nombres (`number`).
- La fonction retourne également un `number`, ce qui est spécifié après `: number`.

#### b. **Paramètres optionnels et valeurs par défaut**

Tu peux rendre certains paramètres **optionnels** en utilisant `?` et donner des **valeurs par défaut** aux paramètres.

#### Exemple avec un paramètre optionnel :

```tsx
function greet(name: string, greeting?: string): string {
  return `${greeting || 'Hello'}, ${name}!`;
}

console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob", "Hi")); // Hi, Bob!
```

- Le paramètre `greeting` est optionnel (`?`), donc si aucune valeur n'est fournie, la valeur par défaut `'Hello'` est utilisée.

#### Exemple avec valeur par défaut :

```tsx
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob", "Hi")); // Hi, Bob!
```

- Ici, `greeting` a une valeur par défaut `"Hello"` qui est utilisée si aucun autre argument n'est fourni.

#### c. **Fonctions avec types complexes**

Les fonctions peuvent également accepter des objets, des tableaux, ou des types complexes en tant que paramètres.

#### Exemple avec un objet :

```tsx
interface User {
  name: string;
  age: number;
}

function greetUser(user: User): string {
  return `Hello, ${user.name}, who is ${user.age} years old!`;
}

console.log(greetUser({ name: "Alice", age: 25 })); // Hello, Alice, who is 25 years old!
```

#### d. **Types de retour `void` et `never`**

- Le type `void` est utilisé pour les fonctions qui ne retournent rien.
- Le type `never` est utilisé pour les fonctions qui ne terminent jamais leur exécution ou qui lèvent toujours une exception.

#### Exemple de `void` :

```tsx
function logMessage(message: string): void {
  console.log(message);
}
```

#### Exemple de `never` :

```tsx
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}
```

#### e. **Fonctions fléchées (arrow functions)**

Les **fonctions fléchées** sont courantes en TypeScript, comme en JavaScript. Elles ont une syntaxe concise et capturent le contexte de `this` environnant.

#### Exemple :

```tsx
const multiply = (a: number, b: number): number => {
  return a * b;
};

console.log(multiply(2, 3)); // 6
```


### 2. **Classes**

Les **classes** en TypeScript permettent d'utiliser la programmation orientée objet (POO). TypeScript améliore les classes en ajoutant des types, des modificateurs de visibilité (`public`, `private`, `protected`) et des interfaces.

#### a. **Définition de classes**

Une classe est définie avec le mot-clé `class`. Elle peut avoir des propriétés, un constructeur et des méthodes.

#### Exemple simple :

```tsx
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.greet()); // Hello, my name is Alice and I'm 25 years old.
```

Dans cet exemple :

- La classe `Person` a deux propriétés : `name` et `age`.
- Le constructeur initialise ces propriétés.
- La méthode `greet()` retourne une chaîne de caractères.

#### b. **Modificateurs de visibilité**

Les classes TypeScript supportent les modificateurs d'accès :

- **`public`** : Le membre est accessible partout. C'est le comportement par défaut.
- **`private`** : Le membre est accessible uniquement à l'intérieur de la classe.
- **`protected`** : Le membre est accessible à l'intérieur de la classe et des classes dérivées (héritées).

#### Exemple avec modificateurs :

```tsx
class Person {
  private name: string;
  protected age: number;
  public country: string;

  constructor(name: string, age: number, country: string) {
    this.name = name;
    this.age = age;
    this.country = country;
  }

  public greet(): string {
    return `Hello, I am from ${this.country}`;
  }
}

class Employee extends Person {
  private position: string;

  constructor(name: string, age: number, country: string, position: string) {
    super(name, age, country);
    this.position = position;
  }

  public getDetails(): string {
    return `${this.greet()} and I work as a ${this.position}.`;
  }
}

const employee = new Employee("Bob", 30, "Canada", "Developer");
console.log(employee.getDetails()); // Hello, I am from Canada and I work as a Developer.
```

Dans cet exemple :

- `name` est `private` : il ne peut être accédé que dans la classe `Person`.
- `age` est `protected` : il peut être accédé dans `Person` et dans `Employee`.
- `country` est `public` : il peut être accédé partout.

#### c. **Héritage (extends)**

Une classe peut hériter d'une autre classe en utilisant `extends`. La classe enfant a accès aux propriétés et méthodes de la classe parente.

#### Exemple d'héritage :

```tsx
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} barks.`;
  }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // Rex barks.
```

#### d. **Interfaces dans les classes**

Une classe peut implémenter une ou plusieurs interfaces pour s'assurer qu'elle respecte certaines signatures.

#### Exemple :

```tsx
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area()); // 200
```

#### e. **Classes abstraites**

Les **classes abstraites** ne peuvent pas être instanciées directement. Elles sont utilisées comme base pour d'autres classes. Une méthode abstraite est une méthode sans implémentation dans la classe abstraite.

### Exemple :

```tsx
abstract class Animal {
  abstract makeSound(): void;  // Méthode abstraite

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark!");
  }
}

const dog = new Dog();
dog.makeSound(); // Bark!
dog.move(); // Moving...
```

Dans cet exemple, la méthode `makeSound()` est déclarée abstraite dans `Animal`, donc chaque classe enfant doit l'implémenter.

**Exercice :**
Créez une classe `Film` avec des propriétés telles que le titre, l’année de sortie, et un résumé. Ensuite, créez une méthode pour afficher les informations du film.
