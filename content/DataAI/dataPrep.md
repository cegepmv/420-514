+++
date = '2025-10-27T07:10:47-04:00'
draft = false
title = 'Préparation des données'
weight = 103
+++

La **préparation des données** est une étape clé avant de passer à des analyses plus poussées, comme la modélisation. C'est le processus de **nettoyage**, **transformation** et **formatage** des données afin de les rendre exploitables pour les algorithmes d'analyse et de machine learning.

## **1. Importer et charger les données**

La première étape consiste à **charger** les données dans ton environnement de travail. Les jeux de données peuvent être dans différents formats comme CSV, Excel, JSON, etc.

### Exemple : Charger un fichier CSV

```python
import pandas as pd

# Charger un fichier CSV dans un DataFrame Pandas
df = pd.read_csv('data.csv')

# Afficher les premières lignes pour vérifier les données
print(df.head())
```

[property.csv](/420-514/files/property.csv)

[blood.csv](/420-514/files/blood.csv)

### Identification et gestion des erreurs

Les données collectées peuvent contenir des erreurs de différentes natures :

- **Erreurs syntaxiques** : erreurs de formatage, saisies incorrectes.
- **Erreurs sémantiques** : violation de contraintes (par exemple, âge inférieur à 0).
- **Erreurs de duplication** : plusieurs entrées identiques.

**Exemple : Détection des erreurs de formatage**

```python
df['age'] = pd.to_numeric(df['age'], errors='coerce')  # Convertit en NaN les valeurs incorr
```

## **2. Gestion des valeurs manquantes**

Les valeurs manquantes sont courantes dans les jeux de données réels et doivent être traitées correctement. Ignorer ou mal gérer ces valeurs peut fausser les résultats.

### Détection des valeurs manquantes

Pour identifier les valeurs manquantes dans un DataFrame :

```python
# Vérifier le nombre de valeurs manquantes dans chaque colonne
print(df.isnull().sum())
```

### Traitement des valeurs manquantes

### Option 1 : Supprimer les lignes ou colonnes avec des valeurs manquantes

- **Supprimer les lignes avec des valeurs manquantes** :

```python
df_cleaned = df.dropna()
```

- **Supprimer les colonnes avec des valeurs manquantes** :

```python
df_cleaned = df.dropna(axis=1)
```

### Option 2 : Remplacer les valeurs manquantes

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

## **3. Transformation des données**

Les données brutes ne sont souvent pas directement utilisables pour les modèles ou analyses avancées. Des **transformations** peuvent être nécessaires pour ajuster les variables.

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

### Types de variable :

![types de variables](/420-514/images/Data_var_types.png)

### Option 1 : Encodage simple avec des valeurs entières

```python
# Encodage des catégories sous forme d'entiers
df['sexe_encoded'] = df['sexe'].map({'homme': 0, 'femme': 1})
```

### Option 2 : Encodage one-hot

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

### Binning (regroupement) des variables continues

Le **binning** consiste à transformer une variable continue en variable discrète en la divisant en intervalles (bins).

```python
# Diviser l'âge en catégories
df['age_binned'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 100], labels=['Enfant', 'Jeune adulte', 'Adulte', 'Senior'])
```

## Gestion des valeurs aberrantes (outliers)

Les valeurs aberrantes peuvent biaiser l'analyse, il est donc crucial de les identifier et de décider si elles doivent être retirées ou ajustées.

### Détection des outliers avec les boxplots

Un **boxplot** permet de visualiser les outliers.

```python
import matplotlib.pyplot as plt

plt.boxplot(df['revenu'])
plt.title("Boxplot du revenu")
plt.show()
```

### Suppression des outliers avec le Z-Score

Le **Z-score** permet d'identifier les valeurs qui s'écartent significativement de la moyenne.

```python
from scipy import stats

# Calculer le Z-Score
df['z_score'] = stats.zscore(df['revenu'])

# Filtrer les lignes dont le Z-Score est inférieur à 3 (gardant les valeurs proches de la moyenne)
df_cleaned = df[df['z_score'] < 3]
```

## **5. Création de nouvelles variables (feature engineering)**

La **création de nouvelles variables** consiste à générer des caractéristiques supplémentaires à partir des données existantes. Cela peut grandement améliorer la performance des modèles.

### Combinaison de variables

Tu peux créer de nouvelles variables en combinant des variables existantes.

```python
# Créer une variable représentant le rapport entre deux variables
df['revenu_par_age'] = df['revenu'] / df['age']
```

### Extraction de caractéristiques à partir de variables textuelles

Si tu as des données textuelles, tu peux extraire certaines informations importantes.

```python
# Extraire la longueur des descriptions
df['longueur_description'] = df['description'].apply(len)
```

## **6. Séparation des données**

Avant de construire un modèle, il est nécessaire de **séparer** les données en un **ensemble d'entraînement** et un **ensemble de test** pour valider le modèle.

### Division des données

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns=['cible'])  # Toutes les colonnes sauf la cible
y = df['cible']  # La colonne cible (par exemple : achat, classe...)

# Séparation en ensemble d'entraînement et de test (80% - 20%)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

---

## **7. Sauvegarde des données préparées**

Une fois les données prêtes, il est conseillé de les **sauvegarder** pour éviter de refaire toutes les étapes à chaque fois.

### **Sauvegarder les données sous forme de fichier CSV**

```python
df.to_csv('data_prepared.csv', index=False)
```

## **Conclusion**

La **préparation des données** est une étape essentielle qui permet de **nettoyer**, **transformer** et **formater** les données pour les rendre exploitables par des algorithmes d'analyse et de machine learning. Cela inclut :

1. **Le traitement des valeurs manquantes**.
2. **La transformation des variables** (normalisation, encodage, etc.).
3. **La gestion des outliers**.
4. **La création de nouvelles caractéristiques**.
5. **La séparation des données pour l'entraînement et les tests**.
