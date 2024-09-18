const knex = require("knex");
const knexConfig = require("./knexfile");

const environment = process.env.NODE_ENV || "development";
const configuration = knexConfig[environment];

module.exports = knex(configuration);
