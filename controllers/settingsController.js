const WeatherSettings = require("../models/Settings");
const User = require("../models/User");

// Affiche la page de paramètres météo
const settingsView = async (req, res) => {
  try {
    // Récupérer les paramètres météo de l'utilisateur
    const settings = await WeatherSettings.findOne({ user: req.user._id });

    // Rendre la vue avec les paramètres météo
    res.render("settings", { user: req.user, settings });
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres météo", error);
    res.status(500).send("Erreur lors de la récupération des paramètres météo");
  }
};
const updateSettings = async (req, res) => {
  try {
    // Récupérer les paramètres soumis par le formulaire
    const { temperatureUnit, location } = req.body;

    // Vérifier si l'utilisateur a déjà des paramètres enregistrés
    let settings = await WeatherSettings.findOne({ user: req.user._id });

    // Si l'utilisateur n'a pas encore de paramètres, créez-en un nouveau
    if (!settings) {
      settings = new WeatherSettings({ user: req.user._id });
    }

    // Mettre à jour les paramètres avec les nouvelles valeurs
    settings.temperatureUnit = temperatureUnit;
    settings.location = location;

    // Enregistrer les nouveaux paramètres dans la base de données
    await settings.save();

    // Mettre à jour la localisation de l'utilisateur dans le modèle d'utilisateur
    await User.findByIdAndUpdate(req.user._id, { location: location });

    // Rediriger l'utilisateur vers la page de tableau de bord
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres météo", error);
    res.status(500).send("Erreur lors de la mise à jour des paramètres météo");
  }
};

module.exports = {
  updateSettings,
};


module.exports = {
  settingsView,
  updateSettings,
};
