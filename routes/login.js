const express = require("express");
const router = express.Router();
const { registerView, loginView, registerUser, loginUser, logoutView } = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");
const { settingsView, updateSettings } = require("../controllers/settingsController");

router.get("/register", registerView);
router.get("/login", loginView);
router.get("/logout", logoutView);
router.get("/dashboard", protectRoute, dashboardView);
router.get("/", protectRoute, dashboardView);

router.get("/settings", protectRoute, settingsView);
router.post("/settings", protectRoute, updateSettings);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
