+++
draft = false
title = '📘 Manipulation de données'
weight = 33
+++

# JSON et XML

La manipulation de données JSON et XML est essentielle dans le développement d'applications web modernes, car ces formats sont couramment utilisés pour l'échange de données entre les serveurs et les clients. Voici un guide sur la façon de manipuler ces données en utilisant JavaScript.

## 1. Manipulation de données JSON

JSON (JavaScript Object Notation) est un format de données léger, facile à lire et à écrire pour les humains, et facile à analyser et à générer pour les machines.

### Parser des données JSON

Pour convertir une chaîne JSON en un objet JavaScript, vous pouvez utiliser `JSON.parse`.

**Exemple :**

```jsx
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const obj = JSON.parse(jsonString);

console.log(obj.name);  // "John"
console.log(obj.age);   // 30
console.log(obj.city);  // "New York"
```

### Convertir un Objet JavaScript en JSON

Pour convertir un objet JavaScript en une chaîne JSON, utilisez `JSON.stringify`.

**Exemple :**

```jsx
const obj = {
  name: "John",
  age: 30,
  city: "New York"
};

const jsonString = JSON.stringify(obj);
console.log(jsonString);  // '{"name":"John","age":30,"city":"New York"}'
```

### Manipuler des données JSON

Vous pouvez facilement accéder, modifier, ajouter ou supprimer des propriétés dans un objet JSON.

**Exemple :**

```jsx
const obj = {
  name: "John",
  age: 30,
  city: "New York"
};

// Accéder à une propriété
console.log(obj.name);  // "John"

// Modifier une propriété
obj.age = 31;

// Ajouter une nouvelle propriété
obj.country = "USA";

// Supprimer une propriété
delete obj.city;

console.log(obj);  // { name: "John", age: 31, country: "USA" }
```

## 2. Manipulation de données XML

XML (eXtensible Markup Language) est un format plus verbeux souvent utilisé dans les systèmes plus anciens ou pour des besoins spécifiques. Manipuler XML en JavaScript nécessite un peu plus de code comparé à JSON.

### Parser des données XML

Pour analyser une chaîne XML en un objet `Document`, utilisez `DOMParser`.

**Exemple :**

```jsx
const xmlString = `
<person>
  <name>John</name>
  <age>30</age>
  <city>New York</city>
</person>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

console.log(xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue);  // "John"
console.log(xmlDoc.getElementsByTagName("age")[0].childNodes[0].nodeValue);   // "30"
```

### Convertir un objet `Document` en chaîne XML

Pour convertir un objet `Document` en une chaîne XML, utilisez `XMLSerializer`.

**Exemple :**

```jsx
const serializer = new XMLSerializer();
const xmlString = serializer.serializeToString(xmlDoc);
console.log(xmlString);
```

### Manipuler des données XML

Vous pouvez accéder et modifier les nœuds XML de manière similaire à la manipulation du DOM HTML.

**Exemple :**

```jsx
// Accéder à un élément
const nameElement = xmlDoc.getElementsByTagName("name")[0];
console.log(nameElement.textContent);  // "John"

// Modifier un élément
nameElement.textContent = "Jane";

// Ajouter un nouvel élément
const countryElement = xmlDoc.createElement("country");
countryElement.textContent = "USA";
xmlDoc.getElementsByTagName("person")[0].appendChild(countryElement);

// Supprimer un élément
const cityElement = xmlDoc.getElementsByTagName("city")[0];
cityElement.parentNode.removeChild(cityElement);

console.log(new XMLSerializer().serializeToString(xmlDoc));
// <person><name>Jane</name><age>30</age><country>USA</country></person>
```
---
## À retenir :

- **JSON** : Plus simple et natif pour JavaScript, facile à manipuler avec `JSON.parse` et `JSON.stringify`.
- **XML** : Nécessite plus de travail, avec des outils comme `DOMParser` et `XMLSerializer` pour l'analyse et la sérialisation.
- **Conversion entre JSON et XML** : Non native, nécessite des fonctions personnalisées.

---

Pour un affichage bien présentable des fichier JSON sur le navigateur Chrome, vous pouvez installer l’extension suivante : 

[JSON Beautifier & Editor - Chrome Web Store](https://chromewebstore.google.com/detail/json-beautifier-editor/lpopeocbeepakdnipejhlpcmifheolpl?hl=en&pli=1)