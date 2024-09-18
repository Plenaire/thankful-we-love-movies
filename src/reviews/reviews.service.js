const knex = require("../db/connection");

function update(newReview) {
  return knex("reviews")
      .where({ review_id: newReview.review_id })
      .update(newReview, ["*"])
      .then((updatedReviews) => updatedReviews[0])
      .then(setCritic);
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function getCriticById(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

async function setCritic(review) {
  if (review) {
    const critic = await getCriticById(review.critic_id);
    review.critic = critic;
  }
  return review;
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  update,
  read,
  getCriticById,
  destroy,
  setCritic,
};
