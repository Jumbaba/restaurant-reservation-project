const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .whereNot({status:"finished"})
    .whereNot({status: "cancelled"})
    .orderBy("reservation_time");
}

async function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((rows) => rows[0]);
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id: reservation_id }).first();
}

async function updateStatus(reservation_id, status) {
  return knex("reservations")
    .returning("*")
    .where({ "reservation_id":reservation_id })
    .update({status})
    .then((rows) => rows[0]);

}

async function update(reservation_id, newReservation) {
  return knex("reservations")
    .returning("*")
    .where({ "reservation_id":reservation_id })
    .update(newReservation)
    .then((rows) => rows[0]);
}


// function updateStatus(reservation_id, newStatus) {
//   return knex("reservations")
//     .select("*")
//     .where({ reservation_id })
//     .update(newStatus, "*")
//     .then((records) => records[0]);
// }

// async function destroy(reservation_id) {
//   return knex("reservations")
//     .where({ reservation_id })
//     .update("status", "finished")
//     .then((rows) => rows[0]);
// }

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}



module.exports = {
  list,
  create,
  read,
  updateStatus,
  // destroy,
  search,
  update,
};
