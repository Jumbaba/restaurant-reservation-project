const { table } = require("../db/connection");
const knex = require("../db/connection");
const service = require("../reservations/reservations.service");

function list(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .whereNot({status:"finished"})
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((rows) => rows[0]);
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id: reservation_id }).first();
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .returning("*")
    .where({ "reservation_id":reservation_id })
    .update({status})
    .then((rows) => rows[0]);

}

function destroy(reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .update("status", "finished")
    .then((rows) => rows[0]);
}

module.exports = {
  list,
  create,
  read,
  updateStatus,
  destroy,
};
