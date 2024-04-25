const mongoose = require("mongoose");
const WeatherSettings = require("./Settings");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {   
     type: String,    
     default: "New York", 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Hook pre pour créer un paramètre météorologique par défaut lors de la création d'un nouvel utilisateur
UserSchema.pre('save', async function(next) {
  try {
    // Créer un nouveau paramètre météorologique par défaut
    const defaultSettings = new WeatherSettings({
      user: this._id, // Associer le paramètre météorologique à cet utilisateur
      // Autres paramètres météorologiques par défaut...
    });
    
    // Enregistrer le paramètre météorologique par défaut dans la base de données
    await defaultSettings.save();

    next(); // Appel à next() pour continuer le processus de sauvegarde de l'utilisateur
  } catch (error) {
    next(error); // Passer l'erreur à la prochaine fonction de middleware
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
