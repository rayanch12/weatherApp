# Application Météo

Bienvenue dans l'application Météo ! Cette application vous permet de consulter les données météorologiques actuelles et les prévisions météorologiques pour une localisation donnée. Vous pouvez également personnaliser vos paramètres météo pour recevoir des alertes et définir des seuils de température, d'humidité et de vitesse du vent.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et npm installés sur votre machine.
3. Installez les dépendances du projet en exécutant la commande suivante :

`npm install`


4. Configurez votre base de données MongoDB `MONGODB_URI` avec l'URL de votre base de données MongoDB.

`MONGODB_URI=your_mongodb_uri`


5. Démarrez l'application en exécutant la commande suivante :

`npm start`


L'application sera accessible à l'adresse `http://localhost:3000` par défaut.

## Fonctionnalités

- **Inscription et Connexion** : Les utilisateurs peuvent s'inscrire et se connecter à leur compte pour personnaliser leurs paramètres météo.
- **Dashboard** : Affiche les données météorologiques actuelles et les prévisions météorologiques pour la localisation de l'utilisateur.
- **Paramètres Météo** : Permet aux utilisateurs de définir leurs préférences météo, y compris l'unité de température, la localisation, les seuils de température, d'humidité et de vitesse du vent, ainsi que les alertes tsunami et tremblement de terre.

## Technologies Utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Bootstrap
- EJS (Embedded JavaScript)

## Structure du Projet

Le projet suit une architecture MVC (Modèle-Vue-Contrôleur) avec les répertoires suivants :

- **models** : Contient les modèles de données MongoDB définis avec Mongoose.
- **views** : Contient les fichiers de vue EJS pour l'interface utilisateur.
- **controllers** : Contient les contrôleurs qui gèrent la logique métier de l'application.
- **routes** : Contient les routes Express pour définir les points d'entrée de l'API.
- **auth** : Contient les fichiers pour l'authentification des utilisateurs.
- **public** : Contient les fichiers statiques tels que les styles CSS et les scripts JavaScript.

## Auteur

Rayan CHERIFI
Ines BACCOUCHE
