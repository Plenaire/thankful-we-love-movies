function notFound(request, response, next) {
    const { originalUrl, method } = request;
    const allowedPaths = [
        "/movies/:movieId/theaters",
        "/movies/:movieId/reviews",
    ];

    if (allowedPaths.some((path) => originalUrl.includes(path))) {
        return next();
    }

    next({ status: 404, message: `Path not found: ${originalUrl}` });
}

module.exports = notFound;
