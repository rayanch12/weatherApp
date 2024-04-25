const axios = require("axios");

const dashboardView = async (req, res) => {
  try {
    // Effectuer une requête à l'API météo avec la clé d'API
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: "Paris,fr", // Remplacez "Paris,fr" par la ville de votre choix
        appid: "119fd7f95b40a15f2c35d190ea9b6df6", // Remplacez "VOTRE_CLE_API" par votre clé d'API
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
