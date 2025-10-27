+++
draft = true
title = '📘 Big Data & Intelligence des Données'
weight = 101
+++


## 1. Comprendre les données massives (Big Data) 📊 

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


## 2️. Le cycle de vie d’un projet Big Data

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

## 3️. Architectures Big Data modernes

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

## 4️. Les rôles dans un projet Big Data

| Rôle            | Mission principale                               | Compétences requises                   |
| --------------- | ------------------------------------------------ | -------------------------------------- |
| Data Engineer   | Construire les pipelines de données (flux)       | SQL, Python, outils ETL                |
| Data Analyst    | Analyser les données, créer des rapports         | Requêtes SQL, visualisation            |
| BI Analyst      | Créer des tableaux de bord pour les métiers      | Outils BI (ex : Power BI, Tableau)     |
| Architecte Data | Concevoir l’architecture globale                 | Infrastructure, sécurité, modélisation |
| Data Steward    | Garantir la qualité et la conformité des données | RGPD, documentation, catalogue         |


## 5️. Outils types dans un projet Big Data

| Étape         | Type d’outil                        | Fonction principale                               |
| ------------- | ----------------------------------- | ------------------------------------------------- |
| Ingestion     | Pipeline de données (ETL/ELT)       | Collecter, transformer et charger les données     |
| Stockage      | Data Lake / Entrepôt de données     | Stocker de manière centralisée                    |
| Traitement    | Moteur analytique distribué         | Gérer de gros volumes avec des calculs parallèles |
| Analyse       | Notebook ou interface d’analyse     | Explorer les données, faire des requêtes          |
| Visualisation | Outil de Business Intelligence (BI) | Créer des rapports, graphiques, KPIs              |
| Gouvernance   | Catalogue de données                | Gérer qualité, accès, conformité                  |


## 6️. Étude de cas simple – Analyse des ventes

**Contexte** : une entreprise vend des produits en ligne.

**Objectif** : identifier les produits les plus vendus par région.

### Étapes du projet :

1. Ingestion des fichiers de ventes (.csv)
2. Stockage dans un lac de données
3. Traitement : regroupement par produit, par région
4. Analyse : top 10 des produits vendus
5. Visualisation : création d’un tableau de bord

---

## 📚 Ressources pour approfondir

* [Kaggle – Jeux de données gratuits](https://www.kaggle.com/)
* [Microsoft Learn – Parcours data (gratuit)](https://learn.microsoft.com/)
* [OpenClassrooms – Cours sur le Big Data](https://openclassrooms.com/)

---

## 📖 Glossaire des termes techniques

| Terme                          | Définition                                                     |
| ------------------------------ | -------------------------------------------------------------- |
| **Big Data**                   | Données massives, complexes et à fort volume                   |
| **Ingestion**                  | Processus de collecte de données                               |
| **ETL**                        | Extract – Transform – Load : pipeline de traitement de données |
| **Data Lake**                  | Système de stockage pour données brutes                        |
| **Entrepôt de données**        | Base structurée optimisée pour l’analyse                       |
| **Pipeline**                   | Chaîne d’opérations automatisées sur les données               |
| **Dashboard**                  | Tableau de bord interactif avec visualisations                 |
| **Cluster**                    | Groupe de serveurs qui travaillent ensemble                    |
| **Notebook**                   | Interface interactive pour écrire du code + commentaires       |
| **BI (Business Intelligence)** | Outils et méthodes pour analyser les données                   |
| **RGPD**                       | Règlement général sur la protection des données (Europe)       |


## Ce qu’il faut retenir

* Le Big Data est **plus qu’une quantité de données** : c’est une façon de les exploiter intelligemment.
* Une architecture Big Data suit un cycle précis : **ingestion → stockage → traitement → analyse**.
* De nombreux métiers sont impliqués, avec des rôles complémentaires.
* Des outils adaptés existent pour chaque étape (ETL, data lake, BI, etc.).
* Les compétences en données sont **très recherchées** dans tous les secteurs.

