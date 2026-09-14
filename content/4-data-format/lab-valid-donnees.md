+++
draft = false
weight = 52
title = '🧪 Laboratoire : Validation et qualité des données dans energy-api'
+++


L’API `energy-api` permet déjà de gérer des bâtiments et les locaux qu’ils contiennent. Une API ne peut toutefois pas supposer que les données reçues sont correctes. Elle doit refuser une requête mal formée avant qu’elle puisse dégrader l’état de l’application.

Dans ce laboratoire, on consolide les validations de l’API afin d’améliorer son contrat et la qualité de ses données.

## Objectifs

À la fin du laboratoire, on doit pouvoir :

- distinguer une validation de forme d’une règle métier;
- valider les corps JSON avec `class-validator`;
- normaliser certaines chaînes avec `class-transformer`;
- refuser les propriétés inconnues;
- valider les identifiants présents dans les URI;
- protéger les modifications partielles;
- retourner les codes HTTP appropriés;
- documenter les contraintes dans Swagger/OpenAPI;
- vérifier manuellement les cas valides et invalides.

## Travail attendu

On améliore les ressources existantes :

```text
src/
├── configure-app.ts
├── common/
│   ├── dto/
│   ├── filters/
│   ├── middleware/
│   └── pipes/
├── buildings/
│   ├── dto/
│   ├── buildings.controller.ts
│   └── buildings.service.ts
└── rooms/
    ├── dto/
    ├── rooms.controller.ts
    └── rooms.service.ts
```


## 1. Préparer le travail

### Courte explication

Une branche de tâche isole une modification et facilite sa révision. Avant de programmer, on doit également observer le comportement actuel afin de pouvoir mesurer l’effet des validations ajoutées.

## 2. Configurer la validation globale

> Un `ValidationPipe` global applique les règles des DTO à toutes les requêtes. Cette configuration évite de répéter la même logique dans chaque contrôleur.
- `whitelist` retire les propriétés qui n’appartiennent pas au DTO;
- `forbidNonWhitelisted` transforme leur présence en erreur;
- `transform` permet à NestJS d’appliquer les transformations déclarées;
- `validationError` permet d’éviter d’exposer inutilement les valeurs reçues.

### À réaliser

Vérifier la configuration de `ValidationPipe` dans `configure-app.ts`, puis l’ajuster afin que :
- les propriétés inconnues soient refusées;
- les transformations déclarées dans les DTO soient appliquées;
- plusieurs erreurs puissent être signalées dans une même réponse;
- la réponse de validation n’expose ni l’objet complet ni les valeurs reçues;
- les chaînes numériques d’un corps JSON ne soient pas automatiquement acceptées comme des nombres.

> Consulter les options de `ValidationPipe`. On doit notamment examiner `whitelist`, `forbidNonWhitelisted`, `forbidUnknownValues`, `stopAtFirstError`, `validationError` et `transformOptions`.

### Cas à tester

Envoyer un bâtiment avec une propriété inconnue :

```json
{
  "name": "Pavillon principal",
  "address": "7000, rue Marie-Victorin",
  "yearBuilt": 1970,
  "isAdministrator": true
}
```

L’API doit refuser la requête avec `400 Bad Request`.


## 3. Valider la création d’un bâtiment

> Un DTO décrit les données que le client est autorisé à envoyer. Les décorateurs de `class-validator` vérifient la présence, le type, la longueur et les bornes des valeurs. Les transformations doivent rester prévisibles : retirer les espaces externes est acceptable, mais inventer ou corriger silencieusement une valeur ne l’est pas.

### Contraintes à implanter

| Attribut | Contraintes attendues |
|---|---|
| `name` | requis, chaîne, espaces externes retirés, 2 à 100 caractères, contenu significatif |
| `address` | requis, chaîne, espaces externes retirés, 5 à 200 caractères, contenu significatif |
| `yearBuilt` | requis, entier, minimum 1800, maximum égal à l’année courante |
| `id` | produit par le serveur et interdit dans le corps |

### À réaliser

1. Compléter `CreateBuildingDto`.
2. Choisir les décorateurs appropriés de `class-validator`.
3. Utiliser une transformation uniquement pour normaliser raisonnablement les chaînes.
4. Fournir des messages compréhensibles lorsque la règle par défaut n’est pas suffisamment claire.
5. Vérifier qu’un nom composé d’espaces seulement est refusé.

> Examiner notamment les décorateurs associés aux types, à la présence, aux longueurs, aux entiers et aux bornes. Une expression régulière peut vérifier la présence d’au moins une lettre ou d’un chiffre, mais elle ne doit pas interdire les accents, apostrophes ou traits d’union légitimes.


## 4. Valider la création d’un local

### Contraintes à implanter

| Attribut | Contraintes attendues |
|---|---|
| `name` | requis, chaîne, espaces externes retirés, 1 à 80 caractères, contenu significatif |
| `floor` | requis, entier compris entre `-10` et `200` |
| `areaM2` | requis, nombre fini, de `0.01` à `100000`, maximum deux décimales |
| `id` | produit par le serveur et interdit dans le corps |
| `buildingId` | obtenu depuis l’URI et interdit dans le corps |

> Le type TypeScript n’existe plus au moment de l’exécution. Écrire `areaM2: number` ne suffit donc pas à protéger l’API. Une validation d’exécution doit refuser les chaînes, les valeurs négatives, les nombres non finis et une précision excessive.

### À réaliser

1. Compléter `CreateRoomDto`.
2. Ajouter une borne maximale à l’étage et à la superficie.
3. Limiter la superficie à deux décimales.
4. Vérifier que `buildingId` ne peut pas être imposé par le client.
5. Documenter les bornes choisies dans OpenAPI.


## 5. Protéger les modifications partielles

Une opération `PATCH` accepte seulement les propriétés que le client veut modifier. Les contraintes du DTO de création doivent être réutilisées, mais les propriétés deviennent facultatives. Un corps vide ne représente toutefois aucune modification utile.

### À réaliser

1. Conserver un DTO distinct pour la modification de chaque ressource.
2. Réutiliser les contraintes du DTO de création au moyen de `PartialType`.
3. Vérifier qu’une propriété présente demeure entièrement validée.
4. Créer un petit pipe réutilisable qui refuse un corps vide après le retrait des propriétés inconnues.
5. Appliquer ce pipe aux deux opérations `PATCH`.

### Comportements attendus

| Corps | Résultat attendu |
|---|---|
| `{}` | `400 Bad Request` |
| `{ "unknown": true }` | `400 Bad Request` |
| `{ "name": "  " }` | `400 Bad Request` |
| `{ "name": "Pavillon B" }` | requête valide si les règles métier sont respectées |

> La vérification du corps vide ne correspond pas à une propriété particulière. Un `PipeTransform` appliqué à `@Body()` convient mieux qu’une vérification répétée dans chaque contrôleur.


## 6. Valider les paramètres de chemin

Un identifiant mal formé et un identifiant inexistant ne représentent pas la même erreur :

- format invalide : `400 Bad Request`;
- format valide, mais ressource absente : `404 Not Found`.

Les identifiants du projet sont produits avec `randomUUID()`. Les paramètres correspondants doivent donc respecter ce format.

### À réaliser

1. Valider `id` dans toutes les routes de bâtiments.
2. Valider `buildingId` et `id` dans toutes les routes de locaux.
3. Utiliser un pipe NestJS adapté aux UUID générés par l’application.
4. Vérifier que la validation se produit avant l’appel au service.

### Cas à essayer

```text
GET /api/v1/buildings/abc
GET /api/v1/buildings/00000000-0000-4000-8000-000000000000
```

Les deux requêtes doivent produire des codes différents si le second UUID n’existe pas.

## 7. Appliquer les règles métier dans les services

> `class-validator` valide une valeur isolée. Il ne peut pas déterminer si un nom existe déjà ou si un bâtiment contient des locaux, car ces règles dépendent de l’état courant de l’application. Elles appartiennent aux services ou à la couche de données.

### Règles à vérifier

| Règle métier | Comportement attendu |
|---|---|
| nom de bâtiment unique sans tenir compte de la casse et des espaces externes | `409 Conflict` en cas de doublon |
| bâtiment parent obligatoire avant de créer ou consulter un local | `404 Not Found` si le bâtiment n’existe pas |
| nom de local unique à l’intérieur d’un même bâtiment | `409 Conflict` en cas de doublon |
| même nom de local permis dans deux bâtiments différents | opération acceptée |
| modification d’un nom sans se considérer soi-même comme doublon | opération acceptée |

### À réaliser

1. Examiner les vérifications déjà présentes dans les deux services.
2. Confirmer qu’elles sont appliquées à la création et à la modification.
3. Normaliser les valeurs de la même manière lors de toutes les comparaisons.
4. Vérifier que les exceptions utilisées correspondent au problème rencontré.

### Intégrité lors de la suppression

On doit également décider du comportement lorsqu’on tente de supprimer un bâtiment qui contient encore des locaux. Deux stratégies cohérentes sont possibles :

- refuser la suppression avec `409 Conflict`;
- effectuer une suppression en cascade explicitement documentée.

Pour ce laboratoire, on retient le refus avec `409 Conflict`. Comme le stockage des locaux appartient actuellement à `RoomsService`, on doit éviter de créer une dépendance circulaire entre services. On peut préparer cette règle en isolant l’accès au tableau des locaux dans un dépôt ou un service de données partagé. Si cette réorganisation n’est pas terminée pendant la séance, on documente la stratégie et on l’intègre avant la persistance MongoDB.


## 8. Vérifier le contrat HTTP

> La validation ne concerne pas uniquement les attributs. Le serveur doit également vérifier le format du message HTTP et retourner un code qui permet au client de comprendre le problème.

### À réaliser

1. Vérifier que le middleware existant refuse un corps qui n’est pas déclaré avec `Content-Type: application/json`.
2. Confirmer que cette situation produit `415 Unsupported Media Type`.
3. Vérifier qu’un JSON mal formé produit une erreur contrôlée.
4. Vérifier que le filtre global transforme les erreurs dans un format uniforme.
5. Confirmer qu’une erreur interne ne révèle ni pile d’exécution, ni chemin local, ni détails techniques sensibles.

### Codes à distinguer

| Situation | Code attendu |
|---|---:|
| corps ou paramètre invalide | `400` |
| ressource inexistante | `404` |
| doublon ou conflit avec l’état courant | `409` |
| type de contenu incorrect | `415` |
| erreur technique inattendue | `500` |


## 9. Mettre à jour Swagger/OpenAPI

> Une validation qui existe seulement dans le code est invisible pour les consommateurs de l’API. OpenAPI doit annoncer les mêmes types, champs requis, bornes et erreurs que l’application applique réellement.

### À réaliser

Pour chaque opération concernée, documenter :

- les champs requis et facultatifs;
- les valeurs minimales et maximales;
- les longueurs de chaînes;
- des exemples réalistes;
- le format UUID des paramètres;
- les réponses `400`, `404`, `409` et `415` pertinentes;
- le format Problem Details;
- le fait que `id` et `buildingId` sont contrôlés par le serveur.

### Vérification

Ouvrir Swagger UI et comparer chaque schéma au DTO correspondant. Toute différence doit être corrigée.


## 10. Réaliser les essais manuels

Préparer une collection Postman ou utiliser Swagger UI pour vérifier au minimum les scénarios suivants :

| # | Scénario | Résultat attendu |
|---:|---|---|
| 1 | créer un bâtiment valide | `201` |
| 2 | créer un bâtiment avec une propriété inconnue | `400` |
| 3 | créer un bâtiment avec une année future | `400` |
| 4 | créer un bâtiment portant un nom existant avec une casse différente | `409` |
| 5 | consulter un identifiant mal formé | `400` |
| 6 | consulter un UUID valide, mais inexistant | `404` |
| 7 | créer un local valide dans un bâtiment existant | `201` |
| 8 | créer un local dans un bâtiment inexistant | `404` |
| 9 | créer un local avec une superficie invalide | `400` |
| 10 | créer deux locaux de même nom dans le même bâtiment | `409` |
| 11 | envoyer un `PATCH` vide | `400` |
| 12 | envoyer un corps avec un mauvais `Content-Type` | `415` |

Pour chaque essai, conserver : la méthode, l’URI, le corps envoyé, le statut reçu et un court résultat.

### Commit suggéré

```text
feat(validation): renforcer la qualité des données refs #NUMERO
```

La pull request de la branche `task` doit cibler la branche `feature` associée à l’issue parente.

## Définition de terminé

- [ ] Les propriétés inconnues sont refusées.
- [ ] Les chaînes sont normalisées et validées.
- [ ] Les nombres respectent les types, bornes et précisions attendus.
- [ ] Les `PATCH` vides sont refusés.
- [ ] Les identifiants mal formés produisent `400`.
- [ ] Les ressources inexistantes produisent `404`.
- [ ] Les doublons et conflits produisent `409`.
- [ ] Un mauvais type de contenu produit `415`.
- [ ] Les erreurs suivent un format uniforme.
- [ ] Swagger correspond au comportement réel.
- [ ] Les essais manuels démontrent les cas valides et invalides.
- [ ] Le lint, la compilation et les tests existants réussissent.
