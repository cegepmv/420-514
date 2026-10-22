---
title: "Analyse exploratoire des données (EDA)"
date: 2026-10-22
draft: false
description: "Démarche d'analyse exploratoire : profilage, analyse univariée, bivariée et multivariée, choix des graphiques, corrélation, valeurs manquantes et pièges d'interprétation."
summary: "Comprendre un jeu de données avant de le modéliser : poser des questions, regarder la forme des distributions, explorer les relations et documenter ses découvertes."
tags: ["EDA", "analyse exploratoire", "visualisation", "pandas", "statistiques descriptives"]
categories: ["Collecte et interprétation de données"]
weight: 2
toc: true
---

> **Cours** : Collecte et interprétation de données  
> **Programme** : Techniques de l'informatique, 3<sup>e</sup> année  
> **Prérequis** : Python, pandas, notions de nettoyage de données

## Objectifs

À la fin de cette section, vous serez capable de :

1. Expliquer le rôle de l'**analyse exploratoire des données** (EDA) dans un projet.
2. Appliquer une démarche d'exploration structurée et la documenter.
3. Choisir le **graphique** adapté à une question.
4. Interpréter la **forme d'une distribution**, une boîte à moustaches et un coefficient de corrélation.
5. Repérer les **pièges** : valeurs manquantes cachées, variable confondante, paradoxe de Simpson, axe tronqué.

---

## 1. Qu'est-ce que l'EDA ?

L'**analyse exploratoire des données** (*Exploratory Data Analysis*, EDA) est une approche popularisée par le statisticien John Tukey dans les années 1970. L'idée : **regarder les données avant de les modéliser**, avec des résumés chiffrés et surtout des graphiques, pour :

- comprendre la structure et la qualité des données ;
- découvrir des motifs, des anomalies et des relations ;
- formuler des **hypothèses** à tester ;
- vérifier que les données répondent bien à la question d'affaires.

L'EDA ne prouve rien : elle **oriente**. Une relation observée en exploration est une piste, pas une conclusion.

## 2. La démarche

![Démarche EDA en sept étapes avec une boucle d'itération](/images/cours-donnees/eda-demarche.svg)

| Étape | Question à se poser | Outils pandas / Python |
|---|---|---|
| 1. Question | Quel est l'objectif ? Quelles variables comptent ? | Notes, dictionnaire de données |
| 2. Profilage | Combien de lignes ? Quels types ? Quels manques ? | `shape`, `info()`, `isna().sum()` |
| 3. Univarié | Comment chaque variable est-elle distribuée ? | `describe()`, histogramme, boîte à moustaches |
| 4. Bivarié | Y a-t-il des relations entre variables ? | `corr()`, nuage de points, `groupby()` |
| 5. Anomalies | Quelles valeurs sont inhabituelles ? | IQR, z-score |
| 6. Hypothèses | Que faut-il tester ensuite ? | Nouvelles questions |
| 7. Documenter | Quelles décisions et conclusions retenir ? | Cellules Markdown |

La démarche est **itérative** : chaque découverte soulève de nouvelles questions.

## 3. Trois niveaux d'exploration

![Trois niveaux : univarié, bivarié, multivarié](/images/cours-donnees/eda-niveaux.svg)

## 4. Profilage rapide

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("donnees.csv")

print(df.shape)                      # lignes, colonnes
df.info()                            # types et valeurs non nulles
print(df.isna().mean().round(3))     # proportion de manquants par colonne
print(df.describe(include="all"))    # résumé numérique et catégoriel
print(df.duplicated().sum())         # nombre de doublons
```

### Visualiser les valeurs manquantes

Avant de choisir une stratégie (suppression, imputation), il faut voir **où** et **comment** les valeurs manquent.

![Matrice des valeurs manquantes et pourcentage par colonne](/images/cours-donnees/eda-valeurs-manquantes.svg)

Si les manques sont **groupés** (comme la colonne `revenu` ci-dessus), ils ne sont probablement pas aléatoires : cherchez la cause avant d'imputer.

```python
sns.heatmap(df.isna(), cbar=False)
plt.title("Valeurs manquantes (jaune = manquant)")
plt.show()
```

## 5. Analyse univariée

### La forme d'une distribution

![Quatre formes de distribution avec moyenne et médiane](/images/cours-donnees/eda-formes-distribution.svg)

- **Symétrique** : moyenne et médiane se confondent.
- **Asymétrique** : la moyenne est tirée vers la queue de la distribution.
- **Bimodale** : deux « bosses » suggèrent deux groupes mélangés ; segmentez avant de résumer.

```python
df["montant"].plot(kind="hist", bins=30, edgecolor="white")
plt.xlabel("Montant ($)")
plt.title("Distribution des montants")
plt.show()
```

### Moyenne ou médiane ?

![Histogramme asymétrique avec mode, médiane et moyenne](/images/cours-donnees/eda-moyenne-mediane.svg)

Sur une distribution asymétrique ou avec des valeurs extrêmes, la **médiane** est un meilleur résumé du « cas typique ». Comparez toujours les deux.

### Lire une boîte à moustaches

![Anatomie d'une boîte à moustaches](/images/cours-donnees/eda-boxplot-anatomie.svg)

- La boîte contient les **50 % centraux** des données (de Q1 à Q3) ; la ligne interne est la **médiane**.
- Les moustaches vont jusqu'à la plus petite et la plus grande valeur **non aberrantes**.
- Les points au-delà de `Q1 − 1,5 × IQR` et `Q3 + 1,5 × IQR` sont signalés comme **valeurs aberrantes** : à vous de décider s'il s'agit d'erreurs de saisie ou de cas réels.

```python
sns.boxplot(x=df["montant"])
plt.show()
```

## 6. Analyse bivariée et multivariée

### Choisir le bon graphique

![Guide de choix du graphique selon la question](/images/cours-donnees/eda-choix-graphique.svg)

### La corrélation

Le coefficient de corrélation de Pearson (`r`, entre −1 et +1) mesure la force d'une relation **linéaire**.

![Quatre nuages de points avec leur coefficient r](/images/cours-donnees/eda-correlations.svg)

Un `r` proche de 0 ne signifie pas « aucune relation » : la relation peut être non linéaire. **Regardez toujours le nuage de points.**

### La matrice de corrélation

![Carte thermique d'une matrice de corrélation](/images/cours-donnees/eda-heatmap-correlation.svg)

```python
corr = df.select_dtypes("number").corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)
plt.show()
```

*Les valeurs de la figure sont fictives et servent seulement à illustrer la lecture.*

### Corrélation ≠ causalité

![Variable confondante : la chaleur influence deux variables](/images/cours-donnees/eda-confondante.svg)

Deux variables peuvent évoluer ensemble parce qu'une **variable confondante** les influence toutes les deux. Avant de parler de cause, demandez-vous : qu'est-ce qui pourrait expliquer les deux à la fois ?

### Le paradoxe de Simpson

![Paradoxe de Simpson : tendance globale opposée aux tendances par groupe](/images/cours-donnees/eda-simpson.svg)

La tendance globale peut être **inverse** de celle observée dans chaque sous-groupe. Explorez systématiquement par groupe (`groupby`, couleur ou facettes) avant de conclure.

```python
sns.scatterplot(data=df, x="x", y="y", hue="groupe")
sns.lmplot(data=df, x="x", y="y", hue="groupe")
```

## 7. Piège de présentation : l'axe tronqué

![Même donnée avec axe tronqué et axe complet](/images/cours-donnees/eda-axe-tronque.svg)

Pour un diagramme à barres, l'axe doit commencer à **0**. Ajoutez toujours un titre, des unités et une légende.

---

## 8. Liste de vérification EDA

- [ ] La question d'affaires est écrite en une phrase.
- [ ] Dimensions, types et doublons vérifiés.
- [ ] Valeurs manquantes visualisées et causes envisagées.
- [ ] Chaque variable clé a un histogramme ou un diagramme à barres.
- [ ] Moyenne **et** médiane comparées.
- [ ] Valeurs aberrantes repérées et décision justifiée.
- [ ] Relations explorées avec des **graphiques**, pas seulement `corr()`.
- [ ] Analyse refaite **par groupe** (risque de Simpson).
- [ ] Graphiques avec titre, unités et axes honnêtes.
- [ ] Hypothèses et limites notées dans le carnet.

## 9. Exercices

1. Sur le jeu de données de l'atelier, produisez le profilage complet et listez **cinq** observations.
2. Tracez l'histogramme de deux variables numériques. Décrivez la forme de chacune et comparez moyenne et médiane.
3. Trouvez deux variables corrélées. Proposez **une** explication causale possible et **une** variable confondante.
4. Refaites un graphique global **par groupe**. La conclusion change-t-elle ?

## 10. Glossaire

| Terme | Définition courte |
|---|---|
| **EDA** | Exploration des données par résumés et graphiques avant modélisation |
| **IQR** | Écart interquartile, `Q3 − Q1` |
| **Mode** | Valeur la plus fréquente |
| **Corrélation (r)** | Mesure de la force d'une relation linéaire, entre −1 et +1 |
| **Variable confondante** | Variable qui influence à la fois deux autres variables |
| **Paradoxe de Simpson** | Tendance globale inversée par rapport à celles des sous-groupes |
| **Valeur aberrante** | Observation très éloignée des autres (erreur ou cas réel) |

## Pour aller plus loin

- Documentation de pandas : <https://pandas.pydata.org/docs/>
- Documentation de seaborn : <https://seaborn.pydata.org>
- Données ouvertes de Montréal : <https://donnees.montreal.ca>
