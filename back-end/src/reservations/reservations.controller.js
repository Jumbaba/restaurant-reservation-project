/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");

async function list(req, res, next) {
  const { date } = req.query;
  const data = await reservationsService.list(date);
  res.json({ data });
}

async function create(req, res, next) {
  const newReservation = req.body.data;
  const data = await reservationsService.create(newReservation);
  res.status(201).json({ data });
}

function hasValidFields(req, res, next) {
  const {data} = req.body;
  if (!data) next({status:400, message:"data is missing"});

  const dateFormat = /\d\d\d\d-\d\d-\d\d/; 
  const timeFormat = /\d\d:\d\d/; 

  const errors = [];
  const {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = data;

  if (!first_name || first_name.trim()==="") errors.push("first_name is missing or empty");
  if (!last_name || last_name.trim()==="") errors.push("last_name is missing or empty");
  if (!mobile_number || mobile_number.trim()==="") errors.push("mobile_number is missing or empty");
  if (!reservation_date || !dateFormat.test(reservation_date)) errors.push("reservation_date is missing or empty");
  if (!reservation_time || !timeFormat.test(reservation_time)) errors.push("reservation_time is missing or empty");
  if (!people || typeof people !== "number" || people < 1) errors.push("people is missing or empty");
  if (new Date(reservation_date).getDay() == 1) errors.push("The reservation date is a Tuesday as the restaurant is closed on Tuesdays.");
  if (new Date(`${reservation_date} ${reservation_time}`).getTime() < new Date().getTime()) errors.push("The reservation date is in the past. Only future reservations are allowed.");
  
  const reservationTimeInMinutes = new Date(`${reservation_date} ${reservation_time}`).getHours() * 60 + new Date(`${reservation_date} ${reservation_time}`).getMinutes();
  const tenThirtyAM = (9 * 60) + 30;
  const nineThirtyPM = (20 * 60) + 30;

  if (reservationTimeInMinutes < tenThirtyAM + 60) errors.push("The reservation time is before 10:30 AM.");
  if (reservationTimeInMinutes > nineThirtyPM + 60) errors.push("The reservation time is after 9:30 PM. The restaurant closes at 10:30 PM so you there won't be enough time to enjoy your meal.")

  if (errors.length > 0) next({status:400, message:errors.join(", ")});
  
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasValidFields, asyncErrorBoundary(create)],
};
