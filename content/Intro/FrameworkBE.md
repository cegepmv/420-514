+++
draft = false
title = '📘 Cadriciels (framework) : rappel'
weight = 12
+++

## Rappel : les cadriciels

Un **cadriciel** (*framework*) est un ensemble structuré d’outils, de conventions et de composants réutilisables permettant de développer une application.

Lorsqu’on parle de **cadriciel côté serveur**, on fait référence aux frameworks conçus pour la partie *backend* d’une application, par exemple :

* le démarrage de l’application;
* la définition des routes;
* la gestion des requêtes/réponses entre le client et le serveur
* la gestion des dépendances;
* la validation des données;
* la gestion des erreurs;
* l’organisation du code;
* la logique métier (traitement des données, règles d’affaires)
* la communication avec les bases de données
* la sécurité et la gestion des utilisateurs


## Cadriciel et bibliothèque

Une bibliothèque et un cadriciel fournissent tous les deux du code réutilisable, mais leur fonctionnement diffère.

| Bibliothèque                                            | Cadriciel                                             |
| ------------------------------------------------------- | ----------------------------------------------------- |
| On appelle la bibliothèque lorsque cela est nécessaire. | Le cadriciel appelle notre code au moment approprié.  |
| On conserve le contrôle général de l’application.       | Le cadriciel contrôle le cycle d’exécution.           |
| Elle répond généralement à un besoin précis.            | Il propose une structure complète et des conventions. |
| Exemple : une bibliothèque de calculs.                  | Exemple : NestJS pour développer une API.             |

Cette différence correspond au principe d’**inversion de contrôle** :

> Avec un cadriciel, on écrit des composants qui seront détectés, créés et exécutés par le cadriciel.


## Pourquoi utiliser un cadriciel?

### Avantages

* accélération du développement;
* structure uniforme entre les projets;
* séparation plus claire des responsabilités;
* réutilisation de composants existants;
* meilleure maintenabilité;
* intégration facilitée des tests et de la sécurité;
* travail d’équipe plus prévisible;
* Communauté et support.

### Limites

* période d’apprentissage;
* conventions à respecter;
* dépendance envers l’écosystème du cadriciel;
* risque d’utiliser des fonctionnalités sans comprendre leur fonctionnement;
* complexité parfois inutile pour une très petite application.



## Quelques exemples

| Domaine         | Cadriciels       |
| --------------- | ---------------- |
| Backend Node.js | NestJS, Express  |
| Frontend Web    | Angular, Next.js |
| Java            | Spring Boot (BE)     |
| .NET            | ASP.NET Core (BE)    |
| Python          | Django, Flask (BE), FastAPI  (BE)|
| PHP             | Laravel (BE), Symfony  (BE)|


> La frontière entre une bibliothèque et un cadriciel peut parfois être nuancée. Par exemple, Express est souvent qualifié de cadriciel minimaliste, tandis que NestJS impose une structure beaucoup plus complète.



## À retenir

Un cadriciel ne remplace pas les connaissances en programmation ou en HTTP. Il fournit une structure permettant de les appliquer de manière organisée.

> Dans `energy-api`, NestJS déterminera notamment : 
> * comment l’application démarre;
> * comment les routes sont déclarées;
> * comment les composants sont regroupés;
> * comment les services sont injectés;
> * comment une requête HTTP atteint le bon contrôleur.






