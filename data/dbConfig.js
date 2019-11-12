const knex = require('knex');
require('dotenv').config();

const knexConfig = require('../knexfile');

module.exports = knex(knexConfig[process.env.NODE_ENV]);