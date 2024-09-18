const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const data = await service.list();
  response.json({ data });
}

async function listByMovieId(request, response) {
  const { movieId } = request.params;
  const data = await service.listByMovieId(movieId);
  response.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listByMovieId: asyncErrorBoundary(listByMovieId),
};
