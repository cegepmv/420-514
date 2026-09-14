+++
draft = false
title = '📘 Rappel de NestJS'
weight = 22
+++

## Pourquoi utiliser NestJS?

[NestJS](https://nestjs.com/) est un **cadriciel côté serveur** construit avec Node.js et TypeScript. Il permet de développer des applications structurées, notamment des API Web.

NestJS fournit une organisation et des mécanismes prêts à l'emploi pour :

- recevoir et traiter des requêtes HTTP;
- définir les routes d'une API;
- séparer les responsabilités de l'application;
- injecter les dépendances nécessaires;
- regrouper le code par fonctionnalité;
- faciliter l'évolution et les tests de l'application.

![L'architecture NestJS](/420-514/images/api/architecture_nestjs.png)


>Dans le projet fil conducteur, NestJS sera utilisé pour construire l'API `energy-api`, chargée de recevoir et de retourner des données concernant des bâtiments, des capteurs et des mesures énergétiques.


## Structure minimale d'une application

Après la création d'un projet NestJS, le dossier `src` contient généralement les fichiers suivants :

```text
src/
├── main.ts
├── app.module.ts
├── app.controller.ts
└── app.service.ts
```

| Élément | Responsabilité principale |
|---|---|
| `main.ts` | Démarrer l'application NestJS. |
| Module | Regrouper et déclarer les composants d'une fonctionnalité. |
| Contrôleur | Recevoir les requêtes HTTP et retourner les réponses. |
| Service | Exécuter la logique applicative. |
| DTO | Décrire la structure des données échangées. |



## Le démarrage de l'application

Le fichier `main.ts` constitue le **point d'entrée** de l'application.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

### Déroulement du démarrage

1. `NestFactory.create(AppModule)` crée l'application à partir du module racine.
2. `app.setGlobalPrefix('api')` ajoute le préfixe `/api` à toutes les routes.
3. `app.listen(...)` démarre le serveur HTTP.
4. `bootstrap()` exécute la fonction de démarrage.

Avec le port `3000`, l'adresse de base de l'API devient :

```text
http://localhost:3000/api
```

> Le préfixe global ne remplace pas les routes des contrôleurs. Il est ajouté devant celles-ci.



## Le module

Un module regroupe les composants appartenant à une même partie de l'application.

```ts
import { Module } from '@nestjs/common';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
```

Dans cet exemple :

- `controllers` déclare les contrôleurs du module;
- `providers` déclare les services que NestJS pourra créer et injecter.

Le module de fonctionnalité doit ensuite être importé dans le module racine :

```ts
import { Module } from '@nestjs/common';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [BuildingsModule],
})
export class AppModule {}
```



## Le contrôleur

Le contrôleur représente la **porte d'entrée HTTP** d'une fonctionnalité.

Il doit principalement :

- définir les routes;
- recevoir les paramètres de la requête;
- déléguer le traitement au service;
- retourner le résultat.

```ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';

@Controller('buildings')
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
  ) {}

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBuildingDto) {
    return this.buildingsService.create(dto);
  }
}
```

Avec le préfixe global `/api`, les routes obtenues sont :

| Décorateurs NestJS | Route HTTP |
|---|---|
| `@Controller('buildings')` et `@Get()` | `GET /api/buildings` |
| `@Controller('buildings')` et `@Get(':id')` | `GET /api/buildings/:id` |
| `@Controller('buildings')` et `@Post()` | `POST /api/buildings` |



## Les décorateurs fréquemment utilisés

Les décorateurs fournissent à NestJS des informations sur le rôle d'une classe, d'une méthode ou d'un paramètre.

| Décorateur | Utilisation |
|---|---|
| `@Module()` | Déclarer un module. |
| `@Controller('route')` | Déclarer un contrôleur et sa route de base. |
| `@Injectable()` | Permettre à NestJS de gérer et d'injecter une classe. |
| `@Get()` | Associer une méthode à une requête `GET`. |
| `@Post()` | Associer une méthode à une requête `POST`. |
| `@Put()` | Associer une méthode à une requête `PUT`. |
| `@Patch()` | Associer une méthode à une requête `PATCH`. |
| `@Delete()` | Associer une méthode à une requête `DELETE`. |
| `@Param('id')` | Extraire un paramètre du chemin. |
| `@Query('name')` | Extraire un paramètre de requête. |
| `@Body()` | Extraire le corps de la requête. |

### Exemples d'extraction

Pour la requête suivante :

```http
GET /api/buildings/42?includeSensors=true HTTP/1.1
```

on peut utiliser :

```ts
@Get(':id')
findOne(
  @Param('id') id: string,
  @Query('includeSensors') includeSensors?: string,
) {
  return this.buildingsService.findOne(id, includeSensors);
}
```

- `@Param('id')` récupère `42`;
- `@Query('includeSensors')` récupère `true`.



## Le service

Le service contient la **logique applicative**. Il ne devrait pas dépendre directement des détails de la requête HTTP.

```ts
import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';

@Injectable()
export class BuildingsService {
  private readonly buildings = [
    { id: '1', name: 'Pavillon principal' },
  ];

  findAll() {
    return this.buildings;
  }

  findOne(id: string) {
    return this.buildings.find((building) => building.id === id);
  }

  create(dto: CreateBuildingDto) {
    const building = {
      id: String(this.buildings.length + 1),
      ...dto,
    };

    this.buildings.push(building);
    return building;
  }
}
```

### Séparation des responsabilités

```text
Requête HTTP → Contrôleur → Service → Résultat → Contrôleur → Réponse HTTP
```

Le contrôleur gère la communication HTTP. Le service exécute l'opération demandée.

On évite donc de placer dans le contrôleur :

- les calculs;
- les recherches complexes;
- les règles métier;
- la manipulation directe des données.


## Le DTO

Un **DTO** (*Data Transfer Object*) décrit les données attendues lors d'un échange.

```ts
export class CreateBuildingDto {
  name: string;
  city: string;
}
```

Le DTO utilisé par la méthode suivante indique que le corps doit représenter un bâtiment à créer :

```ts
@Post()
create(@Body() dto: CreateBuildingDto) {
  return this.buildingsService.create(dto);
}
```

Exemple de corps JSON :

```json
{
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

> Un DTO TypeScript décrit la structure attendue, mais il ne valide pas automatiquement les données pendant l'exécution. La validation sera ajoutée explicitement dans une séance ultérieure.


## L'injection de dépendances

Dans le contrôleur, le service est reçu par le constructeur :

```ts
constructor(
  private readonly buildingsService: BuildingsService,
) {}
```

NestJS crée l'instance de `BuildingsService` et la fournit au contrôleur. Ce mécanisme s'appelle **l'injection de dépendances**.

On évite donc ceci :

```ts
const buildingsService = new BuildingsService();
```

L'injection de dépendances permet notamment :

- de réduire le couplage entre les classes;
- de remplacer plus facilement une dépendance;
- de faciliter les tests;
- de centraliser la création des objets.


![L'injection de dépendances](/420-514/images/api/di.png)


## Organisation par fonctionnalité

Pour `energy-api`, on privilégie une organisation dans laquelle les fichiers associés à une fonctionnalité demeurent regroupés.

```text
src/
├── main.ts
├── app.module.ts
├── health/
│   ├── health.module.ts
│   └── health.controller.ts
└── buildings/
    ├── buildings.module.ts
    ├── buildings.controller.ts
    ├── buildings.service.ts
    ├── dto/
    │   └── create-building.dto.ts
    └── entities/
        └── building.entity.ts
```

Cette organisation facilite :

- la recherche des fichiers;
- l'ajout de fonctionnalités;
- la répartition du travail;
- la maintenance du projet.



## Conventions de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Fichier | minuscules et traits d'union | `create-building.dto.ts` |
| Classe | PascalCase | `CreateBuildingDto` |
| Méthode ou variable | camelCase | `findAll`, `buildingId` |
| Module | suffixe `Module` | `BuildingsModule` |
| Contrôleur | suffixe `Controller` | `BuildingsController` |
| Service | suffixe `Service` | `BuildingsService` |
| DTO | suffixe `Dto` | `CreateBuildingDto` |
| Routes | noms de ressources au pluriel | `/api/buildings` |


![L'architecture NestJS](/420-514/images/api/request_overview_nestjs.png)




## Références

- [Premiers pas avec NestJS](https://docs.nestjs.com/first-steps)
- [Modules NestJS](https://docs.nestjs.com/modules)
- [Contrôleurs NestJS](https://docs.nestjs.com/controllers)
- [Providers et services NestJS](https://docs.nestjs.com/providers)
- [Commandes de la CLI NestJS](https://docs.nestjs.com/cli/usages)