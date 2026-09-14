+++
draft = false
title = "🧪 Laboratoire : Appliquer le design d'API sur energy-api"
weight = 32
+++

Ce laboratoire poursuit le développement de `energy-api`. On ne cherche plus seulement à faire fonctionner un endpoint : on cherche à construire une API **compréhensible, cohérente et prévisible** pour ses consommateurs.

## Étape 1 : Formaliser les conventions

Dans le `README.md`, ajouter une section précisant :

- le préfixe `/api`;
- la version `v1`;
- les noms anglais au pluriel;
- le `kebab-case` dans les chemins;
- le `camelCase` dans les objets JSON;
- les dates ISO 8601 en UTC;
- JSON comme format principal.

## Étape 2 : Activer la version 1

Dans la configuration commune de l’application :

- conserver le préfixe <code>api</code>;
- activer <code>VersioningType.URI</code>;
- décider si une version par défaut est nécessaire;
- conserver le préfixe automatique <code>v</code>.

Composition attendue :

```text
préfixe global + version + chemin du contrôleur
/api          + /v1     + /buildings
```


Dans `main.ts` :

```ts
import { VersioningType } from '@nestjs/common';

app.setGlobalPrefix('api');
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
```

## Étape 3 : Concevoir les routes

Concevoir au minimum :

```http
GET  /api/v1/buildings
GET  /api/v1/buildings/:id
POST /api/v1/buildings
```

### Décision pour Health

Deux possibilités :

| Choix | Conséquence |
|---|---|
| <code>/api/v1/health</code> | La route suit le contrat versionné |
| <code>/api/health</code> neutre | L’infrastructure conserve une URL stable |

Choisir une stratégie et l’appliquer dans le README.

Associer explicitement à la version <code>1</code> :

- le contrôleur des bâtiments;
- le contrôleur des locaux;
- la route d’état, ou la déclarer neutre si cette décision est justifiée.

## Étape 4 : Définir les données échangées

Corps de création :

```json
{
  "code": "bld-001",
  "name": "Pavillon central",
  "yearBuilt": 1969
}
```

Ou :

```json
{
  "code": "bld-001",
  "name": "Pavillon central",
  "address": "7000, rue Marie-Victorin",
  "yearBuilt": 1969,
}
```

Réponse de création :

```json
{
  "id": "9a4df528-5490-4220-a81e-3a0cbbdc957d",
  "code": "bld-001",
  "name": "Pavillon central",
  "address": "7000, rue Marie-Victorin",
  "yearBuilt": 1969,
  "createdAt": "2026-08-31T18:34:30.450Z",
  "updatedAt": "2026-08-31T18:34:30.450Z"
}
```
