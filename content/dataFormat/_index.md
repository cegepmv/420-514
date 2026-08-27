+++
title = "Formats et échange de données d'uen API"
pre = "3."
weight = 4
draft = true
+++

## Format et transport

HTTP transporte les messages. Le format de données détermine comment le contenu du message est représenté.

Exemples de formats :

- JSON;
- XML;
- CSV;
- formats binaires.

Dans `energy-api`, JSON sera le format principal parce qu'il est léger, textuel, indépendant du langage et largement utilisé dans les API Web.


## Types JSON

JSON prend en charge :

- les objets;
- les tableaux;
- les chaînes de caractères;
- les nombres;
- les booléens;
- `null`.

Exemple valide :

```json
{
  "sensorId": "sen-104",
  "type": "electricity",
  "value": 18.75,
  "unit": "kWh",
  "active": true,
  "tags": ["laboratory", "floor-2"],
  "lastCalibrationAt": null
}
```

JSON ne représente pas directement :

- `undefined`;
- les commentaires;
- les fonctions;
- les objets `Date`;
- les valeurs `NaN` ou `Infinity`.


## Conventions JSON du projet

| Élément | Convention retenue | Exemple |
|---|---|---|
| Propriétés | `camelCase` | `recordedAt` |
| Identifiants | Chaînes stables | `"sen-104"` |
| Dates | Chaînes ISO 8601 | `"2026-08-26T14:30:00Z"` |
| Nombres | Valeurs numériques | `18.75` |
| Unités | Propriété distincte | `"unit": "kWh"` |
| Booléens | `true` ou `false` | `"active": true` |
| Valeur inconnue explicite | `null`, si le contrat le prévoit | `"closedAt": null` |

On évite de mélanger valeur et unité :

```json
{
  "consumption": "18.75 kWh"
}
```

On préfère :

```json
{
  "consumption": 18.75,
  "unit": "kWh"
}
```

Cette structure permet d'effectuer des calculs sans analyser une chaîne de caractères.


## Dates et heures

Une date échangée dans JSON est généralement représentée par une chaîne :

```json
{
  "recordedAt": "2026-08-26T14:30:00Z"
}
```

Le suffixe `Z` indique l'heure UTC.

Une convention unique évite :

- les ambiguïtés entre jour et mois;
- les erreurs de fuseau horaire;
- les formats différents selon la langue du client.

On évite :

```json
{
  "recordedAt": "26/08/2026 10:30"
}
```


## Propriété absente et valeur `null`

Ces deux situations ne signifient pas nécessairement la même chose.

```json
{
  "lastCalibrationAt": null
}
```

peut signifier que la propriété est connue, mais qu'aucune calibration n'a encore été effectuée.

L'absence de la propriété peut signifier qu'elle n'est pas incluse dans cette représentation ou qu'elle n'est pas applicable.

Le contrat doit préciser la signification retenue.


## Sérialisation et désérialisation

La **sérialisation** transforme un objet en une représentation transmissible.

```ts
const measurement = {
  sensorId: 'sen-104',
  value: 18.75,
};

const json = JSON.stringify(measurement);
```

Résultat :

```json
{"sensorId":"sen-104","value":18.75}
```

La **désérialisation** transforme le contenu reçu en une structure exploitable :

```ts
const measurement = JSON.parse(json);
```

> Désérialiser ne signifie pas valider. Un JSON syntaxiquement valide peut tout de même contenir des données incorrectes pour le domaine.


## Sérialisation avec NestJS

Lorsqu'un contrôleur NestJS retourne un objet ou un tableau JavaScript, NestJS le sérialise automatiquement en JSON.

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return {
    id,
    name: 'Pavillon principal',
    city: 'Montréal',
  };
}
```

Réponse :

```json
{
  "id": "bld-001",
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

Il n'est généralement pas nécessaire d'appeler `JSON.stringify()` dans un contrôleur NestJS.


## `Content-Type` et `Accept`

Ces deux en-têtes ne sont pas interchangeables.

| En-tête | Question à laquelle il répond |
|---|---|
| `Content-Type` | Quel est le format du corps envoyé? |
| `Accept` | Quel format de réponse le client souhaite-t-il recevoir? |

Exemple :

```http
POST /api/v1/buildings HTTP/1.1
Host: localhost
Content-Type: application/json
Accept: application/json

{
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

La réponse indique aussi son format :

```http
HTTP/1.1 201 Created
Content-Type: application/json
```



## change asynchrone avec `fetch`

Lecture d'une collection :

```ts
const apiBaseUrl = 'URL_DE_L_API';

const response = await fetch(
  `${apiBaseUrl}/api/v1/buildings`,
  {
    headers: {
      Accept: 'application/json',
    },
  },
);

if (!response.ok) {
  throw new Error(`Erreur HTTP : ${response.status}`);
}

const buildings = await response.json();
```

Création d'une ressource :

```ts
const apiBaseUrl = 'URL_DE_L_API';

const response = await fetch(
  `${apiBaseUrl}/api/v1/buildings`,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Pavillon principal',
      city: 'Montréal',
    }),
  },
);
```

La promesse retournée par `fetch` peut se résoudre même si le serveur retourne `404` ou `500`. On doit donc examiner `response.ok` ou `response.status`.



## DTO de requête et représentation de réponse

Le DTO décrit le contrat des données reçues :

```ts
export class CreateBuildingDto {
  name: string;
  city: string;
}
```

Contrôleur :

```ts
@Post()
create(@Body() dto: CreateBuildingDto) {
  return this.buildingsService.create(dto);
}
```

Le client envoie :

```json
{
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

Le serveur peut retourner une représentation enrichie :

```json
{
  "id": "bld-001",
  "name": "Pavillon principal",
  "city": "Montréal",
  "createdAt": "2026-08-26T14:30:00Z"
}
```

Le DTO d'entrée et la représentation retournée ne sont donc pas nécessairement identiques.



# 4. Étude de cas : améliorer une API

## Proposition initiale

```http
POST /api/createMeasurement
Content-Type: text/plain

sen-104,18.75,kWh,26/08/2026 10:30
```

Réponse :

```http
HTTP/1.1 200 OK

success
```

## Problèmes à identifier

- un verbe apparaît dans le chemin;
- le nom de la ressource est au singulier;
- les données sont difficiles à interpréter;
- la date est ambiguë et sans fuseau horaire;
- la valeur et l'unité ne sont pas clairement nommées;
- `200 OK` ne précise pas qu'une ressource a été créée;
- la réponse ne contient ni identifiant ni représentation de la ressource;
- le contrat d'erreur n'est pas défini.

## Proposition améliorée

```http
POST /api/v1/measurements
Content-Type: application/json
Accept: application/json

{
  "sensorId": "sen-104",
  "value": 18.75,
  "unit": "kWh",
  "recordedAt": "2026-08-26T14:30:00Z"
}
```

Réponse :

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/measurements/mea-901

{
  "id": "mea-901",
  "sensorId": "sen-104",
  "value": 18.75,
  "unit": "kWh",
  "recordedAt": "2026-08-26T14:30:00Z"
}
```

---

# 5. Activité en classe

Pour chacune des routes suivantes, on doit :

1. repérer les problèmes;
2. proposer une route améliorée;
3. choisir le code de statut de succès;
4. proposer un exemple JSON lorsqu'un corps est nécessaire.

```http
GET /api/getAllSensors
POST /api/deleteSensor?id=12
GET /api/buildingByCity/Montreal
POST /api/addEnergyMeasurement
```

### Correction possible

```http
GET    /api/v1/sensors
DELETE /api/v1/sensors/12
GET    /api/v1/buildings?city=Montréal
POST   /api/v1/energy-measurements
```


