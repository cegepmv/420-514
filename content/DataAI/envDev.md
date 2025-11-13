+++
date = '2025-10-27T07:23:35-04:00'
draft = false
title = 'Science des données : environnements de développement'
weight = 102
+++

## 1. **Langage utilisé :**

**Python 3 :** Nous utiliserons **Python 3**, qui est largement adopté dans le domaine de la science des données. Python est connu pour sa simplicité, sa large communauté, et ses nombreuses bibliothèques pour l'analyse de données, la visualisation, et le machine learning.

## 2. **Environnements de développement**

Les principaux environnements de développement qui sont adaptés pour travailler avec des **notebooks Jupyter** et **Python** sont :

### a) **Google Colab**

![image.png](/420-514/images/collab_home.png)

- **URL** : [https://colab.research.google.com/](https://colab.research.google.com/)
- **Caractéristiques** : Google Colab est un environnement **notebook Jupyter basé sur le cloud** qui permet d'exécuter du code Python directement depuis ton navigateur. Il est très populaire dans le domaine de la science des données, car il offre des ressources comme des **GPU** et des **TPU** gratuitement.
- **Avantages** : Pas besoin de configuration locale, accès facile à des bibliothèques et des calculs intensifs, collaboration en ligne facile (similaire à Google Docs), sauvegarde sur Google Drive.
- **Utilisation conseillée pour le cours** : C’est l’option recommandée pour cette session en raison de sa simplicité et de son accès direct aux ressources en ligne.

### b) **PyCharm**

![Pycharm_notebook](/420-514/images/Pycharm_notebook.png)

- **Description** : **PyCharm** est un environnement de développement intégré (IDE) puissant pour Python, développé par JetBrains. Il offre des outils avancés pour le développement Python, tels que l'édition intelligente de code, la gestion de versions, le débogage, et l'intégration avec des notebooks Jupyter.
- **Usage dans la science des données** : PyCharm permet d’écrire et d’exécuter du code Python, et il supporte les **notebooks Jupyter** via des plugins. Il est souvent utilisé pour des projets plus complexes en dehors des notebooks.

### c) **Anaconda / Jupyter Notebook / JupyterLab**

- **URL** : [https://www.anaconda.com/products/individual](https://www.anaconda.com/products/individual)
- **Description** : **Anaconda** est une distribution Python populaire qui inclut un large ensemble de bibliothèques et d'outils pour la science des données, notamment **Jupyter Notebook** et **JupyterLab**.
    - **Jupyter Notebook** : Un environnement interactif permettant de mélanger du code Python, de la documentation (Markdown), et des visualisations dans un même fichier avec l'extension `.ipynb`.
    - **JupyterLab** : Une version plus avancée de Jupyter Notebook, offrant plus de fonctionnalités et une meilleure interface pour gérer les fichiers et les données.
- **Avantages** : Anaconda facilite la gestion des bibliothèques et la création d'environnements isolés pour différents projets. Il est idéal pour travailler localement sur des notebooks.

### d) **VS Code (Visual Studio Code)**

![image.png](/420-514/images/VS_code-Notebook.png)

- **Description** : **VS Code** est un éditeur de texte populaire qui, avec des extensions, prend en charge les **notebooks Jupyter**. Il est souvent utilisé pour des projets Python complexes, tout en permettant l’intégration de notebooks.
- **Utilisation** : Il est apprécié pour sa légèreté et sa flexibilité avec les extensions, permettant une gestion fluide des projets en Python et des notebooks Jupyter.

### e) Kaggle

- url : [https://www.kaggle.com/](https://www.kaggle.com/)

### f) **Datalore**

- **Description** : **Datalore** est une plateforme en ligne pour l'exécution de notebooks Jupyter, similaire à Google Colab, mais avec une interface plus avancée pour la collaboration et des fonctionnalités d'analyse de données.
- **Usage dans le cours** : Bien qu’il ne soit pas explicitement recommandé dans le cours, il est une alternative intéressante pour ceux qui recherchent des fonctionnalités supplémentaires de collaboration.

## 3. **Notebooks Jupyter**

Les **notebooks Jupyter** sont un **environnement de travail interactif** qui permet d'exécuter du code, de la documentation, et de la visualisation dans un seul fichier. Le format de fichier associé est `.ipynb` (**Interactive PYthon NoteBook**). Les notebooks sont particulièrement populaires en science des données car ils permettent de tester des blocs de code tout en ajoutant des explications ou des commentaires.

- **Composition d’un notebook** :
    - **Cellules de code** : Où le code Python est exécuté.
    - **Cellules de texte Markdown** : Où la documentation et les explications peuvent être rédigées en utilisant le langage Markdown.
    - **Visualisation** : Les graphiques et visualisations générés par des bibliothèques comme **Matplotlib** ou **Seaborn** peuvent être affichés directement dans le notebook.
    
    ![Collab_notbook_parts](/420-514/images/Collab_notbook_parts.png)
    

### Avantages des notebooks :

- **Interaction en direct** : Les notebooks permettent d'exécuter du code et d'obtenir les résultats instantanément, ce qui est très utile pour l'exploration de données.
- **Mélange de code et de documentation** : Tu peux ajouter des descriptions, des graphiques, et du code dans un même document pour créer des rapports interactifs et reproductibles.
- **Partage facile** : Les fichiers `.ipynb` peuvent être partagés et ouverts dans de nombreuses applications, comme Google Colab, Jupyter Notebook, VS Code, ou encore PyCharm.

## 4. **Extensions .ipynb et portabilité**

Le fichier `.ipynb` est le format utilisé par les notebooks Jupyter. Ce format est largement pris en charge par plusieurs environnements de développement, ce qui le rend très portable. Les notebooks peuvent être ouverts, modifiés, et exécutés dans des environnements variés :

- **Google Colab** : Permet d'importer et d'exporter des notebooks Jupyter directement à partir de Google Drive.
- **Jupyter Notebook / JupyterLab** : L’outil classique pour ouvrir, éditer et exécuter les notebooks localement sur une machine.
- **PyCharm** : Avec les bons plugins, tu peux également gérer des notebooks directement dans PyCharm.
- **VS Code** : Avec des extensions Jupyter, VS Code peut exécuter et modifier des notebooks `.ipynb`.

---

## Bibliothèques à explorer

### Numpy :

NumPy offre des tableaux multidimensionnels et des outils mathématiques avancés.

[NumPy](https://numpy.org/)

### Pandas :

Pandas permet de manipuler et analyser des données tabulaires de manière flexible et puissante

[pandas - Python Data Analysis Library](https://pandas.pydata.org/)

### **Matplotlib :**

Matplotlib est une bibliothèque complète permettant de créer des visualisations statiques, animées et interactives en Python. 

[Matplotlib — Visualization with Python](https://matplotlib.org/)

## Aide-mémoire :

[Data Analysis with PANDAS-1.pdf](/420-514/files/Data_Analysis_with_PANDAS-1.pdf)

[numpy.pdf](/420-514/files/numpy.pdf)

[Numpy_Python_Cheat_Sheet.pdf](/420-514/files/Numpy_Python_Cheat_Sheet.pdf)

[Pandas_DF_cheat_sheet.pdf](/420-514/files/Pandas_DF_cheat_sheet.pdf)