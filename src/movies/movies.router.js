const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.listReviewsByMovieId);

router
    .route("/:movieId/theaters")
    .get(controller.listTheatersByMovieId);

// Handle /movies/:movieId/critics route
router.route("/:movieId/critics").all((req, res) => {
    res.status(404).json({ error: "Not found" });
});

module.exports = router;
