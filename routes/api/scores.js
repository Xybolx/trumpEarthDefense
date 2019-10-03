const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

// Matches with "/api/scoes"
router
    .route("/")
    .get(scoresController.findAll)
    .post(scoresController.create)
    .delete(scoresController.remove);

// Matches with "/api/scores/:id"
router
    .route("/:id")
    .get(scoresController.findById)
    .put(scoresController.update);

module.exports = router;