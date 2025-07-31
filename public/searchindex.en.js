var relearn_searchindex = [
  {
    "breadcrumb": "Maintenance de logiciel",
    "content": "This is a new chapter.",
    "description": "This is a new chapter.",
    "tags": [],
    "title": "Intro",
    "uri": "/420-515/intro/index.html"
  },
  {
    "breadcrumb": "Maintenance de logiciel",
    "content": "Introduction à Git Git est un logiciel de contrôle de version. Il permet de gérer des fichiers et leur évolution dans le temps.\nIl permet de retracer l’origine de chaque modification, de rétablir des versions précédentes et permet l’intégration de modifications effectuées en parallèle.\nConcept Le principe d’un gestionnaire de version est qu’il gère un document comme “une base” à laquelle est ajouté une suite de modifications.\nIl y a un dépôt commun (Remote) et les contributeurs travaillent sur des versions locales.\nLorsqu’un contributeur a réalisé une modification qui est prête à l’envoyer, il pousse (push) celle-ci vers le dépôt. Le dépôt garde la trace avec un identifiant unique.\nGit est en fait un gestionnaire de version décentralisé. Il y a 2 dépôts : remote et local. De plus, il maintient une version brouillon (staged, sandbox) sur le poste local.\nGit clone Lorsque vous devez récupérer le code de votre repository (dépôt remote):\ngit clone https://github.com/420-411-MV/demo-i18n.git\nSi vous avez configuré la clef SSH dans github par exemple:\ngit clone git@github.com:cegepmv/420-411.git\nGit Commit Le principe de la commande commit est de déposer les modifications sur une dépôt local. Il faut également être vigilant au niveau de la branche utilisé pour le commit. De plus, il est important de mettre souvent à jour la branche avant de procéder à un commit.\nLorsqu’on fait la commande commit, on doit y ajouter un message. En entreprise, on joint souvent un identifiant pour référer à la tâche en cours. Après cet identifiant, on peut y mettre une description. Par exemple:\n“PRJ-3428: Ajout de tests unitaires sur la méthode du service getClients”\nLorsqu’on relie l’identifiant et les commits, on peut alors connaître le travail effectué dans le code pour une tâche donnée dans le système de gestion des projets (Jira, Clickup, Zoho, Zenhub, Asana, Monday.com, etc.).\ngit commit -m \"Votre message\" Git Push La commande git push permet de pousser (la branche actuelle de) le local vers le remote : git applique alors successivement tous les commit au remote.\nIl est fortement recommandé de faire un git fetch / pull avant de procéder à celui-ci. À moins d’être seul dans ce repository et/ou la branche visée.\nGit Fetch, checkout, pull La commande git fetch permet de mettre à jour notre dépôt local en récupérant l’ état courant qui remote. La commande git checkout permet de les appliquer à la copie de travail (et donc de les voir).\nLa commande git pull fait les deux à la fois.\nPensez à vous mettre à jour avant chaque session de travail !\nC’est la première chose qu’un développeur fait chaque matin en se mettant au travail, dans beaucoup de cas.\nGit status La commande git status vous permet de connaître l’état courant de vos copies locales (les modifications ont-elles été commitées, les fichiers ajoutés, les commit pushé).\nLes interface graphiques (dont intelliJ) vous l’indique souvent par des couleurs et icones.\nGit logs La commande vous permet de voir tous les commits et tous les identifiants (Commit ID) pour chaque commit effectué. Ces commit peuvent être fort utili pour faire d’autres commandes tel que git revert, git cherry-pick pour ne nommer que celles-ci.\nGit merge Cette commande permet d’appliquer les changements (fusionner) d’une autre branche à votre branche sélectionnée dans votre repository locale. Il y a souvent des conflits lors d’une fusion. Surtout si vous avez travailler dans un même fichier qu’un ou une de vos collègues.\nVous devez tenter de résoudre les conflits avec des outils en ligne de commande ou à l’aide d’un interface graphique. C’est une habilité à acquérir avec le temps. C’est parfois très complexe et si l’opération n’est pas effectée avec soin, il peut y avoir injection de bug.\n// on va sur la branche master git checkout master // on merge hotfix dans master git merge hotfix Git Rebase Le rebase consiste à changer la base de votre branche d’un commit vers un autre, donnant l’illusion que vous avez créé votre branche à partir d’un commit différent.\ngit rebase \u003cbase\u003e Git stash Lorsque vous voulez sauvegarder l’état actuel de votre répertoire de travail. C’est possible de le faire avec git stash et de revenir à un répertoire de travail propre sans ces modifications. Vous pourrez ensuite récupérer ce travail en utilisant le nom que vous lui aurez donné. Vous pouvez en avoir plusieurs sauvegardés dans une liste.\n// Sauvegarder les changements courrants. git stash // Récupérer les changements précédents. git stash pop // Voir la liste des stash git stash list Meilleures pratiques Ne pas laisser les branches inactives. Effacer votre branche de bugfix ou de fonctionnalité si vous avez terminé.\nNe pas prendre les branches pour plusieurs fonctionnalités. Séparez vos tâches en plus petites et faites des commits plus souvent.\nRécupérer la branche parent le plus souvent possible. Soit en faisant un merge ou en faisant des rebases.\nCommuniquez avec votre équipe vos intentions! Ne travaillez pas sur les mêmes modules si possible.\nDans chaque Pull Request. Vous devriez ajouter des tests unitaires si vous avez travaillé sur une fonctionnalité ou un fix.\nAvant le jour de la mise en production. Vous devriez créer une branche à partir du main ou master. Donnez-lui le nom de MEP_4OCT_24 par exemple. Effectuez le merge de la branche RELEASE visée vers la branche de la copie de la production MEP_4OCT_24. Assurez-vous de bien merger tous les éléments. Testez que votre branche fonctionne et qu’elle est bien compilée. Le jour J de la mise en production. Mergez cette branche vers la production. Les conflits auront déjà été résolus! Bingo.\nGitflow Pour maintenir une certain cohésion en entreprise, un modèle de branche a été proposé. Il implique de séparer les branches de développement et les branches primaires qui sont déployés dans multiples environnements.\nSource:\nhttps://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow\nRéférence Richard E. Silverman (2013), Git Pocket Guide, O’Reilly\nAlice Jacquot, Introduction à Git https://www.lri.fr/~jacquot/ipo/introAGit.pdf",
    "description": "Introduction à Git Git est un logiciel de contrôle de version. Il permet de gérer des fichiers et leur évolution dans le temps.\nIl permet de retracer l’origine de chaque modification, de rétablir des versions précédentes et permet l’intégration de modifications effectuées en parallèle.\nConcept Le principe d’un gestionnaire de version est qu’il gère un document comme “une base” à laquelle est ajouté une suite de modifications.\nIl y a un dépôt commun (Remote) et les contributeurs travaillent sur des versions locales.",
    "tags": [],
    "title": "Gestionnaire de source",
    "uri": "/420-515/gestionnairesource/index.html"
  },
  {
    "breadcrumb": "Maintenance de logiciel",
    "content": "This is a new chapter.",
    "description": "This is a new chapter.",
    "tags": [],
    "title": "Gestionnaire de projet",
    "uri": "/420-515/gestionnaireprojet/index.html"
  },
  {
    "breadcrumb": "Maintenance de logiciel",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Categories",
    "uri": "/420-515/categories/index.html"
  },
  {
    "breadcrumb": "",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Maintenance de logiciel",
    "uri": "/420-515/index.html"
  },
  {
    "breadcrumb": "Maintenance de logiciel",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tags",
    "uri": "/420-515/tags/index.html"
  }
]
