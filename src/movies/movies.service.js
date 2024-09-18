const db = require("../db/connection");

async function list(is_showing) {
    return db("movies")
        .select("movies.*")
        .modify((queryBuilder) => {
            if (is_showing) {
                queryBuilder
                    .join(
                        "movies_theaters",
                        "movies.movie_id",
                        "movies_theaters.movie_id"
                    )
                    .where({ "movies_theaters.is_showing": true })
                    .groupBy("movies.movie_id");
            }
        });
}

async function read(movie_id) {
    return db("movies")
        .select("*")
        .where({ movie_id })
        .first();
}

async function listReviewsByMovieId(movieId) {
    return db("reviews as r")
        .select(
            "r.*",
            "c.critic_id",
            "c.preferred_name",
            "c.surname",
            "c.organization_name"
        )
        .where({ "r.movie_id": movieId })
        .join("critics as c", "r.critic_id", "c.critic_id")
        .then((reviews) =>
            reviews.map((review) => ({
                ...review,
                critic: {
                    critic_id: review.critic_id,
                    preferred_name: review.preferred_name,
                    surname: review.surname,
                    organization_name: review.organization_name,
                },
            }))
        );
}

async function listTheatersByMovieId(movieId) {
    return db("theaters as t")
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
        )
        .then(reduceMovies);
}

async function getCriticById(criticId) {
    return db("critics").select("*").where({ critic_id: criticId }).first();
}

async function setCritic(review) {
    if (review) {
        const critic = await getCriticById(review.critic_id);
        review.critic = critic;
    }
    return review;
}

const reduceMovies = require("../utils/reduce-properties")("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies_theaters", null, "is_showing"],
});

module.exports = {
    list,
    read,
    listReviewsByMovieId,
    listTheatersByMovieId,
    getCriticById,
    setCritic,
};
