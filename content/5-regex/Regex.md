+++
weight = 51
draft = false
title = 'Introduction aux Expressions Régulières (Regex)'
+++


## Introduction aux expressions régulières

Les **expressions régulières** (ou **regex** pour "regular expressions") sont des modèles utilisés pour rechercher, valider ou manipuler des chaînes de caractères. Elles sont particulièrement utiles pour :
- Valider des données utilisateur (ex. : e-mails, numéros de téléphone).
- Rechercher et remplacer des mots ou des motifs dans un texte.
- Extraire des informations spécifiques dans des fichiers ou des logs.

Les expressions régulières sont utilisées dans de nombreux langages de programmation (comme Python, JavaScript, Java, etc.), ainsi que dans des outils de traitement de texte et d'analyse de données.

Exemple simple : Trouver toutes les adresses e-mail dans un texte.
```javascript
const text = "Contactez-nous à support@example.com ou sales@example.org.";
// Sans le modificateur /g, seule la première occurrence serait trouvée
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const emails = text.match(emailRegex);
console.log(emails); // ["support@example.com", "sales@example.org"]
```
> Le modificateur /g dans une expression régulière signifie global. Cela indique que la recherche doit être effectuée sur l'ensemble du texte et non arrêtée après la première correspondance. En d'autres termes, il permet de trouver toutes les correspondances dans une chaîne, pas seulement la première.

### A. Pourquoi utiliser les expressions régulières ?

- **Recherche de motifs complexes** : Identifier des structures textuelles comme des adresses email, des numéros de téléphone, ou des dates.
- **Validation** : Vérifier si une chaîne correspond à un certain format (par exemple, valider un numéro de carte de crédit ou une adresse IP).
- **Nettoyage (ou substitution)** : Utilisation des expressions régulières pour supprimer ou remplacer des parties indésirables de texte (comme supprimer des espaces en trop ou formater un numéro de téléphone).
- **Extraction** : Extraire des parties spécifiques d'une chaîne de caractères correspondant à un motif particulier.

### B. Structure d'une expression régulière

Une expression régulière est composée de caractères ordinaires (lettres, chiffres, etc.) et de **métacaractères** qui ont un sens spécial. Voici les éléments de base des expressions régulières :

## Syntaxe de base
### 1. **Caractères de base**

Les lettres, les chiffres et les symboles sont pris littéralement. Par exemple, l'expression régulière `abc` correspondra exactement à la chaîne `"abc"`.

```ts
const regex = /abc/; // Correspond exactement à "abc"

const strings = [
  "abc",       // correspond
  "abcd",      // correspond (car "abc" est présent)
  "aabc",      // correspond (car "abc" est présent)
  "ab",        // ne correspond pas
  "xyz",       // ne correspond pas
];

strings.forEach(str => {
  console.log(`"${str}" correspond à "abc" ? :`, regex.test(str));
});
```

### 2. **Métacaractères**

Les métacaractères ont des significations spéciales et permettent de créer des motifs plus complexes. Voici quelques exemples :

- **`.`** : Correspond à n’importe quel caractère (sauf le retour à la ligne).
    - Exemple : `a.c` correspondra à `"abc"`, `"a5c"`, mais pas à `"ac"`.
- **`^`** : Indique le début d’une chaîne.
    - Exemple : `^Bonjour` correspondra à `"Bonjour le monde"` mais pas à `"Salut Bonjour"`.
- **`$`** : Indique la fin d’une chaîne.
    - Exemple : `monde$` correspondra à `"Bonjour le monde"` mais pas à `"le monde est grand"`.
- **`*`** : Correspond à 0 ou plusieurs occurrences du caractère ou du groupe précédent.
    - Exemple : `a*` correspondra à `"a"`, `"aa"`, et aussi à `""`.
- **`+`** : Correspond à une ou plusieurs occurrences du caractère ou du groupe précédent.
    - Exemple : `a+` correspondra à `"a"`, `"aa"`, mais pas à `""`.
- **`?`** : Correspond à 0 ou 1 occurrence du caractère ou du groupe précédent.
    - Exemple : `a?` correspondra à `"a"` ou `""`, mais pas à `"aa"`.

#### Exemple :
```javascript
const regex = /\d{3}-\d{2}-\d{4}/;
const result = "Numéro : 123-45-6789".match(regex);
console.log(result); // ["123-45-6789"]
``` 

### 3. **Classes de caractères**

Les classes de caractères permettent de définir un ensemble de caractères possibles pour une position donnée :

- **`[abc]`** : Correspond à un seul caractère qui est soit `a`, `b`, ou `c`.
    - Exemple : `b[aeiou]g` correspondra à `"bag"`, `"beg"`, `"big"`, `"bog"`, `"bug"`.
- **`[a-z]`** : Correspond à tout caractère entre `a` et `z` (lettres minuscules).
- **`[^abc]`** : Négation : correspond à tout caractère sauf `a`, `b` ou `c`.
- **`\d`** : Correspond à n'importe quel chiffre (équivalent à `[0-9]`).
- **`\D`** : Correspond à n'importe quel caractère qui n'est pas un chiffre (équivalent à `[^0-9]`).
- **`\w`** : Correspond à tout caractère alphanumérique (lettres et chiffres, ainsi que le caractère de soulignement `_`).
- **`\W`** : Correspond à tout caractère non alphanumérique.
- **`\s`** : Correspond à tout espace blanc (espace, tabulation, saut de ligne).
- **`\S`** : Correspond à tout caractère qui n'est pas un espace blanc.

#### Exemple 

```javascript
const regex = /[a-z]/g;
const result = "abc123".match(regex);
console.log(result); // ["a", "b", "c"]
```

### 4. **Quantificateurs**

Les quantificateurs permettent de spécifier combien de fois un élément peut apparaître :

- **`{n}`** : Exactement `n` occurrences.
    - Exemple : `a{3}` correspondra à `"aaa"`.
- **`{n,}`** : Au moins `n` occurrences.
    - Exemple : `a{2,}` correspondra à `"aa"`, `"aaa"`, `"aaaa"`, etc.
- **`{n,m}`** : Au moins `n` occurrences, mais pas plus de `m`.
    - Exemple : `a{2,4}` correspondra à `"aa"`, `"aaa"`, ou `"aaaa"`.

#### Exemple :
```ts
// Définir des regex avec différents quantificateurs
const regexExact = /a{3}/;    // Exactement 3 "a"
const regexAtLeast = /a{2,}/; // Au moins 2 "a"
const regexRange = /a{2,4}/;  // Entre 2 et 4 "a"

// Chaînes de test
const strings = [
  "a",       // Trop court
  "aa",      // Correspond à {2,} et {2,4}
  "aaa",     // Correspond à {3}, {2,}, et {2,4}
  "aaaa",    // Correspond à {2,}, et {2,4}
  "aaaaa",   // Correspond uniquement à {2,}
];

// Tester chaque regex
console.log("Exactement 3 'a':");
strings.forEach(str => console.log(`"${str}" :`, regexExact.test(str)));

console.log("\nAu moins 2 'a':");
strings.forEach(str => console.log(`"${str}" :`, regexAtLeast.test(str)));

console.log("\nEntre 2 et 4 'a':");
strings.forEach(str => console.log(`"${str}" :`, regexRange.test(str)));
```

### 5. **Groupes et captures**

- **Parenthèses `( )`** : Permettent de grouper des parties d'une expression régulière pour appliquer des quantificateurs ou capturer des sous-chaînes  correspondantes qui peuvent être récupérées via match ou utilisées dans des remplacements.
    - Exemple : `(abc)+` correspondra à `"abc"`, `"abcabc"`, etc.
- **Non-capturing group `(?:...)`** : Regroupe des parties d'une expression régulière sans capturer la sous-chaîne.
Utile pour regrouper des éléments sans les inclure dans les résultats de capture.
    - Exemple : `(?:abc)+` fonctionne comme `(abc)+` mais sans capturer la chaîne.

#### Exemple 1 :
```ts
// Exemple avec des groupes capturants
const regexCapturing = /(abc)+/; // Capture "abc" répété une ou plusieurs fois
const regexNonCapturing = /(?:abc)+/; // Regroupe "abc" répété sans capturer

// Chaînes de test
const strings = [
  "abc",       // Correspond
  "abcabc",    // Correspond
  "abcabcabc", // Correspond
  "ab",        // Ne correspond pas
];

// Tester les groupes capturants
console.log("Groupes capturants :");
strings.forEach(str => {
  const match = str.match(regexCapturing);
  console.log(`"${str}" :`, match ? match[0] : "Pas de correspondance");
});

// Tester les groupes non-capturants
console.log("\nGroupes non-capturants :");
strings.forEach(str => {
  const match = str.match(regexNonCapturing);
  console.log(`"${str}" :`, match ? match[0] : "Pas de correspondance");
});
```

#### Exemple 2 : Extraction avec groupes capturants
```ts
const regex = /(\d{4})-(\d{2})-(\d{2})/; // Capture l'année, le mois et le jour
const date = "2023-10-01";

const match = date.match(regex);
if (match) {
  console.log(`Année : ${match[1]}`); // 2023
  console.log(`Mois : ${match[2]}`);  // 10
  console.log(`Jour : ${match[3]}`);  // 01
}
```


### 6. **Caractères d’échappement**

Si vous voulez utiliser un métacaractère comme un caractère ordinaire, vous devez le précéder d’un **`\`** (backslash).

- Exemple : Pour correspondre à un point (`.`) dans une chaîne, vous devez utiliser `\.`.
```
(http|https):\/\/[a-zA-Z0-9.-]+\.(com|org|net)
```

## C. Validation de données 

### Exemple : Validation d'une adresse e-mail

Une adresse e-mail doit respecter certains formats. Par exemple, elle doit contenir un nom d'utilisateur, un symbole `@`, un domaine, et une extension (.com, .org, etc.). Une regex courante pour valider une adresse e-mail ressemble à :

```
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

- **Explication** :
    - `^[a-zA-Z0-9._%+-]+` : Le nom d'utilisateur commence par un ou plusieurs caractères alphanumériques, points, soulignements, ou symboles comme `%` ou `+`.
    - `@` : Le symbole `@` obligatoire.
    - `[a-zA-Z0-9.-]+` : Le nom de domaine qui accepte des lettres, des chiffres, des tirets ou des points.
    - `\.` : Un point pour séparer le domaine de l'extension.
    - `[a-zA-Z]{2,}` : L'extension doit contenir au moins 2 caractères alphabétiques.
    - `^` et `$` : Ces caractères indiquent respectivement le début et la fin de la chaîne à valider, pour éviter les correspondances partielles.

  ```jsx
  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Exemple d'utilisation
  const email = "test@example.com";
  console.log(validateEmail(email));  // true
  ```

### Exemple : Validation d'un numéro de téléphone

Pour valider un numéro de téléphone, comme un numéro nord-américain au format `(123) 456-7890`, on peut utiliser :

```
^\(\d{3}\) \d{3}-\d{4}$
```

- **Explication** :
    - `^\(` : Commence par une parenthèse ouvrante.
    - `\d{3}` : Trois chiffres.
    - `\)` : Parenthèse fermante.
    - `\d{3}` : Trois chiffres pour la partie suivante du numéro.
    - `` : Un tiret.
    - `\d{4}` : Quatre chiffres pour la fin du numéro.

Si vous voulez permettre plusieurs formats, comme `(123) 456-7890` ou `123-456-7890`, vous pouvez modifier la regex comme suit :

```
^(\d{3}-|\(\d{3}\) )\d{3}-\d{4}$
```

### Exemple : Validation d'un code postal (Canada)

Un code postal canadien doit suivre le format A1A 1A1. Pour valider un code postal canadien, vous pouvez utiliser :

```
^[a-zA-Z]\d[a-zA-Z] ?\d[a-zA-Z]\d$
```

- **Explication** :
    - `[A-Za-z]` : Une lettre (majuscule ou minuscule).
    - `\d` : Un chiffre.
    - Le format se répète, avec un espace entre les deux groupes.

## D. Recherche et nettoyage de données 

Le nettoyage de données consiste à retirer ou transformer des informations indésirables ou incorrectes.

### Exemple : Suppression des espaces superflus

Si une chaîne contient plusieurs espaces consécutifs ou des espaces avant/après un texte, on peut les supprimer à l'aide des regex.

- Pour supprimer les espaces au début et à la fin d'une chaîne :
    
    ```
    ^\s+|\s+$
    ```
    
    - `^\s+` : Correspond aux espaces au début de la chaîne.
    - `\s+$` : Correspond aux espaces à la fin de la chaîne.
- Pour réduire les espaces multiples entre les mots en un seul espace :
    
    ```
    \s{2,}
    ```
    
    Cela correspond à deux espaces ou plus et peut être remplacé par un seul espace `" "`.
    
    ```jsx
    function cleanExtraSpaces(input: string): string {
      const spaceRegex = /\s+/g;
      return input.trim().replace(spaceRegex, ' ');
    }
    
    // Exemple d'utilisation
    const messyText = "   Ceci   est    un   texte   avec    trop d'espaces.   ";
    console.log(cleanExtraSpaces(messyText));  // "Ceci est un texte avec trop d'espaces."
    ```
    
### Exemple : Recherche et remplacement :

```ts
const text = "Bonjour, M. Dupont. Bonjour, Mme Durand.";
const regex = /Bonjour/g;
const result = text.replace(regex, "Salut");
console.log(result); // "Salut, M. Dupont. Salut, Mme Durand."
```

### Exemple : Nettoyage de numéros de téléphone

Si vous récupérez des numéros de téléphone dans différents formats (par exemple `123-456-7890`, `(123) 456-7890`, `123 456 7890`), vous pouvez les normaliser en supprimant les caractères non nécessaires.

Pour extraire uniquement les chiffres d'un numéro de téléphone :

```
[^\d]
```

- **Explication** : Cette regex correspond à tout ce qui n'est **pas** un chiffre (`^\\d`), que vous pouvez remplacer par une chaîne vide pour garder uniquement les chiffres.

```jsx
function cleanPhoneNumber(phone: string): string {
  const phoneRegex = /\D/g; // \D signifie "tout sauf un chiffre"
  return phone.replace(phoneRegex, '');
}

// Exemple d'utilisation
const messyPhoneNumber = "(123) 456-7890";
console.log(cleanPhoneNumber(messyPhoneNumber));  // "1234567890"
```

### Exemple : Suppression des caractères spéciaux dans des noms

Si vous devez nettoyer un nom et supprimer les caractères spéciaux comme `!`, `@`, `#`, etc., vous pouvez utiliser :

```
[^a-zA-Z\s]
```

- **Explication** :
    - `[^a-zA-Z\s]` : Cette classe de caractères correspond à tout ce qui n'est pas une lettre (majuscule ou minuscule) ou un espace. Vous pouvez remplacer ces caractères par une chaîne vide pour les supprimer.

### Exemple : Extraction d'adresses e-mail dans un texte

Si vous avez un texte contenant plusieurs adresses e-mail et que vous souhaitez les extraire, vous pouvez utiliser la regex suivante :

```
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\[a-zA-Z]{2,}
```

Cette regex peut être utilisée dans des langages comme Python ou JavaScript pour trouver toutes les adresses e-mail présentes dans un texte.

```jsx
function extractEmails(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
}

// Exemple d'utilisation
const textWithEmails = "Voici quelques emails : test@example.com, contact@domain.org, info@site.fr";
console.log(extractEmails(textWithEmails));  // ["test@example.com", "contact@domain.org", "info@site.fr"]
```


### Exemple : Extraction de données de log

```ts
const log = "2023-10-01 12:34:56 ERROR: Something went wrong";
const regex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (ERROR|INFO|WARN): (.+)/;
const match = log.match(regex);
console.log(match);
// ["2023-10-01 12:34:56 ERROR: Something went wrong", "2023-10-01", "12:34:56", "ERROR", "Something went wrong"]
```

## E. Combinaison de validation et de nettoyage

Vous pouvez combiner la validation et le nettoyage pour traiter correctement les entrées utilisateur.

### Exemple : Validation et nettoyage d'un formulaire d'inscription

Voici un exemple où nous validons et nettoyons les données d'un formulaire de manière systématique.

```tsx
interface UserData {
  name: string;
  email: string;
  phone: string;
}

function validateAndCleanForm(data: UserData): UserData | null {
  if (!validateEmail(data.email)) {
    console.log('Email invalide.');
    return null;
  }

  const cleanedPhone = cleanPhoneNumber(data.phone);
  if (!validatePhoneNumber(cleanedPhone)) {
    console.log('Numéro de téléphone invalide.');
    return null;
  }

  return {
    ...data,
    phone: cleanedPhone,
    name: cleanExtraSpaces(data.name),
  };
}

// Exemple d'utilisation
const formData = {
  name: "  John Doe  ",
  email: "john.doe@example.com",
  phone: "(123) 456-7890",
};

const cleanedData = validateAndCleanForm(formData);
if (cleanedData) {
  console.log('Formulaire valide et nettoyé :', cleanedData);
}
```

Les expressions régulières  permettent d’automatiser et d’optimiser de nombreuses tâches liées à la manipulation de chaînes de caractères. Bien qu'elles puissent sembler complexes au début, une bonne maîtrise des regex ouvre la voie à des manipulations textuelles efficaces et puissantes.

## Exercice : Validation d'e-mails et extraction de dates

1. **Validation d'e-mails** :
 Écrivez une regex pour valider une adresse e-mail. Une adresse e-mail valide doit :
  - Commencer par des lettres, chiffres ou caractères spéciaux comme `.` ou `_`.
  - Contenir un `@` suivi d'un nom de domaine.
  - Se terminer par une extension de 2 à 6 lettres (ex. : `.com`, `.org`).

  Testez votre regex avec les exemples suivants :
  ```ts
  const emailRegex = /^votre_regex_ici$/;

  const emails = [
    "john.doe@example.com",    // valide
    "jane_doe@sub.example.org", // valide
    "invalid-email@",           // non valide
    "@example.com",             // non valide
    "user@domain.c",            // non valide (extension trop courte)
    "user@domain.company"       // valide (extension de 6 caractères)
  ];

  emails.forEach(email => {
  console.log(`${email} : ${emailRegex.test(email)}`);
});
  ```
  Résultat attendu :
  ```text
  john.doe@example.com : true
  jane_doe@sub.example.org : true
  invalid-email@ : false
  @example.com : false
  user@domain.c : false
  user@domain.company : true
  ```

2. **Extraction de dates** :
 Écrivez une regex pour extraire les dates dans un texte.
 Exemple de texte :
 `Aujourd'hui, nous sommes le 2023-10-01. La réunion est prévue pour le 2023-10-15.`
 Résultat attendu : 
 - `2023-10-01`
 - `2023-10-15`

## Conclusion

Les expressions régulières sont des outils puissants pour manipuler et valider des chaînes de caractères. Bien qu'elles puissent sembler complexes au début, une pratique régulière et l'utilisation d'outils interactifs comme Regex101 ou RegExr vous aideront à les maîtriser.


## Ressources

- [RegExr: Learn, Build, & Test RegEx](https://regexr.com/) : Un autre outil interactif pour tester les regex avec des explications.
- [MDN Web Docs](https://regex101.com/) - Expressions régulières
- [Guide complet sur les regex](https://www.regular-expressions.info/) : Un guide approfondi pour maîtriser les expressions régulières.