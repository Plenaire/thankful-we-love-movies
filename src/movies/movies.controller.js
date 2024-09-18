const service = require("./movies.service");

async function movieExists(request, response, next) {
  const { movieId } = request.params;
  const movie = await service.read(movieId);

  if (movie) {
    response.locals.movie = movie;
    return next();
  }

  return next({
    message: `Movie cannot be found.`,
  });
}

async function read(request, response) {
  const { movie } = response.locals;
  response.json({ data: movie });
}

async function list(request, response) {
  const { is_showing } = request.query;
  const data = await service.list(is_showing);
  response.json({ data });
}

async function listReviewsByMovieId(request, response) {
  const { movieId } = request.params;
  const data = await service.listReviewsByMovieId(movieId);
  response.json({ data });
}

async function listTheatersByMovieId(request, response) {
  const { movieId } = request.params;
  const data = await service.listTheatersByMovieId(movieId);
  response.json({ data });
}

module.exports = {
  list,
  read: [movieExists, read],
  listReviewsByMovieId,
  listTheatersByMovieId,
};
