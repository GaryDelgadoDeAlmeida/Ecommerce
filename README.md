# E-commerce

Application E-Commerce développé avec Symfony / ReactJS.

La finalité du projet est de pouvoir le vendre sur le marché et ajouter une nouvelle ligne dans mon portfolio :<br/><a href="http://garry-almeida.com/" target="_blank">http://garry-almeida.com/</a>.

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


### Symfony

- lexik/jwt-authentication-bundle
- doctrine/doctrine-fixtures-bundle (dans l'environnement de dev)

### React

- axios
- sass
- sass-loader
- react-dom
- react-chartjs-2
- react-router-dom
- symfony/webpack-encore-bundle

### Images / SVG

- Fontawesome (<a href="https://fontawesome.com/" target="_blank">https://fontawesome.com/</a>)
- OnlyWebFonts (<a href="https://www.onlinewebfonts.com/" target="_blank">https://www.onlinewebfonts.com/</a>)

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
php bin/console security:hash-password
```

## Fixtures

Pour créer des `fixtures` (se sont de fausse données qu'on a insérer dans la base. Cette fonctionnalité est utile quand-t-on a besoin d'informations pour tester l'application). Pour utiliser les fixtures, il faudra ajouter la depandence dans l'environnement de dev uniquement (on ne veut pas qu'elle soit déployer dans l'env de la production) :
```bash
composer require orm-fixtures --dev
```

Pour créer un fichier veuillez, il faut utiliser la commande suivante et suivre les instructions données :
```bash
symfony console m:fixtures
```

Pour exécuter les fixtures (a exécuter uniquement dans l'environnement de dev)
```bash
symfony console doctrine:fixtures:load
```

Cette commande va exécuter toutes les fixtures du dossier `DataFixtures` mais pour exécuter spécifiquement un fichier du dossier, il faudra utiliser la commande suivante (attention, pas besoin de mettre l'extension du fichier a appelé) :
```bash
symfony console doctrine:fixtures:load <nom_du_fichier>
```


## Fonctionnalités

- Système d'enregistrement pour les utilisateurs (clients)
- Système de connexion / déconnexion utilisateur (utilisateur / administrateur)
- Système de commande 
- Système de création de produits
- Système de paiement en ligne (à voir => Paypal)