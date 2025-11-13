+++
draft = false
title = 'NumPy'
weight = 105
+++


## **NumPy (Numerical Python)**

### **Qu'est-ce que NumPy ?**

NumPy est une bibliothèque Python essentielle pour travailler avec des **données numériques**. Elle offre des structures de données comme des **tableaux multidimensionnels (ndarrays)**, ainsi qu'une multitude de fonctions mathématiques pour manipuler efficacement ces tableaux. NumPy est souvent utilisé pour des calculs numériques rapides, et il est la base de nombreuses autres bibliothèques comme Pandas, SciPy, et TensorFlow.

### **Différence entre les listes Python et les tableaux NumPy**

- **Listes Python** : Une liste Python peut contenir différents types de données (entiers, flottants, chaînes) dans la même liste.
- **Tableaux NumPy** : Tous les éléments doivent être du **même type** (homogènes), ce qui permet des opérations mathématiques rapides et efficaces.

### **Pourquoi utiliser NumPy ?**

1. **Plus rapide** : Les tableaux NumPy sont optimisés pour des opérations mathématiques intensives et consomment moins de mémoire.
2. **Manipulation efficace des données** : NumPy permet de manipuler les données de manière vectorisée, c'est-à-dire sans boucle explicite, ce qui est bien plus rapide.
3. **Outils mathématiques avancés** : NumPy propose une large gamme de fonctions pour manipuler les tableaux (opérations mathématiques, statistiques, trigonométrie).

### **Création de tableaux NumPy**

Les tableaux NumPy peuvent être créés de différentes manières :

- **À partir de listes Python** :
    
    ```python
    import numpy as np
    a = np.array([1, 2, 3, 4, 5])
    b = np.array([[1, 2], [3, 4], [5, 6]])
    ```
    
- **Tableaux de zéros ou de uns** :
    
    ```python
    np.zeros(5)  # Tableau de 5 zéros
    np.ones(3)   # Tableau de 3 uns
    ```
    
- **Plages de nombres** avec `np.arange()` ou `np.linspace()` :
    
    ```python
    np.arange(5)  # [0, 1, 2, 3, 4]
    np.arange(2, 9, 2)  # [2, 4, 6, 8]
    np.linspace(0, 10, num=5)  # Divise l'intervalle [0, 10] en 5 points équidistants
    ```
    

### **Manipulation de tableaux**

NumPy permet d'ajouter, supprimer et trier des éléments avec des fonctions comme `np.sort()` ou `np.concatenate()`.

```python
arr = np.array([5, 2, 9, 1])
print(np.sort(arr))  # [1, 2, 5, 9]

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.concatenate((a, b)))  # [1, 2, 3, 4, 5, 6]
```

### **Forme, taille et dimensions**

Les tableaux NumPy peuvent avoir plusieurs dimensions (1D, 2D, 3D, etc.), et ces propriétés peuvent être consultées avec :

- **ndim** : Nombre de dimensions.
- **size** : Nombre total d'éléments.
- **shape** : Tuple décrivant la taille le long de chaque dimension.

```python
array_example = np.array([[[0, 1], [2, 3]], [[4, 5], [6, 7]]])
print(array_example.ndim)  # 3 dimensions
print(array_example.size)  # 8 éléments
print(array_example.shape)  # (2, 2, 2)
```

### **Indexation et découpage**

NumPy permet d'accéder et de découper les tableaux de manière similaire aux listes Python.

```python
data = np.array([10, 20, 30, 40])
print(data[1:3])  # [20, 30]
```

Tu peux également utiliser des conditions pour sélectionner des éléments dans un tableau :

```python
a = np.array([[1, 2], [3, 4], [5, 6]])
print(a[a > 2])  # [3, 4, 5, 6]
```

### **Exemples avec NumPy**

### 1. **Création de tableaux et manipulation**

Créer un tableau NumPy à partir d'une liste, puis appliquer des opérations mathématiques dessus :

```python
import numpy as np

# Créer un tableau à partir d'une liste
arr = np.array([1, 2, 3, 4, 5])

# Ajouter 10 à chaque élément
arr_plus_10 = arr + 10
print(arr_plus_10)  # [11, 12, 13, 14, 15]

# Multiplier par 2
arr_mult_2 = arr * 2
print(arr_mult_2)  # [2, 4, 6, 8, 10]

```

### 2. **Création de tableaux 2D et sélection de sous-tableaux**

Manipulation de tableaux multidimensionnels (2D et 3D) et extraction de sous-parties.

```python
# Créer un tableau 2D (matrice)
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Sélectionner une ligne
print(matrix[0])  # [1, 2, 3] (première ligne)

# Sélectionner une colonne
print(matrix[:, 1])  # [2, 5, 8] (deuxième colonne)

# Sélectionner un sous-tableau
print(matrix[0:2, 1:3])  # [[2, 3], [5, 6]] (sous-tableau des deux premières lignes et colonnes 1 et 2)

```

### 3. **Fonctions mathématiques et statistiques**

Utilisation des fonctions mathématiques de NumPy sur les tableaux.

```python
# Créer un tableau de valeurs aléatoires
random_array = np.random.randint(0, 100, size=(3, 3))  # 3x3 matrice d'entiers aléatoires entre 0 et 100
print(random_array)

# Calculer la moyenne
print(np.mean(random_array))

# Calculer la somme
print(np.sum(random_array))

# Calculer l'écart-type
print(np.std(random_array))

```

### 4. **Opérations sur des matrices**

Effectuer des opérations matricielles courantes comme la multiplication matricielle.

```python
# Matrices 2x2
matrix1 = np.array([[1, 2], [3, 4]])
matrix2 = np.array([[5, 6], [7, 8]])

# Multiplication de matrices (produit matriciel)
result = np.dot(matrix1, matrix2)
print(result)  # [[19, 22], [43, 50]]

# Transposition d'une matrice
transpose = np.transpose(matrix1)
print(transpose)  # [[1, 3], [2, 4]]

```