const knex = require("../db/connection");
const reservationsService = require("../reservations/reservations.service");

function list() {
  return knex("tables").orderBy("table_name");
}

async function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((rows) => rows[0]);
}

function read(table_id) {
  return knex("tables").where({ table_id }).first();
}

function update(table_id, reservation_id) {
  return knex.transaction(async (transaction) => {
    await knex("reservations")
      .where({ reservation_id })
      .update({ status: "seated" })
      .transacting(transaction);

    return knex("tables")
      .where({ table_id })
      .update({ reservation_id }, "*")
      .transacting(transaction)
      .then((rows) => rows[0]);
  });
}

function destroy(table) {
  return knex.transaction(async (transaction) => {
    await knex("reservations")
      .where({ reservation_id: table.reservation_id })
      .update({ status: "finished" })
      .transacting(transaction);

    return knex("tables")
      .where({ table_id: table.table_id })
      .update({ reservation_id: null }, "*")
      .transacting(transaction)
      .then((rows) => rows[0]);
  });
}

module.exports = {
  list,
  create,
  read,
  update,
  destroy,
};
