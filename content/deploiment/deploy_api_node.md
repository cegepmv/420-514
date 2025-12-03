+++
date = '2025-12-03T09:35:43-05:00'
draft = false
title = 'Déploiement d’une api Node.js avec Render'
+++


Render est une plateforme cloud qui simplifie le déploiement d'applications web, notamment celles développées avec Node.js et Express. Voici un guide détaillé pour déployer votre application Node.js sur Render.

## Prérequis

- **Compte GitHub** : Render s'intègre directement avec GitHub pour faciliter le déploiement.
- **Application Node.js prête** : Assurez-vous que votre application est fonctionnelle en local et que le code est hébergé sur un dépôt GitHub.

## Étapes de déploiement

1. **Créer un compte Render**
    - Rendez-vous sur [Render.com](https://render.com/) et inscrivez-vous en utilisant votre compte GitHub.
    
    ![Capture d’écran 2024-11-07 231948.png](/420-514/images/render/Capture_dcran_2024-11-07_231948.png)

    
2. **Connecter votre dépôt GitHub**
    - Après la connexion, Render vous demandera d'autoriser l'accès à vos dépôts GitHub. Sélectionnez le dépôt contenant votre application Node.js.
    
    ![Capture d’écran 2024-11-07 232458.png](/420-514/images/render/Capture_dcran_2024-11-07_232458.png)
    

![Capture d’écran 2024-11-07 232430.png](/420-514/images/render/Capture_dcran_2024-11-07_232430.png)

1. **Créer un nouveau service web**
    - Dans le tableau de bord Render, cliquez sur "New" puis sélectionnez "Web Service".
    
    ![Capture d’écran 2024-11-07 232313.png](/420-514/images/render/Capture_dcran_2024-11-07_232313.png)

    [Source]()
    
    - Choisissez le dépôt GitHub approprié et la branche que vous souhaitez déployer.
    
    ![Capture d’écran 2024-11-07 232340.png](/420-514/images/render/Capture_dcran_2024-11-07_232340.png)

    
    ![Capture d’écran 2024-11-07 232623.png](/420-514/images/render/Capture_dcran_2024-11-07_232623.png)

    
2. **Configurer les paramètres de déploiement**
    - **Nom du service** : Attribuez un nom unique à votre application. Ce nom sera utilisé dans l'URL fournie par Render.
    - **Région** : Sélectionnez la région la plus proche de vos utilisateurs pour optimiser les performances.
    - **Runtime** : Choisissez "Node".
        
        ![image.png](/420-514/images/render/image.png)
        
    - **Build Command** : Indiquez la commande pour installer les dépendances, généralement `npm install` ou `yarn`.
    - **Start Command** : Spécifiez la commande pour démarrer votre application, par exemple `node app.js` ou `npm start`.
   
   ![Capture d’écran 2024-11-07 234957.png](/420-514/images/render/Capture_dcran_2024-11-07_234957.png)

    
3. **Déployer l'application**
    - Cliquez sur "Create Web Service". Render commencera à construire et déployer votre application.

    ![Capture d’écran 2024-11-07 235651.png](/420-514/images/render/Capture_dcran_2024-11-07_235651.png)

    - Une fois le déploiement terminé, Render fournira une URL où votre application est accessible.
    
    
    ![Capture d’écran 2024-11-08 131624.png](/420-514/images/render/Capture_dcran_2024-11-08_131624.png)

![image.png](/420-514/images/render/image_1.png)


## Gestion des variables d'environnement

Si votre application nécessite des variables d'environnement (par exemple, des clés API ou des configurations spécifiques), vous pouvez les définir dans les paramètres de votre service sur Render :

- Accédez à votre service dans le tableau de bord Render.
- Cliquez sur l'onglet "Environment".
- Ajoutez vos variables d'environnement en spécifiant le nom et la valeur correspondante.
    

![image](/420-514/images/render/Capture_dcran_2024-11-07_234934.png)


[Source](https://prod-files-secure.s3.us-west-2.amazonaws.com/1228a316-0380-48be-b7b2-59d64e389a98/e3babfa6-1304-4026-98e1-8f7fec7d2f29/Capture_dcran_2024-11-07_234934.png)

## Déploiements automatiques

Par défaut, Render surveille les modifications sur la branche spécifiée de votre dépôt GitHub. À chaque nouvelle modification poussée, Render déclenche automatiquement un nouveau déploiement, assurant que votre application est toujours à jour.

## Ressources supplémentaires

- **Documentation officielle de Render** : Pour des informations plus détaillées, consultez la [documentation officielle de Render](https://docs.render.com/).
- **Tutoriel vidéo** : Pour une démonstration visuelle du processus de déploiement, vous pouvez consulter le tutoriel suivant :

[How to Deploy a Node.js Puppeteer App to Render.com for Free](https://www.youtube.com/watch?v=6cm6G78ZDmM)

[Deploy a Node Express App on Render – Render Docs](https://docs.render.com/deploy-node-express-app)