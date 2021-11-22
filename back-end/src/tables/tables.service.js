const knex = require("../db/connection");

function list() {
  return knex("tables")
    .orderBy("table_name");
}

function create(newTable) {
  return knex("tables").insert(newTable, "*").then((rows)=>rows[0]);
}

module.exports = {
  list,
  create,
};
