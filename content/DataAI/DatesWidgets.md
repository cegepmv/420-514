+++
date = '2025-11-13T08:06:24-05:00'
draft = false
title = 'Dates et visualisation interactive'
weight = 1010
+++


## **1. Manipulation des Dates et du Temps**

Les données temporelles se présentent sous différentes formes, telles que :

- **Timestamp** : Une date et une heure spécifiques (par exemple, "1er Janvier 2020, 15h30").
- **Intervalles de temps** : Une période entre deux moments (par exemple, "du 1er janvier au 31 décembre 2020").
- **Durées** : Un laps de temps précis (par exemple, "3 jours" ou "2 heures").

### **Les modules `datetime` et `dateutil`**

Le module `datetime` de Python permet de manipuler les dates et heures. Voici comment créer une date simple :

```python
from datetime import datetime

simple_date = datetime(year=2020, month=1, day=1)
print(simple_date)
```

Si vous souhaitez créer une date à partir d'une chaîne de caractères, le module `dateutil` peut aider :

```python
from dateutil import parser

date_parsed = parser.parse("January 1, 2020")
print(date_parsed)
```

### **Utilisation de NumPy pour manipuler des dates**

NumPy propose aussi un type de données pour gérer efficacement les dates dans des séries ou des tableaux. Cela permet de facilement créer des plages de dates.

```python
import numpy as np

dates = np.array('2020-01-01', dtype=np.datetime64)
print(dates + np.arange(10))  # Crée une série de dates
```

---

## **2. Visualisation avec Matplotlib**

### **Introduction à `matplotlib`**

`Matplotlib` est une bibliothèque de visualisation en Python, qui permet de créer des graphiques à partir de données. Elle est particulièrement utile pour afficher des données sous forme de courbes, histogrammes, nuages de points, etc.

**Installation** : Si `matplotlib` n'est pas encore installé, vous pouvez le faire via `pip install matplotlib`.

[Matplotlib — Visualization with Python](https://matplotlib.org/)

### **Création de graphiques basiques**

Commence par importer `matplotlib` et créer un simple graphique représentant des fonctions sinusoïdales et cosinus :

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x), label='sin(x)')
plt.plot(x, np.cos(x), label='cos(x)')
plt.title("Graphique sinusoïdal")
plt.xlabel("x")
plt.ylabel("Amplitude")
plt.legend()
plt.show()
```

### **Personnalisation des graphiques**

Matplotlib offre de nombreuses options pour personnaliser tes graphiques, notamment les couleurs et les styles de lignes.

**Exemple :** Personnalisation de la couleur et du type de ligne.

```python
plt.plot(x, np.sin(x), color='green', linestyle='--', label='sin(x)')
plt.plot(x, np.cos(x), color='blue', linestyle='-.', label='cos(x)')
plt.legend() # Affiche la légende
plt.show()
```

### **Ajustement des axes et ajout de légende**

Tu peux ajuster les axes et ajouter des titres et légendes pour rendre tes graphiques plus lisibles.

```python
plt.plot(x, np.sin(x))
plt.xlim(0, 10)
plt.ylim(-1.5, 1.5)
plt.title("Courbe Sinusoïdale")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.show()
```

### **Ajouter des annotations**

On peut aussi annoter certains points importants du graphique avec `annotate()`.

```python
plt.plot(x, np.sin(x))
plt.annotate('Point maximal', xy=(1.57, 1), xytext=(3, 1.5),
             arrowprops=dict(facecolor='black', arrowstyle='->'))
plt.title("Annotation d'un point maximal")
plt.show()
```

## **3. Types de graphiques**

### **Nuages de points**

Un nuage de points peut être créé avec la fonction `scatter`, qui permet d'ajouter des informations supplémentaires à chaque point (taille, couleur).

```python
x = np.random.rand(100)
y = np.random.rand(100)
plt.scatter(x, y, c=y, s=100 * x, cmap='viridis', alpha=0.5)
plt.colorbar()
plt.show()
```

### **Histogramme**

Pour représenter des données de manière groupée, les histogrammes sont très efficaces.

```python
data = np.random.randn(1000)
plt.hist(data, bins=30, color='skyblue', alpha=0.7)
plt.show()
```

### **Graphique en barres d'erreur**

Les graphiques à barres d'erreurs permettent de montrer l'incertitude dans les données.

```python
x = np.linspace(0, 10, 50)
dy = 0.2
y = np.sin(x) + dy * np.random.randn(50)
plt.errorbar(x, y, yerr=dy, fmt='.k')
plt.show()
```

### Comparaison des différents types de graphes

Voici un **tableau comparatif** des différents types de graphiques.

| **Type de Graphique** | **Cas d'utilisation** | **Points forts** | **Limites** |
| --- | --- | --- | --- |
| **Graphique linéaire** | - Comparer des séries de données continues. - Visualiser des tendances au fil du temps. | - Facile à comprendre. - Représente bien les tendances. | - Moins adapté pour les données catégorielles. - Difficulté à lire si trop de courbes. |
| **Histogramme** | - Visualiser la distribution d'un ensemble de données. | - Très efficace pour comprendre la répartition des données. | - Moins adapté pour les comparaisons directes entre catégories. |
| **Nuage de points** | - Visualiser la relation entre deux variables. - Détecter des corrélations ou des tendances. | - Idéal pour repérer des schémas. - Facile à utiliser pour les régressions linéaires. | - Difficile à lire si trop de points se chevauchent. - Ne montre pas les distributions précises. |
| **Graphique en barres** | - Comparer des catégories distinctes (ventes, population, etc.). | - Simple à lire et à interpréter. - Comparaisons claires entre catégories. | - Moins efficace pour montrer des tendances temporelles ou continues. |
| **Diagramme circulaire** | - Visualiser la proportion ou le pourcentage d'un tout. | - Utile pour visualiser des parts de marché, répartition budgétaire, etc. | - Peu adapté aux comparaisons précises. - Difficile à lire avec trop de catégories. |
| **Barres d'erreur** | - Visualiser des données avec des marges d'erreur ou des incertitudes. | - Affiche clairement l'incertitude ou la variabilité dans les mesures. | - Peut être déroutant si les barres d'erreurs sont trop nombreuses ou trop larges. |
| **Graphique en aires** | - Montrer l'évolution d'une variable cumulative (ventes cumulées, précipitations). | - Bon pour montrer les valeurs cumulatives et les écarts. | - Peu adapté pour des comparaisons précises de valeurs discrètes. |
| **Graphique en lignes multiples** | - Comparer plusieurs séries continues (par exemple, ventes de différents produits sur plusieurs mois). | - Permet de voir les différences ou similitudes entre plusieurs séries. | - Trop de lignes peuvent rendre le graphique difficile à lire. |
| **Heatmap (carte thermique)** | - Visualiser les corrélations dans une matrice de données multidimensionnelles (corrélation, données géospatiales). | - Très visuel et intuitif pour les matrices de corrélation. - Parfait pour les données 2D. | - Nécessite souvent une légende pour interpréter les couleurs. |
| **Graphique 3D** | - Représenter des surfaces ou des relations entre trois variables. | - Impressionnant visuellement. - Permet de visualiser des données complexes. | - Peut être difficile à interpréter. - Moins lisible en comparaison des graphiques 2D. |

---

### **Conseil** :

- **Choix rapide** : Si on a des **données temporelles** ou continues, on doit penser aux **graphiques linéaires**. Pour des **catégories distinctes**, un **graphique en barres** sera souvent plus efficace.
- **Analyser des relations** : Pour examiner la relation entre deux variables, un **nuage de points** est idéal.
- **Répartition des données** : Si on veut explorer la répartition des données dans des intervalles, un **histogramme** est la meilleure option.

# **4. Widgets interactifs avec `ipywidgets`**

### **Introduction aux widgets**

La bibliothèque `ipywidgets` permet de créer des interfaces interactives dans des notebooks, facilitant ainsi l'exploration des données.

```python
import ipywidgets as widgets
```

### **Utilisation de `interact`**

La fonction `interact` génère automatiquement un widget pour les paramètres d'une fonction. Cela permet de rendre interactifs les graphiques et analyses.

```python
from ipywidgets import interact

def plot_sine(amplitude, frequency):
    x = np.linspace(0, 10, 1000)
    y = amplitude * np.sin(frequency * x)
    plt.plot(x, y)
    plt.ylim(-10, 10)
    plt.show()

interact(plot_sine, amplitude=(1, 10), frequency=(0.1, 2.0));
```

### **Personnalisation des widgets**

Vous pouvez spécifier des widgets particuliers comme des curseurs, des cases à cocher, des sélecteurs, etc.

```python
widgets.IntSlider(min=0, max=100, step=1, value=50)
```

**Exemple avec un curseur :**

```python
def linear_plot(m, b):
    x = np.linspace(-10, 10, 100)
    y = m * x + b
    plt.plot(x, y)
    plt.grid(True)
    plt.show()

interact(linear_plot, m=(-5, 5), b=(-10, 10, 1));
```