# E-commerce

## Contexte

## Installation

### Symfony

Pour installer toutes les dépendances nécessaires côté Symfony :
```bash
    composer install
```

### React

Pour installer toutes les dépendances nécessaires côté ReactJS :
```bash
    npm install
```
OU
```bash
    yarn install
```

La commande va compilé tous le répertoire assets (la partie front de l'application (js et sass), fait en React) et créer un sous-dossier build dans le dossier public.

### Style

Si les styles ne sont pas automatiquement compiler, veuillez utiliser la commande suivante pour compiler les styles SASS dans un fichier CSS :
```bash
    sass --style compressed ./public/assets/sass/index.scss ./public/assets/build/app.css
```

## Database

Si la base de données n'est pas créer
```bash
    symfony console doctrine:database:create
```

Ensuite, une fois la BDD créer, il faut maintenant générer les migrations s'il ne sont pas déjà générer. Par défault, les fichiers de migrations sont stockés dans le répertoire migrations à la racine du projet Symfony.
```bash
    symfony console m:migration
```

Une fois les fichiers de migration générer, il faut les executer. Pour faire cela, il faut aller à la racine du projet Symfony, puis executer la commande suivante :
```bash
    symfony console doctrine:migration:migrate
```

## Packages

- lexik/jwt-authentication-bundle (pour l'authentification par token. Config voir doc <a href="https://symfony.com/bundles/LexikJWTAuthenticationBundle/current/index.html" target="_blank">LexikJWTAuthenticationBundle</a>) 
- symfony/webpack-encore-bundle (pour la partie fontend React)

## Commande

Voici ci-joint les commandes qui débloque quand le besoin ce présente

### Github

IF you have NOT pushed your changes to remote
```bash
    git reset HEAD~1
```

ELSE you have pushed your changes to remote
```bash
    git revert HEAD
```

Quick setup create a new repository on the command line
```bash
    echo "# <GitHub-Repository>" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/GaryDelgadoDeAlmeida/<GitHub-Repository>.git
    git push -u origin main
```

…or push an existing repository from the command line
```bash
    git remote add origin https://github.com/GaryDelgadoDeAlmeida/<GitHub-Repository>.git
    git branch -M main
    git push -u origin main
```

### Symfony
Pour générer un mot de passe hasher

```bash
    bin/console security:hash-password
```

## Fonctionnalités

- Système d'enregistrement pour les utilisateurs (clients)
- Système de connexion / déconnexion utilisateur (utilisateur / administrateur)
- Système de commande 
- Système de paiement en ligne (à voir)