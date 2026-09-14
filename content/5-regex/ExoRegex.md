+++
draft = false
title = '✏️ Exercices : expressions régulères'
weight = 52
+++


### Exercice 1 : Validation d'un mot de passe

### Objectif :

Créer une fonction qui valide un mot de passe selon les règles suivantes :

- Au moins 8 caractères.
- Contient au moins une lettre majuscule.
- Contient au moins une lettre minuscule.
- Contient au moins un chiffre.
- Contient au moins un caractère spécial (ex: `!@#$%^&*`).

### Instructions :

- Créez une fonction `validatePassword` qui prend une chaîne de caractères en entrée et retourne `true` si le mot de passe est valide, sinon `false`.

---

### Exercice 2 : Nettoyage d'une chaîne de caractères

### Objectif :

Créer une fonction qui nettoie une chaîne de caractères en :

- Supprimant tous les caractères spéciaux, sauf les espaces.
- Convertissant plusieurs espaces consécutifs en un seul espace.
- Supprimant les espaces au début et à la fin de la chaîne.

### Instructions :

- Créez une fonction `cleanString` qui prend une chaîne en entrée et retourne la chaîne nettoyée.

---

### Exercice 3 : Extraction des numéros de téléphone

### Objectif :

Créer une fonction qui extrait tous les numéros de téléphone d’un texte. Les numéros peuvent être au format `(123) 456-7890` ou `123-456-7890`.

### Instructions :

- Créez une fonction `extractPhoneNumbers` qui prend une chaîne de caractères en entrée et retourne un tableau de numéros de téléphone.

---

### Exercice 4 : Validation d'un code postal

### Objectif :

Créer une fonction qui valide un code postal. Un code postal valide suit les règles suivantes :

- 5 chiffres pour un code postal américain (ex : 12345).
- 6 caractères pour un code postal canadien (ex : A1A 1A1).

### Instructions :

- Créez une fonction `validatePostalCode` qui valide les deux formats.

---

### Exercice 5 : Extraction des liens URL

### Objectif :

Créer une fonction qui extrait toutes les URL d'un texte.

### Instructions :

- Créez une fonction `extractUrls` qui prend une chaîne de caractères en entrée et retourne un tableau de toutes les URL.

---

### Exercice 6 : Validation d'un nom d'utilisateur

### Objectif :

Créer une fonction qui valide un nom d'utilisateur selon les règles suivantes :

- Seulement des lettres, chiffres et underscores.
- Doit commencer par une lettre.
- Longueur comprise entre 3 et 15 caractères.

### Instructions :

- Créez une fonction `validateUsername` pour vérifier ces conditions.

---

### Exercice 7 : Suppression des caractères spéciaux d'un texte

### Objectif :

Créer une fonction qui supprime tous les caractères spéciaux d'une chaîne sauf les espaces.

### Instructions :

- Créez une fonction `removeSpecialCharacters` qui prend une chaîne en entrée et supprime tous les caractères spéciaux.

---

### Exercice 8 : Formater les dates

### Objectif :

Créer une fonction qui formate toutes les dates dans un texte au format `DD/MM/YYYY`. Les dates sont présentes au format `MM/DD/YYYY` ou `YYYY-MM-DD`.

### Instructions :

- Créez une fonction `formatDates` qui prend une chaîne contenant des dates et les reformate au format `DD/MM/YYYY`.
