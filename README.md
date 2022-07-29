# moussally-p7-groupomania

Bienvenue sur mon repo du projet Groupomania

## PRE-REQUIS
Vous aurez besoin de créer un fichier `.env` dans le dossier backend du projet, lequel devra contenir les informations de connexion au serveur et d'authentification
Vous pouvez également créer un serveur local en utilisant un `dump` de la DB
Dans les deux cas, vous devrez me contacter pour obtenir l'une ou l'autre de ces informations

## INSTALLATION BACK
Créez un fichier `.env` dans le dossier `backend` et mettez y les informations `DB_USERNAME`, `DB_PWD` et `WEB_AUTH_TOKEN`.
Ouvrez un terminal dans le dossier `backend` du projet, puis entrez la commande `npm install`.

*! VERIFIEZ votre ExecutionPolicy avec la commande `Get-ExecutionPolicy` !*
Si la commande vous retourne Restricted, vous ne pourrez pas lancer le serveur avec nodemon, puisque les scripts sont bloqués.
Entrez la commande suivante pour changer votre ExecutionPolicy `Set-ExecutionPolicy -Scope CurrentUser  -ExecutionPolicy Unrestricted`.
Vous pourrez ensuite lancer le serveur avec la commande `nodemon server`

## INSTALLATION FRONT
Ouvrez un terminal dans le dossier `frontend` du projet, puis entrez la commande `npm install`.

## FONCTIONNEMENT
Commencez dans le dossier principal du projet
Ouvrez deux terminaux de commandes, un pour le backend et un pour le frontend

### ATTENTION ! Lancez bien le backend AVANT le frontend, sans quoi vous n'aurez aucune donnée

## Lancer le backend : 
Allez dans le dossier backend avec `cd ./backend`
Entrez la commande `nodemon server` ou `node server`

## Lancer le frontend : 
Allez dans le dossier frontend avec `cd ./frontend`
Entrez la commande `npm start`
