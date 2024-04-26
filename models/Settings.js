const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSettingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  temperatureUnit: {
    type: String,
    enum: ['metric', 'imperial'],
    default: 'metric'
  },
  location: {
    type: String,
    default: 'Paris'
  },
  // Paramètres de seuil pour les alertes
  temperatureThreshold: {
    type: Number,
    default: 25 // Seuil de température par défaut
  },
  humidityThreshold: {
    type: Number,
    default: 60 // Seuil d'humidité par défaut
  },
  // Nouveaux paramètres pour les alertes de vitesse de vent, tsunami et tremblement de terre
  windSpeedThreshold: {
    type: Number,
    default: 30 // Seuil de vitesse de vent par défaut
  },
  tsunamiAlert: {
    type: Boolean,
    default: true // Indicateur booléen pour les alertes de tsunami
  },
  earthquakeAlert: {
    type: Boolean,
    default: true // Indicateur booléen pour les alertes de tremblement de terre
  }
});

const WeatherSettings = mongoose.model('WeatherSettings', WeatherSettingsSchema);
module.exports = WeatherSettings;
