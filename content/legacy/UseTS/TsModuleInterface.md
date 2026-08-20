+++
draft = false
title = 'Modules et Interfaces en TypeScript'
weight = 42
+++


En TypeScript, **modules** et **interfaces** sont des concepts essentiels pour organiser et structurer le code, en particulier dans les projets de grande taille. Ils permettent de diviser le code en différentes parties logiques tout en facilitant la réutilisation et la gestion des dépendances.

## 🔹**Modules**

Les **modules** en TypeScript sont utilisés pour organiser le code en unités logiques, chaque fichier TypeScript étant considéré comme un module. Les modules permettent d'exporter et d'importer des fonctionnalités (variables, classes, fonctions, etc.) entre différents fichiers. Cela aide à gérer la modularité et la réutilisabilité du code.

### a. **Exportation de modules**

Il existe deux types d'exportations :

- **Export nommé** : Permet d'exporter plusieurs entités depuis un fichier.
- **Export par défaut** : Permet d'exporter une seule entité principale.

### Export nommé

Lorsque tu veux exporter plusieurs éléments d'un fichier, tu utilises des exportations nommées.

#### Exemple :

```tsx
// fichier mathUtils.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

Pour importer ces fonctions dans un autre fichier :

```tsx
// fichier main.ts
import { add, subtract } from './mathUtils';

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
```

### Export par défaut

Il est également possible d'exporter une valeur par défaut dans un module.

#### Exemple :

```tsx
// fichier mathUtils.ts
export default function multiply(a: number, b: number): number {
  return a * b;
}
```

Pour importer une exportation par défaut dans un autre fichier, tu peux utiliser n'importe quel nom :

```tsx
// fichier main.ts
import multiply from './mathUtils';

console.log(multiply(5, 3)); // 15
```

### b. **Importation des modules**

Tu peux importer des modules dans un fichier en utilisant les mots-clés `import` et le chemin relatif vers le fichier exporté.

#### Exemple d'import :

```tsx
import { add, subtract } from './mathUtils';  // Importation nommée
import multiply from './mathUtils';  // Importation par défaut
```

Tu peux également renommer les importations :

```tsx
import { add as addition } from './mathUtils';

console.log(addition(5, 3));  // 8
```

### c. **Réexportation (re-exportation)**

TypeScript permet de réexporter des modules, c’est-à-dire d’importer quelque chose d’un autre module et de l’exporter directement.

#### Exemple :

```tsx
// fichier moreMathUtils.ts
export { add, subtract } from './mathUtils';
```

Tu peux ensuite utiliser ces réexportations dans un autre fichier :

```tsx
// fichier main.ts
import { add, subtract } from './moreMathUtils';

console.log(add(5, 3));      // 8
console.log(subtract(5, 3)); // 2
```

## 🔹**Interfaces**

Une **interface** en TypeScript est utilisée pour définir la forme d'un objet, une classe ou une fonction. Elle décrit la structure que l'objet doit respecter. Cela aide à garantir que les objets suivent une certaine structure prédéfinie.

### a. **Définition d'une interface**

Une interface est souvent utilisée pour décrire la structure d'un objet. Elle peut contenir des propriétés, des méthodes, et même des indexeurs.

#### Exemple simple d'interface :

```tsx
interface User {
  name: string;
  age: number;
  email?: string;  // Propriété optionnelle
}

let user: User = {
  name: "Alice",
  age: 25
};
```

Dans cet exemple, `User` est une interface qui spécifie que tout objet `User` doit avoir les propriétés `name` (de type `string`) et `age` (de type `number`), et peut éventuellement avoir une propriété `email` de type `string`.

### b. **Utilisation d'interfaces avec des fonctions**

Tu peux utiliser des interfaces pour typer les paramètres des fonctions ou les valeurs de retour.

#### Exemple :

```tsx
interface Product {
  name: string;
  price: number;
}

function getProductInfo(product: Product): string {
  return `The product ${product.name} costs $${product.price}.`;
}

const product = { name: "Laptop", price: 999 };
console.log(getProductInfo(product));  // The product Laptop costs $999.

```

### c. **Méthodes dans les interfaces**

Les interfaces peuvent également définir des méthodes, qui doivent être implémentées par tout objet ou classe utilisant l'interface.

#### Exemple :

```tsx
interface Person {
  name: string;
  greet(): string;
}

let person: Person = {
  name: "Alice",
  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
};

console.log(person.greet());  // Hello, my name is Alice
```

### d. **Héritage d'interfaces**

Une interface peut hériter d'une autre interface, ce qui permet de créer des interfaces plus complexes en combinant plusieurs interfaces.

#### Exemple :

```tsx
interface Animal {
  species: string;
}

interface Pet extends Animal {
  name: string;
}

let myPet: Pet = {
  species: "Dog",
  name: "Rex"
};

console.log(myPet); // { species: 'Dog', name: 'Rex' }
```

### e. **Implémentation d'interfaces avec des classes**

Les interfaces peuvent être implémentées par des classes. Cela garantit que la classe respecte la structure définie par l'interface.

#### Exemple :

```tsx
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }
}

let rect = new Rectangle(10, 20);
console.log(rect.area()); // 200
```

Dans cet exemple, la classe `Rectangle` implémente l'interface `Shape`, ce qui signifie qu'elle doit fournir une implémentation de la méthode `area()`.

### f. **Interface avec des indexeurs**

Les interfaces peuvent définir des indexeurs pour décrire la forme d'objets qui peuvent avoir des propriétés avec des noms dynamiques.

#### Exemple :

```tsx
interface StringDictionary {
  [key: string]: string;
}

let dictionary: StringDictionary = {
  "firstName": "Alice",
  "lastName": "Doe"
};

console.log(dictionary["firstName"]);  // Alice

```

### g. **Interface avec des types de fonctions**

Une interface peut également être utilisée pour typer des fonctions.

#### Exemple :

```tsx
interface StringOperation {
  (input: string): string;
}

let toUpperCase: StringOperation = function (input: string): string {
  return input.toUpperCase();
};

console.log(toUpperCase("hello"));  // HELLO

```

**Exercice :**
Organisez un projet en plusieurs modules : un module pour les films, un autre pour les réalisateurs, et un module principal pour les exécuter. Utilisez des interfaces pour structurer les données.


