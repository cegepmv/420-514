+++
date = '2025-11-05T08:16:14-05:00'
draft = true
title = 'Pandas'
weight = 102
+++


**Pandas** est une bibliothèque Python axée sur l'analyse de données, construite au-dessus de NumPy. Elle permet de manipuler des données tabulaires (similaires à des tables SQL ou Excel) de manière efficace et intuitive.

### **Structures principales de Pandas**

1. **Series** : Une série est une colonne unique de données étiquetées, semblable à un tableau NumPy, mais avec un index qui identifie chaque élément.
    
    ```python
    import pandas as pd
    
    s = pd.Series([1, 2, 3], index=["a", "b", "c"])
    print(s)
    
    ```
    
2. **DataFrame** : Un DataFrame est une collection de plusieurs séries, où chaque colonne est une série. C’est l’équivalent d'une table dans une base de données ou une feuille de calcul Excel.
    
    ```python
    data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
    df = pd.DataFrame(data)
    print(df)
    ```
    
    ```java
    countries = ['France', 'Canada', 'Brésil', 'Australie', 'Inde', 'Chine', 'États-Unis', 'Russie', 'Mexique', 'Japon']
    population = [67.39, 37.59, 211.05, 25.36, 1380, 1441, 331, 146.7, 126.2, 125.8]
    area = [643801, 9984670, 8515767, 7692024, 3287263, 9596961, 9833517, 17098242, 1964375, 377975]
    
    sc = pd.DataFrame({
        "Name": countries,
        "Pop": population,
        "Area": area
    })
    
    print(sc)
    ```
    
    ```python
    # DataFrame avec le PIB de certains pays
    gdp_data = {
        'Name': ['France', 'Canada', 'Brésil', 'Australie', 'Inde', 'États-Unis', 'Japon'],
        'GDP': [2715, 1643, 2055, 1393, 2875, 21433, 5065]  # PIB en milliards de dollars
    }
    
    df_gdp = pd.DataFrame(gdp_data)
    print(df_gdp)
    ```
    
    ```python
    # DataFrame avec les continents des pays
    continent_data = {
        'Name': ['France', 'Canada', 'Brésil', 'Australie', 'Inde', 'Chine', 'États-Unis', 'Russie', 'Mexique', 'Japon'],
        'Continent': ['Europe', 'Amérique', 'Amérique', 'Océanie', 'Asie', 'Asie', 'Amérique', 'Europe', 'Amérique', 'Asie']
    }
    
    df_continent = pd.DataFrame(continent_data)
    print(df_continent)
    ```
    

### **Opérations courantes avec Pandas**

- **Sélection de colonnes** :
    
    ```python
    df['Age']  # Sélectionne la colonne 'Age'
    ```
    
- **Jointure de DataFrames** :
Pandas permet de joindre deux tables (DataFrames) avec `pd.merge()`, similaire à une jointure SQL.
    
    ```python
    df1 = pd.DataFrame({'Employee': ['Alice', 'Bob'], 'Department': ['HR', 'Finance']})
    df2 = pd.DataFrame({'Employee': ['Alice', 'Bob'], 'Hire_Date': [2015, 2018]})
    result = pd.merge(df1, df2, on='Employee')
    print(result)
    ```
    
- **Importation et exportation de données** : Pandas permet de charger et de sauvegarder des fichiers dans différents formats (CSV, Excel, SQL, etc.).
    
    ```python
    df = pd.read_csv('data.csv')  # Charger un fichier CSV
    df.to_csv('output.csv')  # Exporter vers un fichier CSV
    ```
    

### **Analyse exploratoire des données**

Pandas propose des fonctions pour effectuer des statistiques descriptives et des visualisations simples.

- **Résumé statistique** :
    
    ```python
    df.describe()  # Donne un aperçu statistique des données
    ```
    
- **Visualisation rapide** (avec Matplotlib) :
    
    ```python
    df['Age'].plot(kind='bar')  # Crée un graphique en barres des âges
    ```
    
- **`df.head(n)`** : Affiche les `n` premières lignes (par défaut, les 5 premières).
    
    ```python
    sc.head(3)
    ```
    
- **`df.info()`** : Donne un résumé des colonnes, types de données, et valeurs manquantes.
    
    ```python
    sc.info()
    ```
    
- **`df.describe()`** : Affiche des statistiques descriptives sur les colonnes numériques.
    
    ```python
    sc.describe()
    ```
    
- **`df.shape`** : Renvoie le nombre de lignes et de colonnes du DataFrame.
    
    ```python
    sc.shape
    ```
    
- **`df.columns`** : Liste les noms des colonnes.
    
    ```python
    sc.columns
    ```
    
- **`df.dtypes`** : Renvoie le type de chaque colonne.
    
    ```python
    sc.dtypes
    ```
    
- **`df.index`** : Affiche l’index (les lignes).
    
    ```python
    sc.index
    ```
    

### **Exemples avec Pandas**

### 1. **Chargement d'un fichier CSV**

Importer un fichier CSV dans un DataFrame Pandas et explorer les premières lignes.

```python
import pandas as pd

# Lire un fichier CSV (fichier fictif)
df = pd.read_csv('data.csv')

# Afficher les 5 premières lignes
print(df.head())  # Donne un aperçu des premières lignes

# Afficher les informations sur le DataFrame
print(df.info())  # Montre les types de colonnes et les valeurs manquantes

```

### 2. **Filtrage de données**

Filtrer un DataFrame pour sélectionner les lignes qui remplissent certaines conditions.

```python
# Créer un DataFrame fictif
data = {'Name': ['Alice', 'Bob', 'Charlie', 'David'],
        'Age': [24, 42, 35, 23],
        'City': ['Paris', 'Londres', 'Paris', 'Berlin']}
df = pd.DataFrame(data)

# Filtrer les lignes où 'Age' est supérieur à 30
filtered_df = df[df['Age'] > 30]
print(filtered_df)

# Filtrer les lignes où 'City' est 'Paris'
paris_df = df[df['City'] == 'Paris']
print(paris_df)

```

### 3. **Générer des statistiques descriptives**

Calculer des statistiques descriptives sur les colonnes numériques du DataFrame.

```python
# Créer un DataFrame de ventes
sales_data = {'Product': ['A', 'B', 'C', 'D'],
              'Sales': [500, 700, 900, 1100],
              'Profit': [50, 80, 120, 160]}
df_sales = pd.DataFrame(sales_data)

# Résumé statistique des colonnes numériques
print(df_sales.describe())  # Moyenne, écart-type, min, max, etc.

```

### 4. **Ajout et suppression de colonnes**

Ajouter des colonnes calculées et supprimer des colonnes d'un DataFrame.

```python
# Ajouter une nouvelle colonne 'Revenue' (ventes * profit)
df_sales['Revenue'] = df_sales['Sales'] * df_sales['Profit']
print(df_sales)

# Supprimer la colonne 'Revenue'
df_sales.drop(columns=['Revenue'], inplace=True)
print(df_sales)

```

### 5. **Jointure de DataFrames**

Faire des jointures entre deux DataFrames, comme une jointure SQL.

```python
# Créer deux DataFrames
df1 = pd.DataFrame({'Employee': ['Alice', 'Bob'], 'Department': ['HR', 'Finance']})
df2 = pd.DataFrame({'Employee': ['Alice', 'Bob'], 'Hire_Date': [2015, 2018]})

# Faire une jointure sur la colonne 'Employee'
merged_df = pd.merge(df1, df2, on='Employee')
print(merged_df)
```

### 6. **Groupement et agrégation**

Grouper les données selon une ou plusieurs colonnes et appliquer des fonctions d'agrégation.

```python
# Créer un DataFrame avec des ventes par produit
df = pd.DataFrame({'Product': ['A', 'B', 'A', 'B', 'A'],
                   'Sales': [500, 700, 600, 800, 400]})

# Grouper par 'Product' et calculer la somme des ventes
grouped_df = df.groupby('Product')['Sales'].sum()
print(grouped_df)  # Somme des ventes par produit

```

### 7. **Utilisation de fonctions personnalisées**

Appliquer des fonctions personnalisées sur des colonnes Pandas.

```python
# Créer une fonction pour augmenter les ventes de 10 %
def increase_sales(x):
    return x * 1.1

# Appliquer cette fonction sur la colonne 'Sales'
df['Increased_Sales'] = df['Sales'].apply(increase_sales)
print(df)
```


### **Combinaison NumPy et Pandas**

On peut aussi utiliser NumPy pour manipuler des données directement dans un DataFrame Pandas.

## Exemple :

### Calculer des statistiques sur un DataFrame avec NumPy

```python
import numpy as np

# Créer un DataFrame fictif
data = {'A': [1, 2, 3, 4, 5], 'B': [10, 20, 30, 40, 50]}
df = pd.DataFrame(data)

# Utiliser NumPy pour calculer la moyenne
mean_A = np.mean(df['A'])
print("Moyenne de la colonne A :", mean_A)

# Utiliser NumPy pour trouver les éléments où 'A' est supérieur à la moyenne
greater_than_mean = df['A'][df['A'] > mean_A]
print(greater_than_mean)
```

**NumPy** et **Pandas** peuvent être utilisés ensemble pour l'analyse de données. NumPy est idéal pour les opérations numériques rapides et les calculs matriciels, tandis que Pandas est parfait pour gérer et analyser des données tabulaires. Ensemble, ils forment une base puissante pour toute analyse en science des données.

### **2. Sélection des données**

- **Sélection d'une colonne** :
    
    ```python
    sc['Pop']
    ```
    
- **Sélection de plusieurs colonnes** :
    
    ```python
    sc[['Name', 'Pop']]
    ```
    
- **Sélection d'une ligne par index (iloc)** :
    
    ```python
    sc.iloc[0]
    ```
    
- **Sélection d'une ligne par étiquette (loc)** :
    
    ```python
    sc.loc[0]
    ```
    
- **Filtrage avec condition** (par exemple, pays avec une population supérieure à 100 millions) :
    
    ```python
    sc[sc['Pop'] > 100]
    ```
    

### **3. Ajout, modification et suppression de colonnes**

- **Ajouter une colonne** (par exemple, calcul de la densité de population) :
    
    ```python
    sc['Densité'] = sc['Pop'] * 1e6 / sc['Area']
    ```
    
- **Modifier une colonne** :
    
    ```python
    sc['Pop'] = sc['Pop'] * 1.02  # Augmenter la population de 2%
    
    ```
    
- **Supprimer une colonne** :
    
    ```python
    sc = sc.drop(columns=['Densité'])
    ```


### **4. Méthodes de statistiques et agrégation**

- **`df.sum()`** : Renvoie la somme des valeurs pour chaque colonne numérique.
    
    ```python
    sc['Pop'].sum()  # Somme des populations
    ```
    
- **`df.mean()`** : Renvoie la moyenne pour chaque colonne numérique.
    
    ```python
    sc['Area'].mean()  # Moyenne des superficies
    ```
    
- **`df.max()`** et **`df.min()`** : Valeurs maximale et minimale.
    
    ```python
    sc['Pop'].max()  # Population maximale
    sc['Area'].min()  # Superficie minimale
    ```
    
- **`df.corr()`** : Calcule la corrélation entre les colonnes numériques.
    
    ```python
    sc.corr()  # Corrélation entre la population et la superficie
    ```
    
- **`df.median()`** : Médiane des colonnes numériques.
    
    ```python
    sc['Pop'].median()  # Médiane de la population
    ```
    


### **5. Groupement et agrégation**

Si on ajoute une colonne supplémentaire, comme le **continent**, on peut effectuer des agrégations par groupe.

**Exemple avec groupement par continent** :

```python
# Ajout d'une colonne "Continent" fictive
sc['Continent'] = ['Europe', 'Amérique', 'Amérique', 'Océanie', 'Asie', 'Asie', 'Amérique', 'Europe', 'Amérique', 'Asie']

# Groupement par continent et somme de la population
sc.groupby('Continent')['Pop'].sum()

```

Autres méthodes possibles avec le groupement :

- **`groupby().mean()`** : Moyenne par groupe.
- **`groupby().agg()`** : Appliquer plusieurs fonctions d’agrégation à la fois.



### **6. Manipulation des données**

- **Trier les données** (par exemple, trier par superficie) :
    
    ```python
    sc.sort_values(by='Area', ascending=False)
    ```
    
- **Remplacer des valeurs** (par exemple, remplacer une valeur `NaN`) :
    
    ```python
    sc['Pop'] = sc['Pop'].fillna(0)  # Remplacer les NaN par 0
    ```
    
- **Rechercher des valeurs manquantes** :
    
    ```python
    sc.isnull().sum()  # Vérifie les valeurs manquantes dans chaque colonne
    ```
    


### **7. Jointures de DataFrames**

Si on dispose d'un autre DataFrame avec des données supplémentaires, on peut faire des jointures (similaire aux jointures SQL).

**Exemple de jointure** :

```python
# Créer un deuxième DataFrame
df_additional = pd.DataFrame({
    'Name': ['France', 'Canada', 'Japon'],
    'GDP': [2715, 1643, 5065]
})

# Jointure sur la colonne 'Name'
sc_with_gdp = pd.merge(sc, df_additional, on='Name', how='left')
```

---

### **8. Importation et exportation de données**

- **Charger un fichier CSV** :
    
    ```python
    sc = pd.read_csv('sc_data.csv')
    ```
    
- **Sauvegarder un DataFrame dans un fichier CSV** :
    
    ```python
    sc.to_csv('sc_output.csv', index=False)
    ```
    


## **Opérations et méthodes avec NumPy**

NumPy peut également être utilisé directement sur les colonnes numériques du DataFrame **Pandas**, car celles-ci sont souvent basées sur des tableaux NumPy.

### **1. Création de tableaux NumPy à partir des colonnes**

- **Convertir une colonne Pandas en tableau NumPy** :

```python
# Convertir la colonne 'Pop' en tableau NumPy
pop_np = sc['Pop'].to_numpy()
```

### **2. Opérations mathématiques sur les tableaux**

Les colonnes Pandas étant des tableaux NumPy sous-jacents, vous pouvez appliquer directement des opérations mathématiques.

**Exemple d’opérations sur un tableau NumPy** :

```python
import numpy as np

# Multiplier la population par 1.05 (augmentation de 5%)
pop_np = pop_np * 1.05
```

### **3. Méthodes statistiques avec NumPy**

Voici quelques méthodes NumPy qu’on peut appliquer sur les colonnes du DataFrame.

- **Somme des éléments** :
    
    ```python
    np.sum(pop_np)
    ```
    
- **Moyenne et médiane** :
    
    ```python
    np.mean(pop_np)
    np.median(pop_np)
    ```
    
- **Écart-type et variance** :
    
    ```python
    np.std(pop_np)  # Écart-type
    np.var(pop_np)  # Variance
    ```
    

### **4. Création et manipulation de tableaux multidimensionnels**

Si on veut manipuler des données sous forme de tableaux multidimensionnels (comme dans NumPy), on peut convertir ton DataFrame Pandas en tableau NumPy.

**Exemple** :

```python
# Convertir tout le DataFrame en tableau NumPy
sc_np = sc[['Pop', 'Area']].to_numpy()

# Afficher la forme du tableau
print(sc_np.shape)

```


### **Conclusion**

En combinant **Pandas** et **NumPy**, on peut effectuer des manipulations, analyses statistiques, transformations, et jointures complexes sur des données. Ces bibliothèques sont essentielles en **science des données** pour la gestion des **DataFrames** et des **tableaux**.