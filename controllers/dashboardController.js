const axios = require("axios");
const WeatherSettings = require("../models/Settings");

const dashboardView = async (req, res) => {
  try {
    const weatherSettings = await WeatherSettings.findOne({ user: req.user._id });

    // Récupérer les données météorologiques actuelles
    const currentWeatherResponse = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: weatherSettings.location,
        appid: "119fd7f95b40a15f2c35d190ea9b6df6",
        units: weatherSettings.temperatureUnit
      },
    });

    // Récupérer les prévisions météorologiques
    const forecastResponse = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        q: weatherSettings.location,
        appid: "119fd7f95b40a15f2c35d190ea9b6df6",
        units: weatherSettings.temperatureUnit
      },
    });

    // Passer les seuils à la vue
    const temperatureThreshold = weatherSettings.temperatureThreshold;
    const humidityThreshold = weatherSettings.humidityThreshold;
    const windSpeedThreshold = weatherSettings.windSpeedThreshold;

    res.render("dashboard", { 
      user: req.user, 
      currentWeather: currentWeatherResponse.data, 
      forecastData: forecastResponse.data,
      temperatureThreshold: temperatureThreshold,
      humidityThreshold: humidityThreshold,
      windSpeedThreshold: windSpeedThreshold
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo", error);
    res.status(500).send("Erreur lors de la récupération des données météo");
  }
};

module.exports = {
  dashboardView,
};
