const axios = require("axios");
const WeatherSettings = require("../models/Settings"); // Importez le modèle de paramètres météo

const dashboardView = async (req, res) => {
  try {
    // Récupérer les préférences météo de l'utilisateur à partir de la base de données
    const weatherSettings = await WeatherSettings.findOne({ user: req.user._id });

    // Personnaliser la requête à l'API météo en utilisant les préférences météo de l'utilisateur
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: weatherSettings.location, // Utilisez l'emplacement météo préféré de l'utilisateur
        appid: "119fd7f95b40a15f2c35d190ea9b6df6", // Remplacez "VOTRE_CLE_API" par votre clé d'API
        units: weatherSettings.temperatureUnit // Utilisez l'unité de température préférée de l'utilisateur
      },
    });

    // Rendre la vue avec les données de météo et les données de l'utilisateur
    res.render("dashboard", { user: req.user, weatherData: response.data });
  } catch (error) {
    console.error("Erreur lors de la récupération des données de météo", error);
    res.status(500).send("Erreur lors de la récupération des données de météo");
  }
};

module.exports = {
  dashboardView,
};
