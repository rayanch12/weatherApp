const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSettingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  temperatureUnit: {
    type: String,
    enum: ['Celsius', 'Fahrenheit'],
    default: 'Celsius'
  },
  location: {
    type: String,
    default: 'Paris'
  }
});

const WeatherSettings = mongoose.model('WeatherSettings', WeatherSettingsSchema);
module.exports = WeatherSettings;
