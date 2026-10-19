+++
draft = false
title = '📘 Gestion données massives et Intelligence des Données'
weight = 101
+++

## 1. De la donnée à la décision : la pyramide DIKW

Une donnée seule ne vaut pas grand-chose. Elle prend de la valeur à mesure qu'on lui ajoute du **contexte**.

| Niveau | Définition | Exemple |
|---|---|---|
| **Donnée** | Fait brut, sans contexte | `23` |
| **Information** | Donnée avec contexte | « Il faisait 23 °C à Montréal le 3 juillet » |
| **Connaissance** | Motif ou relation tirés de l'information | « Les canicules font augmenter les requêtes 311 liées aux arbres » |
| **Sagesse / décision** | Action éclairée par la connaissance | « Prépositionner des équipes d'élagage lors des prochaines canicules » |

**À retenir** : chaque niveau dépend de la qualité du précédent. Une décision fondée sur des données erronées reste une mauvaise décision, même si l'analyse est impeccable.

---

## 2. Les domaines connexes

Le monde des données regroupe plusieurs disciplines qui se chevauchent. Les titres d'emploi varient d'une entreprise à l'autre, mais les rôles se distinguent assez bien par ce qu'ils **produisent**.

| Domaine | Question typique | Outils courants | Livrable |
|---|---|---|---|
| **Ingénierie des données** (*Data Engineering*, DE) | Comment collecter, stocker et acheminer les données de façon fiable ? | SQL, Python, Spark, Airflow, infonuagique | Pipelines, entrepôts, lacs de données |
| **Analytique de données** (*Data Analytics*, DA) | Que s'est-il passé, et pourquoi ? | SQL, Excel, Python, Power BI, Tableau | Rapports, tableaux de bord |
| **Intelligence d'affaires** (*Business Intelligence*, BI) | Comment suivre la performance de l'organisation ? | Power BI, Tableau, entrepôts de données | Indicateurs clés (KPI), tableaux de bord |
| **Science des données** (*Data Science*, DS) | Que va-t-il se passer ? Peut-on le modéliser ? | Python, R, scikit-learn, statistiques | Modèles, prédictions, expérimentations |
| **Apprentissage automatique** (*Machine Learning*, ML) et **IA** | Comment un système apprend-il à partir des données ? | scikit-learn, PyTorch, TensorFlow | Modèles déployés |
| **Fouille de données** (*Data Mining*) | Quels motifs cachés se trouvent dans les données ? | Python, R, Weka | Règles d'association, regroupements, anomalies |
| **Gouvernance des données** | Qui a le droit de faire quoi, avec quelles données ? | Catalogues de données, politiques, Loi 25 | Politiques, règles de qualité, conformité |

**Moyen mnémotechnique** : l'ingénieur **fournit** les données, l'analyste les **explique**, le scientifique les **modélise**, et la gouvernance **encadre** le tout.

### Les quatre types d'analytique

| Type | Question | Exemple |
|---|---|---|
| **Descriptive** | Que s'est-il passé ? | Nombre de requêtes 311 par arrondissement en 2025 |
| **Diagnostique** | Pourquoi est-ce arrivé ? | Pourquoi les requêtes ont-elles bondi en février ? |
| **Prédictive** | Que va-t-il se passer ? | Prévoir le volume de requêtes de la semaine prochaine |
| **Prescriptive** | Que devrions-nous faire ? | Optimiser les tournées de déneigement selon les prévisions |

La difficulté et la valeur potentielle augmentent à chaque niveau, mais **tous les niveaux reposent sur des données propres**.

## 3. Comprendre les données massives (Big Data) 📊 

### Définition

**Big Data** = ensemble de technologies et de méthodes permettant de gérer des données :
- **Volumineuses** (grandes quantités)
- **Variées** (formats multiples)
- **Produites à grande vitesse** (en continu)
- **Pas toujours fiables** (qualité variable)
- **Utiles pour créer de la valeur**

### Les 5V du Big Data :

| V        | Signification                        | Exemple                                         |
|----------|--------------------------------------|-------------------------------------------------|
| Volume   | Très grandes quantités de données    | Données d’un site e-commerce (millions/jour)   |
| Vélocité | Données générées en continu          | Données de capteurs connectés (IoT)            |
| Variété  | Formats multiples                    | Texte, image, vidéo, tableau Excel             |
| Véracité | Qualité et fiabilité                 | Erreurs dans les fichiers, données manquantes  |
| Valeur   | Intérêt métier                       | Mieux comprendre ses clients                   |

### Nuances importantes

- Le Big Data **n'est pas qu'une question de taille**. On parle de Big Data lorsque les outils traditionnels (une seule machine, une base de données relationnelle) ne suffisent plus.
- Technologies associées : traitement distribué (Hadoop, Spark), stockage infonuagique, traitement de flux (Kafka).
- La grande majorité des problèmes d'analyse en entreprise tiennent dans un **fichier ou une base de données classique**. Inutile de déployer Spark pour 50 000 lignes : pandas ou SQL suffisent largement.
- La **véracité** est le V qui nous concerne le plus aujourd'hui : c'est elle qui justifie le nettoyage des données.


## 4. Types et sources de données

### Selon la structure

| Type | Description | Exemples |
|---|---|---|
| **Structurées** | Organisées en lignes et colonnes, schéma fixe | Tables SQL, fichiers CSV, feuilles Excel |
| **Semi-structurées** | Organisation partielle, schéma flexible | JSON, XML, journaux (*logs*), réponses d'API |
| **Non structurées** | Aucune organisation tabulaire | Texte libre, images, audio, vidéo |

### Selon la source

- Transactions (ventes, paiements)
- Capteurs et objets connectés (IoT)
- API et services web
- Formulaires et sondages
- Données ouvertes (ex. : donnees.montreal.ca)
- Réseaux sociaux
- Collecte manuelle

**Lien avec le cours** : la méthode de **collecte** détermine les biais et les défauts de qualité que vous devrez ensuite détecter et traiter. Un formulaire sans validation produira des dates de formats variés ; un capteur défectueux produira des valeurs aberrantes.



## 5. Le cycle de vie d'un projet : CRISP-DM

**CRISP-DM** (*Cross-Industry Standard Process for Data Mining*) est la méthode de référence pour structurer un projet de données.

1. **Compréhension du problème d'affaires** : quel est l'objectif réel ?
2. **Compréhension des données** : de quelles données dispose-t-on, et que valent-elles ?
3. **Préparation des données** : nettoyage, transformation, construction du jeu final. ← *l'objet de cette séance*
4. **Modélisation** : application de techniques statistiques ou de ML.
5. **Évaluation** : les résultats répondent-ils au besoin d'affaires ?
6. **Déploiement** : mise en production, rapport, tableau de bord.

### 📈 Étapes principales :

1. **Ingestion** : collecte des données depuis différentes sources (ex : fichiers, capteurs, API)
2. **Stockage** : conservation des données dans un système adapté (ex : lac de données, entrepôt de données)
3. **Traitement** : nettoyage, transformation, préparation
4. **Analyse** : interprétation, calculs, statistiques
5. **Restitution / Action** : visualisation via des tableaux de bord, alertes, ou décisions automatisées

### Exemple :
Un service de transport veut analyser les retards des bus :
- Ingestion des horaires réels
- Stockage dans une base centralisée
- Calcul du temps de retard
- Création d’un rapport de performance
- Envoi automatique d’alertes aux responsables

**Points à retenir**

- Le cycle est **itératif** : on revient fréquemment aux étapes précédentes.
- La préparation occupe une part très importante du temps de projet (on cite souvent **60 à 80 %**, un ordre de grandeur plutôt qu'une statistique précise).
- Un projet qui saute les étapes 1 et 2 prépare souvent les mauvaises données pour la mauvaise question.

### ETL, ELT, entrepôts et lacs

| Notion | Définition |
|---|---|
| **ETL** | *Extract, Transform, Load* : on extrait, on transforme, puis on charge dans la destination. |
| **ELT** | *Extract, Load, Transform* : on charge d'abord les données brutes, puis on les transforme sur place. |
| **Entrepôt de données** (*data warehouse*) | Données structurées, nettoyées et modélisées, prêtes à analyser. |
| **Lac de données** (*data lake*) | Données brutes de tous formats, conservées telles quelles. |


## 6. Architectures Big Data modernes

### 🔹 Modèle "Bronze – Silver – Gold"
Approche modulaire et scalable

| Niveau | Contenu                                   |
|--------|--------------------------------------------|
| Bronze | Données brutes, non modifiées              |
| Silver | Données nettoyées, organisées              |
| Gold   | Données prêtes à l’analyse métier          |

### Schéma logique d’une architecture Big Data :
```text
        ┌─────────────┐
        │ Sources     │ ← fichiers, capteurs, CRM, web
        └─────┬───────┘
              ↓
        ┌───────────────┐
        │ Ingestion     │ ← batch ou temps réel (outil de type pipeline (ETL))
        └─────┬─────────┘
                ↓
        ┌───────────────┐
        │   Stockage    │ ← Data Lake(lac de données), Data Warehouse (entrepôt de données)
        └────┬──────────┘
             ↓
        ┌────────────────┐
        │   Traitement   │ ← Spark, SQL, pipelines
        └────┬───────────┘
             ↓
        ┌────────────────┐
        │    Analyse     │ ← requêtes, modèles, BI: outils de visualisation (dashboards)
        └────────────────┘

```
Cette architecture permet la séparation des responsabilités, la traçabilité, et surtout l’évolutivité.

## 7. Les rôles dans un projet Big Data

| Rôle            | Mission principale                               | Compétences requises                   |
| --------------- | ------------------------------------------------ | -------------------------------------- |
| Data Engineer   | Construire les pipelines de données (flux)       | SQL, Python, outils ETL                |
| Data Analyst    | Analyser les données, créer des rapports         | Requêtes SQL, visualisation            |
| BI Analyst      | Créer des tableaux de bord pour les métiers      | Outils BI (ex : Power BI, Tableau)     |
| Architecte Data | Concevoir l’architecture globale                 | Infrastructure, sécurité, modélisation |
| Data Steward    | Garantir la qualité et la conformité des données | RGPD, documentation, catalogue         |


## 8. Outils types dans un projet Big Data

| Étape         | Type d’outil                        | Fonction principale                               |
| ------------- | ----------------------------------- | ------------------------------------------------- |
| Ingestion     | Pipeline de données (ETL/ELT)       | Collecter, transformer et charger les données     |
| Stockage      | Data Lake / Entrepôt de données     | Stocker de manière centralisée                    |
| Traitement    | Moteur analytique distribué         | Gérer de gros volumes avec des calculs parallèles |
| Analyse       | Notebook ou interface d’analyse     | Explorer les données, faire des requêtes          |
| Visualisation | Outil de Business Intelligence (BI) | Créer des rapports, graphiques, KPIs              |
| Gouvernance   | Catalogue de données                | Gérer qualité, accès, conformité                  |

![BI tools](/420-514/images/BI_tools.png)

## 9. Étude de cas simple – Analyse des ventes

**Contexte** : une entreprise vend des produits en ligne.

**Objectif** : identifier les produits les plus vendus par région.

### Étapes du projet :

1. Ingestion des fichiers de ventes (.csv)
2. Stockage dans un lac de données
3. Traitement : regroupement par produit, par région
4. Analyse : top 10 des produits vendus
5. Visualisation : création d’un tableau de bord



## 10. Données, éthique et conformité

Travailler avec des données implique des responsabilités :

- **Traçabilité** : documentez chaque transformation. Quelqu'un doit pouvoir refaire votre analyse.
- **Données personnelles** : au Québec, la **Loi 25** encadre la collecte, l'utilisation et la conservation des renseignements personnels. Anonymisez ou retirez ce qui n'est pas nécessaire.
- **Biais** : un échantillon non représentatif ou une collecte biaisée mène à des conclusions trompeuses.
- **Esprit critique** : une corrélation n'est pas une causalité.


---

## 📖 Glossaire des termes techniques

| Terme                          | Définition                                                     |
| ------------------------------ | -------------------------------------------------------------- |
| **Big Data**                   | Données dont le volume, la vélocité ou la variété dépassent les outils traditionnels                   |
| **Ingestion**                  | Processus de collecte de données                               |
| **ETL**                        | Processus d'extraction, de transformation et de chargement des données. Extract – Transform – Load : pipeline de traitement de données |
| **Lac de données (Data Lake)**                  | Système de stockage pour données brutes, tous formats                        |
| **Entrepôt de données**        | Base centralisée de données structurées prêtes à analyser                       |
| **Pipeline**                   | Chaîne d’opérations automatisées sur les données               |
| **Dashboard**                  | Tableau de bord interactif avec visualisations                 |
| **Cluster**                    | Groupe de serveurs qui travaillent ensemble                    |
| **Notebook**                   | Interface interactive pour écrire du code + commentaires       |
| **BI (Business Intelligence)** | Outils et méthodes pour analyser les données                   |
| **RGPD**                       | Règlement général sur la protection des données (Europe)       |
| **DIKW** | Pyramide Donnée, Information, Connaissance, Sagesse |
| **KPI** | Indicateur clé de performance |
| **CRISP-DM** | Méthode en six étapes pour structurer un projet de données |
| **Valeur aberrante** | Observation très éloignée des autres, erreur ou cas réel |
| **Données ouvertes** | Données publiques, libres d'accès et de réutilisation |


## Ce qu’il faut retenir

* Le Big Data est **plus qu’une quantité de données** : c’est une façon de les exploiter intelligemment.
* Une architecture Big Data suit un cycle précis : **ingestion → stockage → traitement → analyse**.
* De nombreux métiers sont impliqués, avec des rôles complémentaires.
* Des outils adaptés existent pour chaque étape (ETL, data lake, BI, etc.).
* Les compétences en données sont **très recherchées** dans tous les secteurs.

## Ressources pour approfondir

- Portail de données ouvertes de la Ville de Montréal : <https://donnees.montreal.ca>
- Documentation de pandas : <https://pandas.pydata.org/docs/>
- Commission d'accès à l'information du Québec (Loi 25) : <https://www.cai.gouv.qc.ca>
* [Kaggle – Jeux de données gratuits](https://www.kaggle.com/)
* [Microsoft Learn – Parcours data (gratuit)](https://learn.microsoft.com/)
* [OpenClassrooms – Cours sur le Big Data](https://openclassrooms.com/)
