+++
draft = false
title = "🧪 Laboratoire : Faire persister energy-api avec MongoDB"
weight = 85
+++


## Mise en situation

L’API `energy-api` permet déjà de gérer des bâtiments et leurs locaux. Jusqu’à maintenant, les données sont conservées temporairement en mémoire. Elles disparaissent donc chaque fois que l’application redémarre.

On doit maintenant remplacer ce stockage temporaire par MongoDB. Cette évolution doit être réalisée sans modifier inutilement les routes, les représentations JSON ou les comportements déjà documentés.

> MongoDB modifie la manière dont l’API conserve les données. Il ne modifie pas automatiquement son contrat public et ne justifie donc pas, à lui seul, une nouvelle version de l’API.


## Objectifs

À la fin du laboratoire, on doit pouvoir :

- connecter une application NestJS à MongoDB avec Mongoose;
- externaliser une chaîne de connexion avec la configuration d’environnement;
- concevoir des schémas cohérents avec le domaine de `energy-api`;
- représenter la relation entre un bâtiment et ses locaux;
- remplacer une collection en mémoire par un modèle Mongoose;
- différencier un DTO public d’un schéma de persistance;
- traduire les erreurs MongoDB en réponses HTTP appropriées;
- vérifier que le contrat public de l’API est préservé.

## Prérequis

Avant de commencer, on doit disposer d’une version fonctionnelle de `energy-api` dans laquelle :

- les ressources des bâtiments et des locaux sont présentes;
- les corps, paramètres de route et chaînes de requête sont validés;
- les erreurs utilisent une représentation cohérente;
- l’API possède déjà sa version publique actuelle;
- Swagger/OpenAPI décrit le comportement actuel;
- les commandes de lint et de compilation réussissent.

### Préparation de l'environnement

**Installer le validateur de schéma**

Pour être certain que l'application refuse de démarrer s'il manque une variable (comme MONGO_URI), on utilise joi pour valider le .env et config pour la configuration des variables d'environnement.

```sh 
npm i joi
npm i @nestjs/config
```

## 1. Repérer la responsabilité à remplacer

Dans les services, repérer :

- les tableaux qui conservent les bâtiments et les locaux;
- la génération des identifiants;
- les recherches avec `find()` ou `findIndex()`;
- les règles d’unicité;
- le traitement d’une ressource absente.

On ne doit pas réécrire les contrôleurs ni déplacer les modules simplement parce que le mécanisme de stockage change.


## 2. Installer l’intégration NestJS-MongoDB

`mongoose` permet de définir des schémas et d’exécuter des opérations MongoDB. `@nestjs/mongoose` permet d’enregistrer et d’injecter les modèles dans les modules et services NestJS. `@nestjs/config` permet de charger la configuration sans inscrire les valeurs propres à un environnement dans le code.

### Travail à réaliser

1. Vérifier si les trois dépendances sont installées.

Consulter la documentation officielle de NestJS afin de déterminer comment établir une connexion asynchrone à partir de `ConfigService`.


## 3. Externaliser la chaîne de connexion

### Courte explication

L’adresse du serveur, le nom de la base et les informations d’authentification varient selon l’environnement. Ces valeurs ne doivent pas être codées dans `app.module.ts` ni publiées dans le dépôt.

### Travail à réaliser

- définir une variable `MONGODB_URI` dans l’environnement local;
- ajouter son nom dans `.env.example` avec une valeur d’exemple sans secret;
- vérifier que `.env` est ignoré par Git;
- charger la variable à l’aide du module de configuration;
- refuser le démarrage de l’application si cette configuration obligatoire est absente;
- utiliser une base portant un nom explicite, par exemple `energy-api-dev`.

```text
MONGO_URI="mongodb://<username>:<password>@<host>:<port>/<database>?authSource=<username>"

```

- **`<username>`** : Nom d'utilisateur MongoDB.
- **`<password>`** : Mot de passe de l'utilisateur.
- **`<host>`** : Adresse IP ou nom de domaine de votre serveur MongoDB.
- **`<port>`** : Port MongoDB (par défaut : `27017`).
- **`<database>`** : Nom de la base de données.

### Points de vigilance

- ne jamais publier une véritable chaîne contenant un mot de passe;
- ne jamais écrire la chaîne complète dans les journaux;
- ne pas utiliser une base de production pendant le laboratoire.


## 4. Configurer MongoDB

**Créer un fichier de configuration typé (config/database.config.ts)**
On centralise la configuration pour éviter de manipuler des chaînes de caractères brutes dans les modules.

```ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // On applique l'encodage automatique du mot de passe ici si nécessaire
  uri: process.env.MONGO_URI,
}));

```

**Configurer le AppModule**
Le serveur va valider le .env et injecter proprement la configuration de manière asynchrone.

### Configurer la connexion à MongoDB :

Ajoutez MongooseModule dans app.module.ts

Au lieu :
```ts
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
```
Utiliser : 

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    // 1. Gestion des configurations avec validation stricte
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig], // Charge notre fichier de config
      validationSchema: Joi.object({
        // Si MONGO_URI est absent, NestJS plantera immédiatement avec un message clair
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),

    // 2. Connexion asynchrone et sécurisée à MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Récupération typée et sécurisée
        uri: configService.get<string>('database.uri'),
        // Options de production recommandées
        autoIndex: process.env.NODE_ENV !== 'production', // Désactive l'auto-indexation en prod pour les performances
      }),
    }),
  ],
})
export class AppModule {}

```

## 5. Vérifier la connexion

Tester au moins deux situations :

1. MongoDB est disponible et l’application démarre;
2. MongoDB est indisponible ou l’URI est invalide et l’application ne prétend pas être prête.

On doit pouvoir confirmer quelle base de développement est utilisée sans exposer les informations sensibles de connexion.


## 6. Concevoir le schéma du bâtiment

### Courte explication

Un DTO décrit les données acceptées ou retournées par l’API. Un schéma Mongoose décrit la manière dont les données sont conservées dans MongoDB. Ces deux modèles peuvent se ressembler, mais ils n’ont pas la même responsabilité.

### Travail à réaliser

Créer un schéma de bâtiment dans le module `buildings`. Il doit représenter les propriétés déjà prévues par le contrat de l’API et prendre en charge les dates de création et de modification.

Déterminer :

- les propriétés obligatoires;
- les types MongoDB appropriés;
- les valeurs qui doivent être normalisées;
- les contraintes utiles à la persistance;
- les propriétés qui ne doivent jamais être exposées au client.

### Décision à justifier

Choisir une stratégie d’unicité pour le nom d’un bâtiment. Une vérification dans le service améliore le message retourné, mais seul un index unique protège réellement les données lorsque plusieurs requêtes concurrentes sont reçues.

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Building extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  yearBuilt: number;

  @Prop({ default: null })
  createdAt?: Date;

  @Prop({ default: null })
  modifiedAt?: Date;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
```

## 7. Concevoir le schéma du local

Créer un schéma de local dans le module `rooms` en conservant les propriétés définies dans le contrat existant.

Chaque local doit conserver une référence vers son bâtiment. On utilisera deux collections plutôt qu’une liste de locaux imbriquée sans limite dans chaque bâtiment.

Cette décision est justifiée parce que :

- un local possède son propre cycle de vie;
- les locaux peuvent devenir nombreux;
- on doit pouvoir les chercher et les filtrer indépendamment;
- chaque local appartient à un seul bâtiment.

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  buildingId: string;

  @Prop({ required: true })
  floor: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  capacity: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
```

## 8. Définir les index nécessaires

Ajouter uniquement les index justifiés par une requête fréquente ou une règle métier.

On doit notamment évaluer :

- un index permettant de retrouver les locaux d’un bâtiment;
- un index composé empêchant deux locaux d’un même bâtiment de porter le même nom normalisé;
- un index protégeant l’unicité retenue pour les bâtiments.

Pour chaque index, ajouter une courte justification dans le document d’architecture ou dans la pull request.


## 9. Intégrer les modèles dans NestJS

**Enregistrer les modèles**

Dans NestJS, un modèle Mongoose doit être enregistré dans le module fonctionnel qui l’utilise. Le service peut ensuite le recevoir par injection de dépendances.

### Travail à réaliser

- enregistrer le schéma du bâtiment dans `BuildingsModule`;
- enregistrer le schéma du local dans `RoomsModule`;
- injecter chaque modèle dans son service;
- importer ou exporter seulement les dépendances réellement nécessaires entre les modules.

On conserve une organisation par fonctionnalité : les schémas des bâtiments restent avec le domaine `buildings`, et ceux des locaux avec le domaine `rooms`.

```ts
// importer le schema pour le document de la collection 'buildings' après l'avoir créé
import { Building } from './schemas/building.schema';

// Importer Model et InjectModel de mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BuildingsService {
    // Injecter Model à l'aide de InjectModel dans le constructeur de BuildingService
  constructor(
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>,
  ) {}
   
   // rendre les appels asynchrones : 
   // 1. changer la signature des services pour asynchrone : async, 
   // 2. retourner une Promise ou un Observable, 
   // 3. ajuster les fonctions des controlleurs pour devenir asynchrones: async 
   // 4. retourner une Promise ou un Observable(pour le controlleur)
  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }

  async findById(id: string): Promise<Building> {
    const building = await this.buildingModel.findById(id).exec();
    if (!building) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
    return building;
  }

  async create(data: Partial<Building>): Promise<Building> {
    return this.buildingModel.create(data);
  } 

}
```

## 10. Migrer le service des bâtiments

Remplacer le tableau en mémoire par des opérations Mongoose pour :

- créer un bâtiment;
- consulter la collection;
- consulter un bâtiment précis;
- modifier partiellement un bâtiment;
- supprimer un bâtiment.

### Orientations

- les opérations de base de données sont asynchrones;
- un identifiant bien formé peut tout de même ne correspondre à aucun document;
- une mise à jour doit appliquer les validations prévues;
- les DTO validés restent les entrées du service;
- une opération ne doit pas retourner directement des détails techniques de Mongoose.

## 11. Migrer le service des locaux

Remplacer le stockage temporaire des locaux par le modèle Mongoose.

Les opérations doivent toujours respecter le contexte du bâtiment indiqué dans l’URI. Un local appartenant au bâtiment B ne doit pas être retourné lorsqu’on le recherche sous le bâtiment A.

Avant une création, on doit vérifier que le bâtiment parent existe. Cette vérification est une règle métier et ne relève pas du DTO.

## 12. Choisir une stratégie de suppression

Décider ce qui arrive aux locaux lorsqu’on tente de supprimer leur bâtiment.

| Stratégie | Conséquence |
|---|---|
| Refuser la suppression | On doit supprimer les locaux avant le bâtiment |
| Supprimer en cascade | Le bâtiment et ses locaux sont supprimés ensemble |
| Laisser les locaux orphelins | Stratégie à exclure dans `energy-api` |

Pour ce laboratoire, privilégier une stratégie simple que l’on peut appliquer de façon fiable. Documenter la décision et la limite éventuelle. Une transaction pourra être étudiée lorsque plusieurs écritures devront devenir atomiques.


## 13. Préserver le contrat de l’API

### A. Transformer les documents persistés

#### Problème à résoudre

MongoDB et Mongoose utilisent des propriétés techniques comme `_id` et `__v`. Elles ne doivent pas apparaître automatiquement dans le contrat public si celui-ci prévoit `id`.

### Travail à réaliser

Mettre en place une transformation cohérente qui :

- expose `id` selon le format public retenu;
- masque `_id` et `__v`;
- contrôle les dates exposées;
- ne retourne jamais un document contenant des renseignements techniques imprévus;
- demeure identique pour une ressource seule et une collection.

On peut employer un mapper, une configuration de sérialisation ou une transformation du schéma. Le choix doit être unique, compréhensible et appliqué partout.

### B. Traduire les erreurs de persistance

Les erreurs du pilote MongoDB ne doivent pas être retournées directement au client.

| Situation | Réponse publique attendue |
|---|---|
| Données invalides reçues par l’API | `400 Bad Request` |
| Identifiant valide, ressource absente | `404 Not Found` |
| Violation d’un index unique | `409 Conflict` |
| Base temporairement indisponible | `503 Service Unavailable` si la situation est reconnue |
| Erreur imprévue | `500 Internal Server Error` |

La réponse doit respecter le format d’erreur déjà retenu dans le projet. Elle ne doit révéler ni le nom d’une collection, ni la pile d’appels, ni l’URI MongoDB, ni le message brut du pilote.

### C. Vérifier l’absence de rupture de contrat

Comparer les réponses conservées au début du laboratoire avec celles de la version utilisant MongoDB.

Vérifier que :

- les routes et méthodes HTTP n’ont pas changé;
- les noms et types des propriétés publiques demeurent cohérents;
- les codes de statut sont les mêmes;
- aucune propriété MongoDB n’est exposée;
- la version publique de l’API n’a pas été changée sans justification;
- la documentation OpenAPI décrit toujours le comportement réel.

## 16. Vérifier la persistance

### Préparer des scénarios manuels

Créer une collection Postman ou un fichier de requêtes HTTP couvrant au minimum :

| Scénario | Résultat attendu |
|---|---|
| Créer un bâtiment valide | `201 Created` |
| Créer un local dans ce bâtiment | `201 Created` |
| Redémarrer l’API puis consulter les ressources | Les données sont toujours présentes |
| Créer un doublon interdit | `409 Conflict` |
| Consulter un identifiant valide mais absent | `404 Not Found` |
| Chercher un local sous le mauvais bâtiment | `404 Not Found` |
| Modifier une ressource | La modification persiste après redémarrage |
| Supprimer un bâtiment contenant des locaux | La stratégie documentée est appliquée |

Les scénarios invalides déjà vérifiés dans le laboratoire sur les validations n’ont pas à être recréés en entier. On vérifie cependant qu’ils fonctionnent encore après la migration.

### Inspecter les données dans MongoDB

À l’aide de `mongosh` ou de MongoDB Compass :

- repérer les deux collections;
- confirmer le type des propriétés;
- vérifier la référence entre un local et son bâtiment;
- observer les index créés;
- confirmer la présence des timestamps;
- s’assurer qu’aucune donnée sensible inutile n’est conservée.


## 17. Utiliser le repository avec les services

Avant enregistrer le dans les providers du module buildings
et ajouter dans imports le schema : 
```ts
imports: [
    MongooseModule.forFeature([{ name: Building.name, schema: BuildingSchema }]),
],
```

### Créez un fichier `buildings.repository.ts` :
```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './schemas/building.schema';

@Injectable()
export class BuildingsRepository {
  constructor(
    @InjectModel(Building.name) private readonly buildingModel: Model<Building>,
  ) {}

  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }

  async findById(id: string): Promise<Building | null> {
    return this.buildingModel.findById(id).exec();
  }

  async create(data: Partial<Building>): Promise<Building> {
    return this.buildingModel.create(data);
  }

  async deleteById(id: string): Promise<void> {
    await this.buildingModel.findByIdAndDelete(id).exec();
  }
}
```
### Utiliser le repository dans le service
Modifiez le service pour utiliser le repository :

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { BuildingsRepository } from './buildings.repository';
import { Building } from './schemas/building.schema';

@Injectable()
export class BuildingsService {
  constructor(private readonly buildingsRepository: BuildingsRepository) {}

  async findAll(): Promise<Building[]> {
    return this.buildingsRepository.findAll();
  }

  async findById(id: string): Promise<Building> {
    const building = await this.buildingsRepository.findById(id);
    if (!building) {
      throw new NotFoundException(`Le bâtiment avec l'ID "${id}" n'existe pas.`);
    }
    return building;
  }

  async create(data: Partial<Building>): Promise<Building> {
    return this.buildingsRepository.create(data);
  }
}
```

## 18. Mettre à jour le projet public

### Mettre à jour le README

Documenter :

- le rôle de MongoDB dans l’architecture;
- les prérequis pour démarrer l’application;
- le nom de la variable `MONGODB_URI`;
- la manière de préparer une base locale;
- les commandes utiles;
- la stratégie de suppression retenue.

## 19. Mettre à jour le document d’architecture

Dans `docs/architecture.md` :

- faire passer MongoDB de composante prévue à composante implémentée;
- présenter les collections et leur relation;
- distinguer le DTO public, le modèle du domaine et le schéma Mongoose;
- justifier les index principaux;
- consigner la stratégie de suppression.

## 20. Préparer la pull request

La pull request de la branche `task` doit cibler la branche `feature` de l’issue parente.

Elle doit résumer :

- le remplacement du stockage en mémoire;
- les schémas et la relation retenue;
- les index ajoutés;
- la stratégie de suppression;
- la traduction des erreurs MongoDB;
- la vérification de la stabilité du contrat public.

Utiliser la référence correspondant à la sous-issue réelle :

```text
Refs #NUMERO_DE_LA_SOUS_ISSUE
```


## Livrables

- configuration MongoDB externalisée;
- fichier `.env.example` sans secret;
- schéma Mongoose du bâtiment;
- schéma Mongoose du local;
- relation et index documentés;
- services utilisant MongoDB plutôt que des tableaux;
- transformation vers les représentations publiques;
- erreurs de persistance traduites en erreurs HTTP;
- scénarios Postman ou fichier de requêtes HTTP;
- README et architecture mis à jour;
- pull request vers la branche `feature`.

## Critères d’acceptation

- [ ] L’application se connecte à la base configurée par l’environnement.
- [ ] L’application refuse de démarrer sans configuration obligatoire.
- [ ] Aucun secret ni fichier `.env` n’est versionné.
- [ ] Les bâtiments et les locaux persistent après un redémarrage.
- [ ] Chaque local référence un bâtiment existant.
- [ ] Les services n’utilisent plus de tableaux en mémoire.
- [ ] Les contrôleurs demeurent centrés sur les échanges HTTP.
- [ ] Les index sont justifiés par une contrainte ou une requête.
- [ ] Les doublons interdits produisent `409 Conflict`.
- [ ] Les ressources absentes produisent `404 Not Found`.
- [ ] `_id`, `__v` et les détails du pilote ne sont pas exposés.
- [ ] La stratégie de suppression est cohérente et documentée.
- [ ] Les routes et représentations publiques n’ont pas changé.
- [ ] La version actuelle de l’API est conservée.
- [ ] Swagger/OpenAPI correspond encore au comportement réel.
- [ ] Le lint et la compilation réussissent.

## Vérification finale

```bash
npm run format
npm run lint
npm run build
```

Effectuer ensuite les scénarios Postman prévus et vérifier l’état final des collections dans MongoDB.

## Partie facultatifs

Si le travail demandé est terminé :

- ajouter une pagination raisonnable aux collections;
- analyser un index avec `explain()`;
- isoler une base réservée aux tests automatisés futurs;
- ajouter un contrôle de disponibilité de MongoDB à la route d’état;
- préparer une transaction pour une suppression en cascade.

# Références

- NestJS — MongoDB : https://docs.nestjs.com/techniques/mongodb
- NestJS — Configuration : https://docs.nestjs.com/techniques/configuration
- Mongoose — Schémas : https://mongoosejs.com/docs/guide.html
- Mongoose — Validation : https://mongoosejs.com/docs/validation.html
- MongoDB — Modélisation des données : https://www.mongodb.com/docs/manual/data-modeling/
- MongoDB — Index : https://www.mongodb.com/docs/manual/indexes/
