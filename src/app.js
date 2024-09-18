if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const cors = require("cors");
const methodNotAllowed = require("./errors/methodNotAllowed");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Mount routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Handle non-existent routes and unsupported HTTP methods
app.use(methodNotAllowed);

// Handle non-existent routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
