const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies_theaters", null, "is_showing"],
});

async function list() {
  const theaters = await db("theaters as t")
      .join(
          "movies_theaters as mt",
          "mt.theater_id",
          "t.theater_id"
      )
      .join("movies as m", "m.movie_id", "mt.movie_id")
      .select(
          "t.*",
          "m.movie_id",
          "m.title",
          "m.runtime_in_minutes",
          "m.rating",
          "m.description",
          "m.image_url",
          "mt.is_showing"
      );

  return reduceMovies(theaters);
}

async function listByMovieId(movieId) {
  const theaters = await db("theaters as t")
      .join(
          "movies_theaters as mt",
          "mt.theater_id",
          "t.theater_id"
      )
      .join("movies as m", "m.movie_id", "mt.movie_id")
      .where("m.movie_id", movieId)
      .select(
          "t.*",
          "m.movie_id",
          "m.title",
          "m.runtime_in_minutes",
          "m.rating",
          "m.description",
          "m.image_url",
          "mt.is_showing"
      );

  return reduceMovies(theaters);
}

module.exports = {
  list,
  listByMovieId,
};
