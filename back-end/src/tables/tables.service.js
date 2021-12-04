const knex = require("../db/connection");

function list() {
  return knex("tables")
    .orderBy("table_name");
}

function create(newTable) {
  return knex("tables").insert(newTable).returning("*").then((rows)=>rows[0]);
}

const read = (table_id) => {
  return knex('tables').where({ table_id }).first();
};

const update = (table_id, reservation_id) => {
  return knex('tables')
    .where({ table_id })
    .update({ reservation_id }, '*')
    .then((rows) => rows[0]);
};

const destroy = (table_id) => {
  return knex('tables').where({ table_id }).update('reservation_id', null);
};

module.exports = {
  list,
  create,
  read,
  update,
  destroy,
};
