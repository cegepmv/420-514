+++
date = '2025-11-13T07:57:57-05:00'
draft = false
title = '🧪 Laboratoire : Analyse de données (NumPy et Pandas) et visualisation (Matplotlib)'
weight = 1010
+++


### **Objectifs :**

1. Apprendre à manipuler les tableaux avec **NumPy**.
2. Explorer et analyser des jeux de données avec **Pandas**.
3. Visualiser les données de manière simple avec **Matplotlib** et **Pandas**.


## **Partie 1 : Introduction à NumPy**

Dans cette première partie, vous allez créer des tableaux avec **NumPy**, effectuer des opérations mathématiques basiques, et explorer des fonctionnalités comme l'indexation, le découpage, et les fonctions statistiques.

### **Étape 1 : Création et manipulation de tableaux NumPy**

1. Importez la bibliothèque NumPy :
    
    ```python
    import numpy as np
    ```
    
2. Créez un tableau 1D (vecteur) à partir d'une liste :
    
    ```python
    a = np.array([5, 10, 15, 20])
    print(a)
    ```
    
3. Créez un tableau 2D (matrice) :
    
    ```python
    b = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    print(b)
    ```
    

### **Étape 2 : Opérations mathématiques**

1. Multipliez le tableau `a` par 2 et affichez le résultat :
    
    ```python
    a_times_2 = a * 2
    print(a_times_2)
    ```
    
2. Ajoutez 10 à chaque élément du tableau `a` :
    
    ```python
    a_plus_10 = a + 10
    print(a_plus_10)
    ```
    
3. Effectuez une multiplication matricielle entre deux matrices :
    
    ```python
    c = np.array([[1, 2], [3, 4]])
    d = np.array([[5, 6], [7, 8]])
    result = np.dot(c, d)
    print(result)
    ```
    

### **Étape 3 : Statistiques simples avec NumPy**

1. Créez un tableau aléatoire d'entiers entre 0 et 100 de taille 3x3 :
    
    ```python
    random_matrix = np.random.randint(0, 100, size=(3, 3))
    print(random_matrix)
    ```
    
2. Calculez la moyenne, la somme et l'écart-type de ce tableau :
    
    ```python
    print("Moyenne :", np.mean(random_matrix))
    print("Somme :", np.sum(random_matrix))
    print("Écart-type :", np.std(random_matrix))
    ```
    

---

## **Partie 2 : Introduction à Pandas**

Dans cette partie, vous allez charger des données avec Pandas, explorer les premières lignes, et effectuer des manipulations de base.

### **Étape 4 : Création d'un DataFrame**

1. Importez la bibliothèque Pandas :
    
    ```python
    import pandas as pd
    ```
    
2. Créez un **DataFrame** avec des informations sur des étudiants :
    
    ```python
    data = {'Nom': ['Alice', 'Bob', 'Charlie', 'David'],
            'Âge': [24, 27, 22, 32],
            'Note': [88, 92, 95, 70]}
    df = pd.DataFrame(data)
    print(df)
    ```
    

### **Étape 5 : Exploration des données**

1. Affichez les 3 premières lignes du DataFrame :
    
    ```python
    print(df.head(3))
    ```
    
2. Affichez le résumé statistique du DataFrame :
    
    ```python
    print(df.describe())
    ```
    
3. Sélectionnez uniquement la colonne "Nom" :
    
    ```python
    print(df['Nom'])
    ```
    
4. Filtrez les étudiants ayant une note supérieure à 90 :
    
    ```python
    high_scores = df[df['Note'] > 90]
    print(high_scores)
    ```
    

### **Étape 6 : Manipulations de colonnes**

1. Ajoutez une nouvelle colonne "Résultat" avec des valeurs "Réussi" si la note est supérieure ou égale à 85, sinon "Échec" :
    
    ```python
    df['Résultat'] = ['Réussi' if x >= 85 else 'Échec' for x in df['Note']]
    print(df)
    ```
    
2. Supprimez la colonne "Âge" du DataFrame :
    
    ```python
    df.drop(columns=['Âge'], inplace=True)
    print(df)
    ```
    

### **Étape 7 : Jointure de DataFrames**

1. Créez un second DataFrame avec des informations supplémentaires sur les étudiants :
    
    ```python
    extra_data = {'Nom': ['Alice', 'Charlie', 'David'],
                  'Cours': ['Maths', 'Physique', 'Informatique']}
    df2 = pd.DataFrame(extra_data)
    ```
    
2. Réalisez une jointure entre `df` et `df2` sur la colonne "Nom" :
    
    ```python
    df_merged = pd.merge(df, df2, on='Nom', how='left')
    print(df_merged)
    ```
    

## **Partie 3 : Analyse de données réelle avec un fichier CSV**

Dans cette section vous allez appliquer vos connaissances en utilisant un jeu de données réel.

### **Étape 9 : Charger un fichier CSV**

1. Téléchargez un fichier CSV contenant des informations sur des ventes de produits (par exemple `ventes.csv`).
2. Chargez ce fichier dans un DataFrame Pandas :
    
    ```python
    df_ventes = pd.read_csv('ventes.csv')
    print(df_ventes.head())
    ```
    

### **Étape 10 : Analyse exploratoire**

1. Explorez les colonnes disponibles avec `.info()` et `.describe()`.
2. Trouvez le produit avec le plus de ventes en utilisant `.groupby()` et `.sum()` :
    
    ```python
    df_ventes.groupby('Produit')['Ventes'].sum().sort_values(ascending=False)
    ```
    
3. Visualisez les ventes par produit avec un graphique en barres :
    
    ```python
    df_ventes.groupby('Produit')['Ventes'].sum().plot(kind='bar')
    plt.title("Ventes par produit")
    plt.xlabel("Produit")
    plt.ylabel("Total des ventes")
    plt.show()
    ```
    

---
## Matplotlib
On va travailler avec un petit jeu de données simulant des **ventes** par région pour deux années (2023 et 2024), ainsi qu’un nombre de clients par région.

Notre objectif est :

- de visualiser ces données sous différentes formes,
- de comparer les années entre elles,
- de relier certaines variables entre elles (ex. nombre de clients vs ventes),
- de s’entraîner à interpréter les graphiques produits.

![Python visualisation libs](/420-514/images/Python_visualisation_lib.png)

## 3. Préparation de l’environnement

### 3.1. Installation des bibliothèques (au besoin)

Dans votre environnement (terminal, invite de commande, etc.) :

```bash
pip install matplotlib pandas
```

### 3.2. Imports et création du DataFrame

Dans votre notebook ou script Python, commencez par exécuter le code suivant :

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

data = {
    "region": ["Nord", "Sud", "Est", "Ouest", "Centre"],
    "ventes_2023": [120, 150, 90, 110, 130],
    "ventes_2024": [140, 160, 100, 130, 150],
    "nb_clients": [45, 60, 30, 40, 55]
}

df = pd.DataFrame(data)
df
```

Assurez-vous que le DataFrame s’affiche correctement avec les colonnes attendues.


## 4. Partie 1 – Premier graphique simple

Dans cette partie, on découvre la structure de base d’un graphique avec Matplotlib.

1. Créez deux listes :

   ```python
   x = [1, 2, 3, 4, 5]
   y = [2, 5, 3, 8, 7]
   ```

2. Tracez une courbe (`line plot`) avec ce code :

   ```python
   plt.plot(x, y)
   plt.xlabel("X")
   plt.ylabel("Y")
   plt.title("Premier graphique simple")
   plt.show()
   ```

   ![Visualisatio_types](/420-514/images/Visualisatio_types.png)

## 5. Partie 2 – Diagramme en barres (ventes 2023)

On va maintenant utiliser les données du DataFrame `df`.

1. Tracez un **diagramme en barres** représentant les ventes 2023 par région :

   ```python
   plt.bar(df["region"], df["ventes_2023"])
   plt.xlabel("Région")
   plt.ylabel("Ventes en 2023")
   plt.title("Ventes 2023 par région")
   plt.show()
   ```

2. Modifiez le titre pour qu’il devienne :
   `Ventes par région (année 2023)`.

3. Créez un **diagramme en barres horizontal** représentant les mêmes données (indice : utiliser `plt.barh`).

4. Questions :

   * D’après le graphique, quelle région a les ventes les plus élevées en 2023 ? La plus faibles ?
   * Entre le diagramme vertical et horizontal, lequel trouvez-vous le plus lisible ? Pourquoi ?


## 6. Partie 3 – Comparaison entre 2023 et 2024 (barres groupées)

On souhaite comparer visuellement les ventes 2023 et 2024 pour chaque région.

1. Reprenez le code suivant et exécutez-le :

   ```python
   regions = df["region"]
   indices = np.arange(len(regions))
   largeur = 0.35

   plt.bar(indices - largeur/2, df["ventes_2023"], width=largeur, label="2023")
   plt.bar(indices + largeur/2, df["ventes_2024"], width=largeur, label="2024")

   plt.xticks(indices, regions)
   plt.xlabel("Région")
   plt.ylabel("Ventes")
   plt.title("Comparaison des ventes 2023 vs 2024")
   plt.legend()
   plt.show()
   ```

2. Questions :

   * Dans quelles régions les ventes ont-elles **augmenté** entre 2023 et 2024 ?
   * Dans quelles régions l’augmentation semble-t-elle la plus forte visuellement ?
   * Comment pourriez-vous vérifier cette augmentation **numériquement** à l’aide de `pandas` (sans regarder les graphiques) ?

3. Variante (facultative) :

   * Ajoutez des couleurs différentes aux barres (paramètre `color` dans `plt.bar`).
   * Ajoutez une grille légère (`plt.grid(True, axis="y")`) pour mieux lire les valeurs.


## 7. Partie 4 – Nuage de points (scatter plot)

On veut étudier la relation entre :

* le **nombre de clients** (`nb_clients`),
* et les **ventes 2024** (`ventes_2024`).

1. Tracez un **nuage de points** :

   ```python
   plt.scatter(df["nb_clients"], df["ventes_2024"])
   plt.xlabel("Nombre de clients")
   plt.ylabel("Ventes 2024")
   plt.title("Relation entre nombre de clients et ventes 2024")
   plt.show()
   ```

2. Questions :

   * Est-ce qu’on observe une relation générale ? (Par exemple : plus de clients ⇒ plus de ventes ?)
   * Est-ce que certains points vous semblent « atypiques » (beaucoup de clients mais peu de ventes, ou l’inverse) ?
   * Pourquoi un nuage de points est-il plus adapté qu’un diagramme en barres pour ce type de relation ?

---

## 8. Partie 5 – Histogramme (distribution des ventes)

On veut visualiser la **répartition** des ventes 2024.

1. Tracez un histogramme des ventes 2024 :

   ```python
   plt.hist(df["ventes_2024"], bins=5)
   plt.xlabel("Ventes 2024")
   plt.ylabel("Fréquence")
   plt.title("Distribution des ventes 2024")
   plt.show()
   ```

2. Modifiez la valeur de `bins` (par exemple : 3, puis 10) et observez les différences.

3. Questions :

   * Que représente chaque « barre » dans un histogramme ?
   * Avec peu de données (comme ici), est-ce que l’histogramme est très informatif ?
   * Si on avait un dataset avec plusieurs centaines de valeurs, en quoi l’histogramme deviendrait-il plus utile ?



## 9. Mini-projet – Taux de croissance

On souhaite maintenant calculer et visualiser la **croissance** des ventes entre 2023 et 2024.

1. Ajoutez une nouvelle colonne `taux_croissance` au DataFrame `df` qui représente la croissance en pourcentage :

   [
   taux_croissance = \frac{ventes_2024 - ventes_2023}{ventes_2023} \times 100
   ]

   * Faites ce calcul avec `pandas`.
   * Affichez le DataFrame pour vérifier le résultat.

2. Tracez un **diagramme en barres** montrant le `taux_croissance` par région :

   * Axe X : nom de la région ;
   * Axe Y : taux de croissance (%).

3. Ajoutez au graphique :

   * un titre clair,
   * un label pour l’axe des X,
   * un label pour l’axe des Y,
   * si nécessaire, faites pivoter les labels de l’axe X (ex. `plt.xticks(rotation=45)`).

4. Questions / réflexion :

   * Dans quelle région la croissance est-elle la plus forte ?
   * Dans quelle région la croissance est-elle la plus faible ?
   * Pourquoi le taux de croissance (%), et pas seulement la différence absolue (ventes_2024 - ventes_2023), est-il intéressant à analyser ?

---

## 10. Pour aller plus loin (facultatif)

* Sauvegardez un de vos graphiques dans un fichier image (ex. `png`) avec `plt.savefig("mon_graphique.png")`.
* Essayez d’afficher plusieurs graphiques dans la même figure en utilisant `plt.subplot(...)` (pour les plus curieux).
* Appliquez ce que vous avez appris à un autre dataset (notes d’examen, jeu de données personnel, etc.).


---

## Série d’exercices :


### **Exercices NumPy**

#### **Exercice 1 : Création et manipulation de tableaux simples**

1. **Créez un tableau NumPy** contenant les éléments `[1, 2, 3, 4, 5]`.
    - Multipliez chaque élément du tableau par 2 et affichez le résultat.
    - Ajoutez 10 à chaque élément du tableau et affichez le résultat.
2. **Créez un tableau 2D** de taille 3x3 avec les nombres allant de 1 à 9.
    - Calculez la somme de chaque ligne.
    - Calculez la somme de chaque colonne.

### **Exercice 2 : Opérations mathématiques**

1. **Créez un tableau aléatoire** de taille 5x5 avec des entiers compris entre 0 et 100.
    - Calculez la moyenne des éléments du tableau.
    - Trouvez le maximum et le minimum des éléments du tableau.
    - Normalisez les valeurs du tableau pour qu'elles soient comprises entre 0 et 1.

### **Exercice 3 : Sélection et indexation**

1. **Créez un tableau** NumPy contenant les nombres de 0 à 19.
    - Sélectionnez uniquement les éléments pairs.
    - Sélectionnez les éléments dont la valeur est supérieure à 10.
2. **Créez un tableau 2D** de taille 4x4 avec des entiers aléatoires entre 1 et 100.
    - Sélectionnez les éléments des deux premières colonnes.
    - Sélectionnez les éléments de la dernière ligne.

### **Exercice 4 : Opérations matricielles**

1. **Créez deux matrices** de taille 3x3 avec des entiers de votre choix.
    - Effectuez la multiplication matricielle entre ces deux matrices.
    - Calculez la transposition de l'une des matrices.

---

### **Exercices Pandas**

### **Exercice 5 : Création et exploration d'un DataFrame**

1. **Créez un DataFrame** avec les informations suivantes :
    - **Colonnes** : `Nom`, `Age`, `Sexe`, `Score`.
    - **Données** :
        - Nom : Alice, Bob, Charlie, David.
        - Âge : 25, 30, 22, 35.
        - Sexe : F, M, M, M.
        - Score : 85, 90, 78, 92.
2. **Explorez ce DataFrame** :
    - Affichez les 2 premières lignes.
    - Affichez les statistiques descriptives des colonnes numériques.
    - Sélectionnez uniquement les colonnes `Nom` et `Score`.

### **Exercice 6 : Filtrage de données**

1. **Créez un DataFrame** avec des informations sur des produits :
    - Colonnes : `Produit`, `Prix`, `Ventes`.
    - Données :
        - Produit : A, B, C, D.
        - Prix : 10, 20, 30, 40.
        - Ventes : 100, 150, 200, 50.
2. **Filtrez les données** :
    - Sélectionnez les produits dont le prix est supérieur à 20.
    - Sélectionnez les produits dont les ventes sont inférieures à 150.

### **Exercice 7 : Manipulation de colonnes**

1. **À partir du DataFrame de l'exercice précédent** :
    - Ajoutez une nouvelle colonne `Revenue`, qui est le produit du `Prix` et des `Ventes`.
    - Créez une nouvelle colonne `Catégorie` : assignez "Haut" si le `Prix` est supérieur à 25, sinon "Bas".
2. **Supprimez la colonne `Ventes`** du DataFrame.

### **Exercice 8 : Analyse d'un fichier CSV**

1. **Téléchargez le fichier CSV** "data.csv" contenant des informations sur des ventes de produits (ou créez un fichier fictif avec les colonnes `Produit`, `Prix`, `Ventes`).
2. **Chargez ce fichier dans un DataFrame** avec Pandas.
3. **Analysez les données** :
    - Affichez les 5 premières lignes du fichier.
    - Trouvez le produit ayant généré le plus de revenus (Revenus = Prix * Ventes).
    - Affichez les produits dont les ventes sont supérieures à la moyenne des ventes.

### **Exercice 9 : Groupement et agrégation**

1. **Créez un DataFrame** avec les informations suivantes :
    - Colonnes : `Employe`, `Departement`, `Salaire`.
    - Données :
        - Employé : Alice, Bob, Charlie, David, Eve.
        - Département : IT, IT, HR, HR, IT.
        - Salaire : 70000, 80000, 50000, 55000, 75000.
2. **Effectuez des opérations de groupement** :
    - Groupez les données par `Departement` et affichez la somme des salaires par département.
    - Affichez le salaire moyen par département.

---

### **Exercices supplémentaires**

### **Exercice 10 : Manipulation avancée avec NumPy**

1. **Créez un tableau 3D** de dimensions 3x3x3 avec des entiers aléatoires entre 1 et 100.
    - Sélectionnez uniquement les éléments dont la valeur est supérieure à 50.
    - Remplacez tous les éléments supérieurs à 50 par 0.

### **Exercice 11 : Jointure et nettoyage de données**

1. **Créez deux DataFrames** représentant des informations sur des employés :
    - `df1` : Colonnes `Employe`, `Departement`.
    - `df2` : Colonnes `Employe`, `Date_embauche`, `Salaire`.
2. **Effectuez une jointure entre les deux DataFrames** sur la colonne `Employe`.
    - Filtrez les employés ayant un salaire supérieur à 60000 et appartenant au département "IT".
    - Remplacez les valeurs manquantes dans la colonne `Date_embauche` par une date par défaut "2020-01-01".