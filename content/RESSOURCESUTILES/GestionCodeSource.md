+++
title = "Gestionnaire de source"
weight = 201
draft = false
+++

## Introduction à Git

Git est un logiciel de contrôle de version. Il permet de gérer des fichiers et leur évolution dans le temps. 

Il permet de retracer l’origine de chaque modification, de rétablir des versions
précédentes et permet l’intégration de modifications effectuées en parallèle. 

## Concept

Le principe d’un gestionnaire de version est qu’il gère un document comme “une
base” à laquelle est ajouté une suite de modifications.


Il y a un dépôt commun (Remote) et les contributeurs travaillent sur des versions locales.


Lorsqu’un contributeur a réalisé une modification qui est prête à l'envoyer, il pousse (push) celle-ci vers le dépôt. Le dépôt garde la trace avec un identifiant unique. 

Git est en fait un gestionnaire de version décentralisé. Il y a 2 dépôts : remote et local. De plus, il maintient une version brouillon (staged, sandbox) sur le poste local.


## Git clone

Lorsque vous devez récupérer le code de votre repository (dépôt remote):

   git clone https://github.com/420-411-MV/demo-i18n.git

Si vous avez configuré la clef SSH dans github par exemple:

   git clone git@github.com:cegepmv/420-411.git

## Git Commit

Le principe de la commande commit est de déposer les modifications sur une dépôt local. Il faut également être vigilant au niveau de la branche utilisé pour le commit. De plus, il est important de mettre souvent à jour la branche avant de procéder à un commit. 

Lorsqu'on fait la commande commit, on doit y ajouter un message. En entreprise, on joint souvent un identifiant pour référer à la tâche en cours. Après cet identifiant, on peut y mettre une description. Par exemple:

"PRJ-3428: Ajout de tests unitaires sur la méthode du service getClients"

Lorsqu'on relie l'identifiant et les commits, on peut alors connaître le travail effectué dans le code pour une tâche donnée dans le système de gestion des projets (Jira, Clickup, Zoho, Zenhub, Asana, Monday.com, etc.).

    git commit -m "Votre message"

## Git Push

La commande *git push* permet de pousser (la branche actuelle de) le local vers le
remote : git applique alors successivement tous les commit au remote. 

Il est fortement recommandé de faire un git fetch / pull avant de procéder à celui-ci. À moins d'être seul dans ce repository et/ou la branche visée.

## Git Fetch, checkout, pull

La commande git fetch permet de mettre à jour notre dépôt local en récupérant l’
état courant qui remote. La commande git checkout permet de les appliquer à la
copie de travail (et donc de les voir).

La commande git pull fait les deux à la fois.

Pensez à vous mettre à jour avant chaque session de travail !

C’est la première chose qu’un développeur fait chaque matin en se mettant au
travail, dans beaucoup de cas.

## Git status

La commande git status vous permet de connaître l’état courant de vos copies
locales (les modifications ont-elles été commitées, les fichiers ajoutés, les commit pushé).

Les interface graphiques (dont intelliJ) vous l’indique souvent par des couleurs et
icones. 

## Git logs

La commande vous permet de voir tous les commits et tous les identifiants (Commit ID) pour chaque commit effectué. Ces commit peuvent être fort utili pour faire d'autres commandes tel que *git revert*, *git cherry-pick* pour ne nommer que celles-ci.

## Git merge

Cette commande permet d'appliquer les changements (fusionner) d'une autre branche à votre branche sélectionnée dans votre repository locale. Il y a souvent des conflits lors d'une fusion. Surtout si vous avez travailler dans un même fichier qu'un ou une de vos collègues. 

Vous devez tenter de résoudre les conflits avec des outils en ligne de commande ou à l'aide d'un interface graphique. C'est une habilité à acquérir avec le temps. C'est parfois très complexe et si l'opération n'est pas effectée avec soin, il peut y avoir injection de bug.

    // on va sur la branche master
    git checkout master

    // on merge hotfix dans master
    git merge hotfix

## Git Rebase

Le rebase consiste à changer la base de votre branche d'un commit vers un autre, donnant l'illusion que vous avez créé votre branche à partir d'un commit différent.

 ![image](/420-514/images/gitrebase.svg)

    git rebase <base>


## Git stash

Lorsque vous voulez sauvegarder l'état actuel de votre répertoire de travail. C'est possible de le faire avec git stash et de revenir à un répertoire de travail propre sans ces modifications. Vous pourrez ensuite récupérer ce travail en utilisant le nom que vous lui aurez donné. Vous pouvez en avoir plusieurs sauvegardés dans une liste. 

    // Sauvegarder les changements courrants.
    git stash

    // Récupérer les changements précédents.
    git stash pop

    // Voir la liste des stash
    git stash list

## Meilleures pratiques

1. Ne pas laisser les branches inactives. Effacer votre branche de *bugfix* ou de *fonctionnalité* si vous avez terminé.

2. Ne pas prendre les branches pour plusieurs fonctionnalités. *Séparez vos tâches* en plus petites et faites des commits *plus souvent*.

3. Récupérer la branche parent le plus souvent possible. Soit en faisant un merge ou en faisant des rebases.

4. Communiquez avec votre équipe vos intentions! Ne travaillez pas sur les mêmes modules si possible. 

5. Dans chaque Pull Request. Vous devriez ajouter des tests unitaires si vous avez travaillé sur une fonctionnalité ou un fix.

6. Avant le jour de la mise en production. Vous devriez créer une branche à partir du main ou master. Donnez-lui le nom de MEP_4OCT_24 par exemple. Effectuez le merge de la branche RELEASE visée vers la branche de la copie de la production MEP_4OCT_24. Assurez-vous de bien merger tous les éléments. Testez que votre branche fonctionne et qu'elle est bien compilée. Le jour J de la mise en production. Mergez cette branche vers la production. Les conflits auront déjà été résolus! Bingo. 

## Gitflow

Pour maintenir une certain cohésion en entreprise, un modèle de branche a été proposé. Il implique de séparer les branches de développement et les branches primaires qui sont déployés dans multiples environnements.

Source:

https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

## Référence

Richard E. Silverman (2013), Git Pocket Guide, O'Reilly

Alice Jacquot, Introduction à Git
https://www.lri.fr/~jacquot/ipo/introAGit.pdf