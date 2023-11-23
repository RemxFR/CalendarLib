# CalendarLib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.

## Development server

### Avec docker
Dans un terminal, dans le dossier CalendarLib, lancer la commande : docker-compose up, afin de lancer le projet sur un container docker.
Une fois le déploiement effectué, vous pourvez simplement aller sur l'url suivante : http://localhost:4200 , pour accéder au site, suivez ensuite les instructions sur le site pour afficher le calendrier.
### Sans docker
Pour lancer l'application front, il suffit d'inscrire `ng serve` dans la console. 
Le port par défault sera le 4200, en se rendant sur `http://localhost:4200/`, on affichera la page en local.
L'application se rechargera automatiquement si on change un des fichiers.

## Utilisation
Il suffit d'inscrire le numéro du mois et le nombre de l'année puis de cliquer sur le bouton en dessous du formulaire pour afficher le calendrier.
Pour saisir un évènement il faudra cliquer sur le bouton + et 'enregistrer'.
A noter que cette application web, marche avec une partie backen dédiée. Il faut donc que les deux soient en marche pour que tout fonctionne.

## Limitations
L'application gère actuellement l'enregistrement d'un seul event et le calendrier sera renouveler à chaque nouvelle saisie.
Les années à choisir sont entre 1900 et 3000.
