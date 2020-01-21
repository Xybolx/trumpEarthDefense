const router = require("express").Router();
const scoresRoutes = require("./scores");

// scores routes
router.use("/scores", scoresRoutes);

module.exports = router;