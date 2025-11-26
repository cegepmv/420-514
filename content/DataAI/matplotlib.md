+++
date = '2025-11-05T08:16:29-05:00'
draft = false
title = 'Laboratoire : Introduction à Matplotlib'
weight = 107
+++


## 1. Objectifs du labo

À la fin de ce laboratoire, vous serez capables de :

- Tracer différents types de graphiques avec Matplotlib :
  - courbes (line plot),
  - diagrammes en barres,
  - nuages de points (scatter),
  - histogrammes.
- Personnaliser un graphique (titre, axes, légende).
- Utiliser Matplotlib avec des données stockées dans un DataFrame `pandas`.
- Interpréter visuellement des distributions simples.


## 2. Contexte

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

---

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

---

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

````

---

## 2️⃣ Fiche synthèse Matplotlib – Version étudiant·es

```markdown
# Fiche synthèse – Matplotlib (Python)

## 1. Rôle de Matplotlib

- Matplotlib est une bibliothèque Python pour créer des graphiques 2D.
- On l’utilise souvent avec le sous-module `pyplot` :

```python
import matplotlib.pyplot as plt
````

---

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

---

## 3. Types de graphiques courants

### 3.1. Courbe (line plot)

```python
plt.plot(x, y)
plt.show()
```

Utilisation typique :

* évolution d’une valeur dans le temps,
* séries de mesures ordonnées.

---

### 3.2. Nuage de points (scatter plot)

```python
plt.scatter(x, y)
plt.show()
```

Utilisation typique :

* relation entre deux variables numériques (ex. taille vs poids, nb_clients vs ventes),
* recherche de tendance ou de corrélation.

---

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

---

### 3.4. Histogramme

```python
plt.hist(donnees, bins=10)
plt.show()
```

Utilisation typique :

* visualiser la **distribution** d’une variable numérique,
* voir si les valeurs sont regroupées, dispersées, symétriques, etc.

---

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

---

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

---

## 6. Sauvegarder un graphique

```python
plt.plot(x, y)
plt.title("Graphique à sauvegarder")
plt.savefig("graphique.png")  # enregistre dans un fichier
plt.show()
```

Formats possibles : `png`, `jpg`, `pdf`, etc.

---

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

---

## 8. Erreurs fréquentes

* Oublier `plt.show()` : rien ne s’affiche (dans un script).
* Avoir des listes `x` et `y` de longueurs différentes.
* Ne pas mettre de labels ni de titre : graphique difficile à interpréter.
* Utiliser un type de graphique qui ne correspond pas aux données.

---

## 9. Mini-récap à mémoriser

1. `import matplotlib.pyplot as plt`
2. Choisir une fonction :

   * `plt.plot`, `plt.bar`, `plt.scatter`, `plt.hist`, etc.
3. Ajouter :

   * `plt.title`, `plt.xlabel`, `plt.ylabel`, `plt.legend` si besoin.
4. Terminer par :

   * `plt.show()`

```



![Diagrammes des types des graphes](/420-514/images/types_graphes_diagramme.png)

Tools :
![Python visulaisation librairies](/420-514/images/Python_visualisation_libs.png)
