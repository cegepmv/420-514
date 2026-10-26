+++
date = '2025-11-05T08:16:29-05:00'
draft = false
title = '📘 Matplotlib'
weight = 107
+++


## 1. Introduction à Matplotlib
Matplotlib est une bibliothèque Python utilisée pour créer des visualisations de données.
Elle permet notamment de produire :
- des graphiques en courbes ;
- des diagrammes à barres ;
- des histogrammes ;
- des nuages de points ;
- des boîtes à moustaches ;
- des figures composées de plusieurs sous-graphiques ;
- des visualisations personnalisées et exportables.
Matplotlib est souvent utilisée avec NumPy et Pandas.


## 2. Structure de base d’un graphique

Schéma classique :

```python
plt.plot(x, y)        # ou plt.bar, plt.scatter, plt.hist, etc.
plt.xlabel("Label X")
plt.ylabel("Label Y")
plt.title("Titre du graphique")
plt.show()
```

À retenir :

* `plt.plot(...)` : trace une courbe.
* `plt.xlabel(...)`, `plt.ylabel(...)` : nomment les axes.
* `plt.title(...)` : ajoute un titre.
* `plt.show()` : affiche le graphique.


## 3. Types de graphiques courants

### 3.1. Courbe (line plot)

```python
plt.plot(x, y)
plt.show()
```

Utilisation typique :

* évolution d’une valeur dans le temps,
* séries de mesures ordonnées.


### 3.2. Nuage de points (scatter plot)

```python
plt.scatter(x, y)
plt.show()
```

Utilisation typique :

* relation entre deux variables numériques (ex. taille vs poids, nb_clients vs ventes),
* recherche de tendance ou de corrélation.


### 3.3. Diagramme en barres

```python
plt.bar(categories, valeurs)
plt.show()
```

Variante horizontale :

```python
plt.barh(categories, valeurs)
plt.show()
```

Utilisation typique :

* comparaison de catégories (régions, produits, groupes d’étudiants, etc.).


### 3.4. Histogramme

```python
plt.hist(donnees, bins=10)
plt.show()
```

Utilisation typique :

* visualiser la **distribution** d’une variable numérique,
* voir si les valeurs sont regroupées, dispersées, symétriques, etc.


## 4. Utiliser Matplotlib avec pandas

On travaille souvent avec un DataFrame :

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("donnees.csv")

plt.plot(df["annee"], df["ventes"])
plt.xlabel("Année")
plt.ylabel("Ventes")
plt.title("Évolution des ventes")
plt.show()
```

Idée clé :

* on passe directement des colonnes du DataFrame (`df["colonne"]`) à Matplotlib.



## 5. Personnalisation de base

### 5.1. Titres et labels

```python
plt.title("Mon titre")
plt.xlabel("Axe X")
plt.ylabel("Axe Y")
```

### 5.2. Légende

Quand on a plusieurs séries de données :

```python
plt.plot(x, y1, label="Série 1")
plt.plot(x, y2, label="Série 2")
plt.legend()
```

### 5.3. Rotation des labels de l’axe X

```python
plt.xticks(rotation=45)
```

Pratique quand les labels sont longs (ex. noms de régions, dates, etc.).


## 6. Sauvegarder un graphique

```python
plt.plot(x, y)
plt.title("Graphique à sauvegarder")
plt.savefig("graphique.png")  # enregistre dans un fichier
plt.show()
```

Formats possibles : `png`, `jpg`, `pdf`, etc.



## 7. Bonnes pratiques

* Toujours mettre :

  * un **titre**,
  * des **labels d’axes**,
  * une **légende** si plusieurs séries.
* Vérifier :

  * que les axes sont lisibles,
  * que le graphique n’est pas surchargé.
* Choisir le bon type de graphique :

  * **courbe** : évolution / série temporelle,
  * **barres** : comparaison de catégories,
  * **nuage de points** : relation entre deux variables,
  * **histogramme** : distribution d’une variable.



## 8. Erreurs fréquentes

* Oublier `plt.show()` : rien ne s’affiche (dans un script).
* Avoir des listes `x` et `y` de longueurs différentes.
* Ne pas mettre de labels ni de titre : graphique difficile à interpréter.
* Utiliser un type de graphique qui ne correspond pas aux données.



## 9. Mini-récap à mémoriser

1. `import matplotlib.pyplot as plt`
2. Choisir une fonction :

   * `plt.plot`, `plt.bar`, `plt.scatter`, `plt.hist`, etc.
3. Ajouter :

   * `plt.title`, `plt.xlabel`, `plt.ylabel`, `plt.legend` si besoin.
4. Terminer par :

   * `plt.show()`




![Diagrammes des types des graphes](/420-514/images/types_graphes_diagramme.png)

Tools :
![Python visulaisation librairies](/420-514/images/Python_visualisation_libs.png)
