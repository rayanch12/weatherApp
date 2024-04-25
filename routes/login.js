const express = require("express");
const router = express.Router();
const { registerView, loginView, registerUser, loginUser, logoutView } = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");
const { settingsView, updateSettings } = require("../controllers/settingsController"); // Importez le contrôleur des paramètres météo

router.get("/register", registerView);
router.get("/login", loginView);
router.get("/logout", logoutView);
router.get("/dashboard", protectRoute, dashboardView);
router.get("/", protectRoute, dashboardView);

router.get("/settings", protectRoute, settingsView); // Route pour afficher la page de paramètres météo
router.post("/settings", protectRoute, updateSettings); // Route pour gérer la soumission du formulaire de paramètres météo

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
