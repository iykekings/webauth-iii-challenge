const knex = require('knex');
const config = require('../knexfile').development;

const db = knex(config);

const get = filter =>
  !filter
    ? db('users')
    : db('users')
        .where(filter)
        .first();

const add = user => db('users').insert(user);

module.exports = {
  get,
  add
};