const WeatherSettings = require("../models/Settings"); // Importez le modèle de paramètres météo
const User = require("../models/User");

const settingsView = async (req, res) => {
  try {
    const settings = await WeatherSettings.findOne({ user: req.user._id });
    res.render("settings", { user: req.user, settings });
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres météo", error);
    res.status(500).send("Erreur lors de la récupération des paramètres météo");
  }
};

const updateSettings = async (req, res) => {
  try {
    const { temperatureUnit, location, temperatureThreshold, humidityThreshold, windSpeedThreshold, tsunamiAlert, earthquakeAlert } = req.body;
    let settings = await WeatherSettings.findOne({ user: req.user._id });

    if (!settings) {
      settings = new WeatherSettings({ user: req.user._id });
    }

    settings.temperatureUnit = temperatureUnit;
    settings.location = location;
    settings.temperatureThreshold = temperatureThreshold;
    settings.humidityThreshold = humidityThreshold;
    settings.windSpeedThreshold = windSpeedThreshold;
    settings.tsunamiAlert = tsunamiAlert === 'true'; // Convertir la chaîne en booléen
    settings.earthquakeAlert = earthquakeAlert === 'true'; // Convertir la chaîne en booléen

    await settings.save();
    await User.findByIdAndUpdate(req.user._id, { location: location });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres météo", error);
    res.status(500).send("Erreur lors de la mise à jour des paramètres météo");
  }
};

module.exports = {
  settingsView,
  updateSettings,
};
