+++
title = "📘 Analyse exploratoire des donnees (EDA)"
draft = false
weight = 109
+++


[Vidéo : Qu'est-ce que l'analyse de données ? ](https://www.youtube.com/watch?v=gcF31GuwSEs)

## 1. Qu'est-ce que l'EDA ?

L'**analyse exploratoire des données** (*Exploratory Data Analysis*, EDA) est une approche popularisée par le statisticien John Tukey dans les années 1970. L'idée : **regarder les données avant de les modéliser**, avec des résumés chiffrés et surtout des graphiques, pour :

- comprendre la structure et la qualité des données ;
- découvrir des motifs, des anomalies et des relations ;
- formuler des **hypothèses** à tester ;
- vérifier que les données répondent bien à la question d'affaires.

L'EDA ne prouve rien : elle **oriente**. Une relation observée en exploration est une piste, pas une conclusion.

## 2. La démarche

![Démarche EDA en sept étapes avec une boucle d'itération](/420-514/images/cours-donnees/eda-demarche.svg)

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

![Trois niveaux : univarié, bivarié, multivarié](/420-514/images/cours-donnees/eda-niveaux.svg)

## 4. Profilage rapide

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Charger un fichier CSV dans un DataFrame Pandas
df = pd.read_csv('data.csv')
print(df.shape)                      # lignes, colonnes

# Afficher les premières lignes pour vérifier les données
print(df.head())

df.info()                            # types et valeurs non nulles
print(df.isna().mean().round(3))     # proportion de manquants par colonne
print(df.describe(include="all"))    # résumé numérique et catégoriel
print(df.duplicated().sum())         # nombre de doublons
```

[property.csv](/420-514/files/property.csv)

[blood.csv](/420-514/files/blood.csv)

[titanic.csv](/420-514/files/titanic.csv)

### Identification et gestion des erreurs

Les données collectées peuvent contenir des erreurs de différentes natures :

- **Erreurs syntaxiques** : erreurs de formatage, saisies incorrectes.
- **Erreurs sémantiques** : violation de contraintes (par exemple, âge inférieur à 0).
- **Erreurs de duplication** : plusieurs entrées identiques.

**Exemple : Détection des erreurs de formatage**

```python
df['age'] = pd.to_numeric(df['age'], errors='coerce')  # Convertit en NaN les valeurs incorr
```

### Détection des valeurs manquantes

Pour identifier les valeurs manquantes dans un DataFrame :

```python
# Vérifier le nombre de valeurs manquantes dans chaque colonne
print(df.isnull().sum())
```

### Visualiser les valeurs manquantes

Avant de choisir une stratégie (suppression, imputation), il faut voir **où** et **comment** les valeurs manquent.

![Matrice des valeurs manquantes et pourcentage par colonne](/420-514/images/cours-donnees/eda-valeurs-manquantes.svg)

Si les manques sont **groupés** (comme la colonne `revenu` ci-dessus), ils ne sont probablement pas aléatoires : cherchez la cause avant d'imputer.

```python
sns.heatmap(df.isna(), cbar=False)
plt.title("Valeurs manquantes (jaune = manquant)")
plt.show()
```

### Traitement des valeurs manquantes

#### Option 1 : Supprimer les lignes ou colonnes avec des valeurs manquantes

- **Supprimer les lignes avec des valeurs manquantes** :

```python
df_cleaned = df.dropna()
```

- **Supprimer les colonnes avec des valeurs manquantes** :

```python
df_cleaned = df.dropna(axis=1)
```

#### Option 2 : Remplacer les valeurs manquantes

- **Remplacer par la moyenne** (pour les colonnes numériques) :

```python
df['age'].fillna(df['age'].mean(), inplace=True)
```

- **Remplacer par la médiane** (utile pour les distributions asymétriques) :

```python
df['age'].fillna(df['age'].median(), inplace=True)
```

- **Remplacer par une valeur spécifique** (comme "Inconnu" pour les colonnes catégorielles) :

```python
df['city'].fillna('Inconnu', inplace=True)
```


### Normalisation et standardisation des variables numériques

Ces techniques sont utiles lorsque les variables ont des échelles différentes et que tu veux les mettre sur une même échelle.

- **Normalisation** : Transforme les valeurs pour qu'elles soient comprises entre 0 et 1.

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
df['age_normalized'] = scaler.fit_transform(df[['age']])
```

- **Standardisation** : Transforme les valeurs pour qu'elles aient une moyenne de 0 et un écart-type de 1.

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
df['age_standardized'] = scaler.fit_transform(df[['age']])
```

### Encodage des variables catégorielles

Les algorithmes de machine learning ne peuvent pas traiter des données catégorielles sous forme de texte. Il faut donc les **encoder** en valeurs numériques.

#### Types de variable :

![types de variables](/420-514/images/Data_var_types.png)

#### Option 1 : Encodage simple avec des valeurs entières

```python
# Encodage des catégories sous forme d'entiers
df['sexe_encoded'] = df['sexe'].map({'homme': 0, 'femme': 1})
```

#### Option 2 : Encodage one-hot

Cette méthode transforme chaque catégorie en une nouvelle colonne, avec une valeur binaire (0 ou 1) pour indiquer la présence de cette catégorie.

```python
df_encoded = pd.get_dummies(df, columns=['ville'])
```

### Transformation des dates

Les **dates** peuvent être difficiles à manipuler dans leur format brut, mais Pandas facilite leur manipulation.

[alphabet_stock_data.csv]((/420-514/files/alphabet_stock_data.csv)

- **Convertir une colonne en datetime** :

```python
df['date'] = pd.to_datetime(df['date'])
```

- **Extraire des informations spécifiques (année, mois, jour, etc.)** :

```python
df['annee'] = df['date'].dt.year
df['mois'] = df['date'].dt.month
df['jour'] = df['date'].dt.day
```

### Regroupement (binning) des variables continues

Le **binning** consiste à transformer une variable continue en variable discrète en la divisant en intervalles (bins).

```python
# Diviser l'âge en catégories
df['age_binned'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 100], labels=['Enfant', 'Jeune adulte', 'Adulte', 'Senior'])
```


### Création de nouvelles variables (feature engineering)

La **création de nouvelles variables** consiste à générer des caractéristiques supplémentaires à partir des données existantes. Cela peut grandement améliorer la performance des modèles.

#### Combinaison de variables

Tu peux créer de nouvelles variables en combinant des variables existantes.

```python
# Créer une variable représentant le rapport entre deux variables
df['revenu_par_age'] = df['revenu'] / df['age']
```

#### Extraction de caractéristiques à partir de variables textuelles

Si tu as des données textuelles, tu peux extraire certaines informations importantes.

```python
# Extraire la longueur des descriptions
df['longueur_description'] = df['description'].apply(len)
```


### Sauvegarde des données préparées

Une fois les données prêtes, il est conseillé de les **sauvegarder** pour éviter de refaire toutes les étapes à chaque fois.

#### **Sauvegarder les données sous forme de fichier CSV**

```python
df.to_csv('data_prepared.csv', index=False)
```

## 5. Analyse univariée

### La forme d'une distribution

![Quatre formes de distribution avec moyenne et médiane](/420-514/images/cours-donnees/eda-formes-distribution.svg)

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

![Histogramme asymétrique avec mode, médiane et moyenne](/420-514/images/cours-donnees/eda-moyenne-mediane.svg)

Sur une distribution asymétrique ou avec des valeurs extrêmes, la **médiane** est un meilleur résumé du « cas typique ». Comparez toujours les deux.

### Gestion des valeurs aberrantes (outliers)

Un **boxplot** permet de visualiser les outliers.

```python
import matplotlib.pyplot as plt

plt.boxplot(df['revenu'])
plt.title("Boxplot du revenu")
plt.show()
```

#### Lire une boîte à moustaches

![Anatomie d'une boîte à moustaches](/420-514/images/cours-donnees/eda-boxplot-anatomie.svg)

- La boîte contient les **50 % centraux** des données (de Q1 à Q3) ; la ligne interne est la **médiane**.
- Les moustaches vont jusqu'à la plus petite et la plus grande valeur **non aberrantes**.
- Les points au-delà de `Q1 − 1,5 × IQR` et `Q3 + 1,5 × IQR` sont signalés comme **valeurs aberrantes** : à vous de décider s'il s'agit d'erreurs de saisie ou de cas réels.

```python
sns.boxplot(x=df["montant"])
plt.show()
```

Les valeurs aberrantes peuvent biaiser l'analyse, il est donc crucial de les identifier et de décider si elles doivent être retirées ou ajustées.

### Suppression des valeurs abérantes avec le Z-Score

Le **Z-score** permet d'identifier les valeurs qui s'écartent significativement de la moyenne.

```python
from scipy import stats

# Calculer le Z-Score
df['z_score'] = stats.zscore(df['revenu'])

# Filtrer les lignes dont le Z-Score est inférieur à 3 (gardant les valeurs proches de la moyenne)
df_cleaned = df[df['z_score'] < 3]
```


## 6. Analyse bivariée et multivariée

### Choisir le bon graphique

![Guide de choix du graphique selon la question](/420-514/images/cours-donnees/eda-choix-graphique.svg)

### La corrélation

Le coefficient de corrélation de Pearson (`r`, entre −1 et +1) mesure la force d'une relation **linéaire**.

![Quatre nuages de points avec leur coefficient r](/420-514/images/cours-donnees/eda-correlations.svg)

Un `r` proche de 0 ne signifie pas « aucune relation » : la relation peut être non linéaire. **Regardez toujours le nuage de points.**

### La matrice de corrélation

![Carte thermique d'une matrice de corrélation](/420-514/images/cours-donnees/eda-heatmap-correlation.svg)

```python
corr = df.select_dtypes("number").corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)
plt.show()
```

*Les valeurs de la figure sont fictives et servent seulement à illustrer la lecture.*

### Corrélation ≠ causalité

![Variable confondante : la chaleur influence deux variables](/420-514/images/cours-donnees/eda-confondante.svg)

Deux variables peuvent évoluer ensemble parce qu'une **variable confondante** les influence toutes les deux. Avant de parler de cause, demandez-vous : qu'est-ce qui pourrait expliquer les deux à la fois ?

### Le paradoxe de Simpson

![Paradoxe de Simpson : tendance globale opposée aux tendances par groupe](/420-514/images/cours-donnees/eda-simpson.svg)

La tendance globale peut être **inverse** de celle observée dans chaque sous-groupe. Explorez systématiquement par groupe (`groupby`, couleur ou facettes) avant de conclure.

```python
sns.scatterplot(data=df, x="x", y="y", hue="groupe")
sns.lmplot(data=df, x="x", y="y", hue="groupe")
```

## 7. Piège de présentation : l'axe tronqué

![Même donnée avec axe tronqué et axe complet](/420-514/images/cours-donnees/eda-axe-tronque.svg)

Pour un diagramme à barres, l'axe doit commencer à **0**. Ajoutez toujours un titre, des unités et une légende.



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
