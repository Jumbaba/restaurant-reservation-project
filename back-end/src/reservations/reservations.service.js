const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((rows) => rows[0]);
}

const read = (reservation_id) => {
  return knex("reservations").where({ reservation_id: reservation_id }).first();
};

// function updateStatus(reservation_id){
//   return knex("reservations").where({reservation_id:reservation_id}).update({
//     status: 
//   })
// }

module.exports = {
  list,
  create,
  read,
};
