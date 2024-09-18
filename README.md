# thankful-we-love-movies

This project is for the back-end capstone for Chegg Skills.

This project sets up a database for movies and run the database on Render using PostgreSQL.

Here is an example:

## Get all movies

This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

There are two different cases to consider:

- `GET /movies`
- `GET /movies?is_showing=true`

### GET /movies

The response from the server will look like the following:

```json
{
  "data": [
    {
      "movie_id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/...",
      "created_at": "2024-09-05T07:17:07.009Z",
      "updated_at": "2024-09-05T07:17:07.009Z"
    }
    // ...
  ]
}
