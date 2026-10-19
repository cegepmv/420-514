+++
date = '2025-11-13T07:57:57-05:00'
draft = false
title = 'Laboratoire : Analyse de données avec NumPy et Pandas'
weight = 109
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

## Série d’exercices :

---

### **Exercices NumPy**

### **Exercice 1 : Création et manipulation de tableaux simples**

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