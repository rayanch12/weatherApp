const axios = require("axios");
const WeatherSettings = require("../models/Settings");

const dashboardView = async (req, res) => {
  try {
    const weatherSettings = await WeatherSettings.findOne({ user: req.user._id });
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: weatherSettings.location,
        appid: "119fd7f95b40a15f2c35d190ea9b6df6",
        units: weatherSettings.temperatureUnit
      },
    });
    res.render("dashboard", { user: req.user, weatherData: response.data });
  } catch (error) {
    console.error("Erreur lors de la récupération des données de météo", error);
    res.status(500).send("Erreur lors de la récupération des données de météo");
  }
};

module.exports = {
  dashboardView,
};
