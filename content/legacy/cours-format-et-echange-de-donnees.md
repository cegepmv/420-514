+++
title = "Format et échange de données"
weight = 2
+++



## 1. Pourquoi échanger des données?

Une API relie des applications qui peuvent utiliser des langages différents, fonctionner sur des appareils différents et évoluer séparément.

### Exemple

~~~http
POST /api/v1/buildings HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json

{
  "name": "Pavillon principal",
  "address": "7000, rue Marie-Victorin",
  "yearBuilt": 1965
}
~~~

Cet échange contient une méthode, un chemin, des en-têtes, un corps et un format annoncé.


## 2. Les formats d’échange

Un format d’échange définit les règles permettant de représenter des données sous une forme transportable.

| Format | Caractéristiques | Usages fréquents |
|---|---|---|
| JSON | Textuel, compact et largement pris en charge | API REST |
| XML | Textuel, extensible et riche en métadonnées | Systèmes institutionnels |
| CSV | Tabulaire et simple | Importation et analyse |
| YAML | Lisible par une personne | Configuration et spécifications |
| Binaire | Compact et efficace | Images, documents et audio |

### Le format ne définit pas le transport

JSON représente les données. HTTP les transporte.

On peut enregistrer JSON dans un fichier ou le transmettre par HTTP. Inversement, HTTP peut transporter JSON, XML, CSV ou un fichier binaire.

Dans <code>energy-api</code>, on utilise principalement JSON au-dessus de HTTP.


## 3. Le format JSON

JSON signifie JavaScript Object Notation. Malgré son origine, il est indépendant du langage JavaScript.

### 3.1 Types JSON

| Type | Exemple |
|---|---|
| Chaîne | <code>"Pavillon principal"</code> |
| Nombre | <code>1965</code> ou <code>42.5</code> |
| Booléen | <code>true</code> |
| Valeur nulle | <code>null</code> |
| Objet | <code>{"name": "Pavillon"}</code> |
| Tableau | <code>[{"id": "b1"}, {"id": "b2"}]</code> |

JSON ne possède pas directement de type date, UUID, classe, méthode ou valeur <code>undefined</code>. Ces concepts sont représentés par convention.

### 3.2 Exemple complet

~~~json
{
  "id": "5df8c2ac-8abd-4d06-a856-f769821d9e29",
  "name": "Pavillon principal",
  "yearBuilt": 1965,
  "active": true,
  "labels": ["enseignement", "administration"],
  "closedAt": null
}
~~~

Règles importantes :

- les noms des propriétés et les chaînes utilisent des guillemets doubles;
- les éléments sont séparés par des virgules;
- le dernier élément n’a pas de virgule;
- <code>true</code>, <code>false</code> et <code>null</code> sont en minuscules;
- <code>NaN</code> et <code>Infinity</code> sont invalides;
- les noms d’un même objet devraient être uniques;
- JSON échangé entre systèmes utilise UTF-8;
- l’ordre des propriétés d’un objet ne doit pas porter de signification.

### 3.3 Objet et collection

Une ressource :

~~~json
{
  "id": "building-001",
  "name": "Pavillon principal"
}
~~~

Une collection :

~~~json
[
  {
    "id": "building-001",
    "name": "Pavillon principal"
  },
  {
    "id": "building-002",
    "name": "Pavillon des sciences"
  }
]
~~~

## 4. Sérialisation et désérialisation

### 4.1 Sérialisation

La sérialisation transforme une structure en mémoire en une représentation transportable.

~~~ts
const building = {
  id: 'building-001',
  name: 'Pavillon principal',
};

const json = JSON.stringify(building);
~~~

### 4.2 Désérialisation

La désérialisation transforme les données reçues en une structure utilisable.

~~~ts
const building = JSON.parse(json);
~~~

### 4.3 Dans NestJS

À la réception :

1. le serveur lit les octets;
2. le parseur interprète JSON;
3. NestJS remet l’objet au contrôleur avec <code>@Body()</code>;
4. un pipe peut le transformer et le valider;
5. le contrôleur le transmet au service.

Dans l’autre direction, NestJS sérialise la valeur retournée par le contrôleur et l’envoie au client.

### 4.4 Limites de la désérialisation

Après <code>JSON.parse()</code> :

- une date demeure une chaîne;
- une classe devient un objet ordinaire;
- les méthodes ne sont pas recréées;
- les types TypeScript ne sont pas vérifiés;
- du JSON syntaxiquement valide peut être invalide pour le domaine.

~~~json
{
  "name": "",
  "yearBuilt": -20
}
~~~

Ce document est du JSON valide, mais ne représente pas un bâtiment valide.


## 5. Concevoir une représentation JSON

Une bonne représentation est claire, stable, cohérente, documentée et indépendante de la base de données.

### 5.1 Nommage

On adopte une convention unique, par exemple <code>camelCase</code> :

~~~json
{
  "yearBuilt": 1965,
  "areaM2": 4250.75
}
~~~

On évite de mélanger <code>year_built</code>, <code>AreaM2</code> et <code>building-name</code>.

### 5.2 Identifiants

Un identifiant devrait être stable, unique, opaque pour le client et conserver le même type.

~~~json
{
  "id": "5df8c2ac-8abd-4d06-a856-f769821d9e29"
}
~~~

Le client ne doit pas déduire une règle métier de sa structure.

### 5.3 Dates et heures

JSON ne possède pas de type date. On utilise généralement une chaîne ISO 8601 :

~~~json
{
  "measuredAt": "2026-09-03T14:30:00Z"
}
~~~

| Valeur | Signification |
|---|---|
| <code>2026-09-03</code> | Date civile |
| <code>2026-09-03T14:30:00Z</code> | Instant en UTC |
| <code>2026-09-03T10:30:00-04:00</code> | Instant avec décalage |

On évite les formats ambigus comme <code>03/09/26</code>.

### 5.4 Unités

Une valeur sans unité est ambiguë :

~~~json
{
  "consumption": 24.8
}
~~~

On peut imposer l’unité dans le contrat :

~~~json
{
  "consumptionKWh": 24.8
}
~~~

Ou la rendre explicite :

~~~json
{
  "value": 24.8,
  "unit": "kWh"
}
~~~

### 5.5 Nombres et précision

On doit être prudent avec les identifiants numériques très longs, les montants, les mesures de grande précision et les arrondis.

Pour un montant :

~~~json
{
  "amountCents": 1299,
  "currency": "CAD"
}
~~~

### 5.6 Propriété absente et <code>null</code>

Propriété absente :

~~~json
{
  "name": "Pavillon principal"
}
~~~

Valeur explicitement nulle :

~~~json
{
  "name": "Pavillon principal",
  "closedAt": null
}
~~~

Une convention possible :

- propriété absente : aucune valeur transmise ou aucun changement demandé;
- <code>null</code> : absence explicite d’une valeur.

Cette distinction est importante avec <code>PATCH</code>.

### 5.7 Collection vide

Une collection sans élément retourne généralement :

~~~json
[]
~~~

On évite <code>null</code>, car un tableau vide est plus prévisible pour le client.

### 5.8 Relations et imbrication

Identifiant seulement :

~~~json
{
  "id": "room-001",
  "buildingId": "building-001",
  "name": "A-101"
}
~~~

Objet imbriqué :

~~~json
{
  "id": "room-001",
  "name": "A-101",
  "building": {
    "id": "building-001",
    "name": "Pavillon principal"
  }
}
~~~

L’imbrication peut réduire le nombre de requêtes, mais augmente la taille des réponses et le couplage. On évite les structures profondément imbriquées.

## 7. Types de médias et négociation

### 7.1 <code>Content-Type</code>

Il décrit le format du corps effectivement envoyé.

~~~http
Content-Type: application/json
~~~

Une erreur Problem Details utilise :

~~~http
Content-Type: application/problem+json
~~~

Une route attendant JSON peut répondre <code>415 Unsupported Media Type</code> à un format incompatible.

### 7.2 <code>Accept</code>

Il indique les formats que le client peut recevoir :

~~~http
Accept: application/json
~~~

Si le serveur ne peut produire aucun format acceptable, il peut répondre <code>406 Not Acceptable</code>.

| En-tête | Question |
|---|---|
| <code>Content-Type</code> | Quel est le format du corps envoyé? |
| <code>Accept</code> | Quel format souhaite-t-on recevoir? |

Pour <code>energy-api</code>, on limite volontairement le contrat à JSON.


## 8. Échange complet dans Energy API

### 8.1 Création

~~~http
POST /api/v1/buildings HTTP/1.1
Content-Type: application/json
Accept: application/json

{
  "code": "bld-001",
  "name": "Pavillon central",
  "address": "7000, rue Marie-Victorin",
  "yearBuilt": 1969
}
~~~

Réponse :

~~~http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/buildings/5df8c2ac-8abd-4d06-a856-f769821d9e29
~~~

~~~json
{
  "id": "5df8c2ac-8abd-4d06-a856-f769821d9e29",
  "code": "bld-001",
  "name": "Pavillon central",
  "address": "7000, rue Marie-Victorin",
  "yearBuilt": 1969,
  "createdAt": "2026-08-31T18:34:30.450Z",
  "updatedAt": "2026-08-31T18:34:30.450Z"
  
}
~~~

### 8.2 Erreur structurée

~~~http
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
~~~

~~~json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "La requête contient des données invalides.",
  "instance": "/api/v1/buildings",
  "errors": ["Le nom est obligatoire."]
}
~~~

Une erreur est constituée d’un statut et d’un corps prévisible.


## 9. Échanges asynchrones avec <code>fetch()</code>

Une requête exige du temps. Le client ne doit pas bloquer toute son exécution pendant l’attente.

### 9.1 Lire une collection

~~~ts
async function loadBuildings() {
  const response = await fetch(
    'http://localhost:3000/api/v1/buildings',
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}
~~~

Deux attentes ont lieu :

1. réception des en-têtes;
2. lecture et désérialisation du corps.

<code>fetch()</code> ne rejette pas automatiquement sa promesse pour <code>404</code> ou <code>500</code>. On doit vérifier <code>response.ok</code>.

### 9.2 Envoyer JSON

~~~ts
async function createBuilding(building: {
  name: string;
  address: string;
  yearBuilt: number;
}) {
  const response = await fetch(
    'http://localhost:3000/api/v1/buildings',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(building),
    },
  );

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}
~~~

Oublier <code>JSON.stringify()</code> ou <code>Content-Type</code> empêche le serveur d’interpréter correctement le corps.

### 9.3 Trois catégories d’échec

- erreur réseau : aucune réponse HTTP exploitable;
- réponse HTTP d’erreur : <code>response.ok</code> vaut <code>false</code>;
- erreur de lecture : le corps ne peut être lu ou interprété.


## 10. Échanges synchrones et asynchrones

### Dans le programme

- synchrone : l’instruction se termine avant la suivante;
- asynchrone : l’opération peut progresser pendant que le programme effectue d’autres tâches.

### Entre systèmes

- requête-réponse : le client attend le résultat;
- traitement différé : le serveur accepte le travail et répond plus tard;
- événement ou message : un producteur publie une information.

Une fonction utilisant <code>await</code> demeure asynchrone, même si son code se lit séquentiellement.


## 11. Erreurs liées aux échanges

| Situation | Statut possible | Signification |
|---|---:|---|
| JSON mal formé | <code>400</code> | Le corps ne peut être interprété |
| Données JSON invalides | <code>400</code> | Le contrat n’est pas respecté |
| Format non pris en charge | <code>415</code> | <code>Content-Type</code> incompatible |
| Représentation indisponible | <code>406</code> | <code>Accept</code> insatisfait |
| Ressource absente | <code>404</code> | La ressource n’existe pas |
| Conflit | <code>409</code> | L’opération entre en conflit avec l’état |
| Corps trop volumineux | <code>413</code> | La taille dépasse la limite |

Le statut doit décrire la cause réelle de l’échec.


## 12. Pièges fréquents

### Confondre objet JavaScript et JSON

Objet :

~~~ts
const building = { name: 'Pavillon principal' };
~~~

JSON :

~~~json
{"name": "Pavillon principal"}
~~~

### Faire confiance aux types TypeScript

Les types TypeScript disparaissent à l’exécution. Une requête externe doit être validée.

### Retourner la structure de la base de données

La représentation publique ne devrait pas dépendre d’une collection, d’une clé technique ou d’une bibliothèque de persistance.

### Utiliser des dates ambiguës

La valeur <code>09/03/26</code> peut être interprétée différemment selon la région.

### Mélanger les types

Une propriété ne devrait pas être parfois un nombre et parfois une chaîne.

### Utiliser plusieurs formats d’erreur

Un format uniforme simplifie le développement de tous les clients.


## 13. Bonnes pratiques

- utiliser JSON UTF-8;
- appliquer une convention uniforme aux propriétés;
- garder les noms et les types stables;
- représenter les dates selon une convention documentée;
- rendre les unités explicites;
- distinguer propriété absente et <code>null</code>;
- retourner un tableau vide pour une collection vide;
- éviter l’imbrication excessive;
- annoncer le corps avec <code>Content-Type</code>;
- exprimer le format souhaité avec <code>Accept</code>;
- vérifier <code>response.ok</code>;
- distinguer erreurs réseau et HTTP;
- valider après la désérialisation;
- documenter les succès et les erreurs.


## 14. Activité en classe

Analyser :

~~~json
{
  "Building_ID": 90071992547409930,
  "building_name": "Pavillon principal",
  "created": "03/09/26",
  "consumption": 24.8,
  "rooms": null,
  "active": "true"
}
~~~

Questions :

1. L’identifiant risque-t-il de perdre de la précision?
2. Le nommage est-il cohérent?
3. La date est-elle non ambiguë?
4. Quelle est l’unité de consommation?
5. Pourquoi <code>rooms</code> pourrait-il être un tableau vide?
6. Pourquoi <code>active</code> devrait-il être un booléen?


## 15. Application à Energy API

Pour <code>buildings</code> et <code>rooms</code> :

1. définir les représentations JSON;
2. identifier les propriétés générées par le serveur;
3. préciser les propriétés obligatoires;
4. choisir les formats de date et d’identifiant;
5. définir les unités;
6. décider le comportement de <code>null</code>;
7. écrire un exemple de création;
8. écrire une réponse de succès;
9. écrire une erreur Problem Details;
10. tester avec Postman, <code>curl</code> ou <code>fetch()</code>.

### Décisions retenues

| Élément | Décision |
|---|---|
| Format d’entrée | <code>application/json</code> |
| Format de succès | <code>application/json</code> |
| Format d’erreur | <code>application/problem+json</code> |
| Nommage | <code>camelCase</code> |
| Identifiants | Chaînes UUID |
| Dates et heures | ISO 8601 avec fuseau |
| Collection vide | <code>[]</code> |
| Propriété inconnue | Rejetée |


## 16. Questions de vérification

1. Quelle différence existe-t-il entre JSON et HTTP?
2. Quels sont les six types JSON?
3. Quelle différence existe-t-il entre sérialisation et désérialisation?
4. Pourquoi une date devient-elle une chaîne?
5. Quelle différence existe-t-il entre propriété absente et <code>null</code>?
6. Quel en-tête décrit le corps envoyé?
7. Quel en-tête décrit les formats souhaités?
8. Quelle différence existe-t-il entre <code>400</code> et <code>415</code>?
9. Pourquoi vérifier <code>response.ok</code>?
10. Pourquoi le contrat public doit-il être indépendant de la base de données?


## 17. Synthèse

~~~mermaid
flowchart LR
    A["Objet du client"] --> B["Sérialisation JSON"]
    B --> C["Requête HTTP"]
    C --> D["Désérialisation"]
    D --> E["Validation"]
    E --> F["Service"]
    F --> G["Sérialisation"]
    G --> H["Réponse HTTP"]
~~~

- JSON représente les données.
- HTTP transporte les représentations.
- Les en-têtes décrivent l’échange.
- Les DTO et la validation protègent le contrat.
- La documentation explique le contrat aux consommateurs.

---

## Références

- RFC 8259 — JSON : https://www.rfc-editor.org/rfc/rfc8259.html
- RFC 9110 — HTTP Semantics : https://www.rfc-editor.org/rfc/rfc9110.html
- RFC 9457 — Problem Details : https://www.rfc-editor.org/rfc/rfc9457.html
- NestJS — Controllers : https://docs.nestjs.com/controllers
- NestJS — Serialization : https://docs.nestjs.com/techniques/serialization
