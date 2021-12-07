const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

// Middleware

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const foundReservation = await service.read(reservation_id);
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with ID ${reservation_id} not found`,
  });
}

function hasValidFields(req, res, next) {
  const { data } = req.body;
  if (!data) next({ status: 400, message: "data is missing" });

  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;

  const errors = [];
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = data;

  if (!first_name || first_name.trim() === "")
    errors.push("first_name is missing or empty");
  if (!last_name || last_name.trim() === "")
    errors.push("last_name is missing or empty");
  if (!mobile_number || mobile_number.trim() === "")
    errors.push("mobile_number is missing or empty");
  if (!reservation_date || !dateFormat.test(reservation_date))
    errors.push("reservation_date is missing or empty");
  if (!reservation_time || !timeFormat.test(reservation_time))
    errors.push("reservation_time is missing or empty");
  if (!people || typeof people !== "number" || people < 1)
    errors.push("people is missing or empty");
  if (new Date(reservation_date).getDay() === 1)
    errors.push(
      "The reservation date is a Tuesday as the restaurant is closed on Tuesdays."
    );
  if (
    new Date(`${reservation_date} ${reservation_time}`).getTime() <
    new Date().getTime()
  )
    errors.push(
      "The reservation date is in the past. Only future reservations are allowed."
    );

  const reservationTimeInMinutes =
    new Date(`${reservation_date} ${reservation_time}`).getHours() * 60 +
    new Date(`${reservation_date} ${reservation_time}`).getMinutes();
  const tenThirtyAM = 9 * 60 + 30;
  const nineThirtyPM = 20 * 60 + 30;

  if (reservationTimeInMinutes < tenThirtyAM + 60)
    errors.push("The reservation time is before 10:30 AM.");
  if (reservationTimeInMinutes > nineThirtyPM + 60)
    errors.push(
      "The reservation time is after 9:30 PM. The restaurant closes at 10:30 PM so you there won't be enough time to enjoy your meal."
    );

  if (status === "seated" || status === "finished") {
    errors.push("The reservation status is seated or finished");
  }

  if (errors.length) next({ status: 400, message: errors.join(", ") });

  next();
}

const hasValidStatus = (req, res, next) => {
  const { status } = req.body.data;
  
  const validStatus = ["seated", "booked", "finished", "cancelled"];
  const errors = [];
  if (!validStatus.includes(status)) {
    errors.push("unknown status received.");
  }

  if (res.locals.reservation.status === "finished") {
    errors.push("A finished reservation cannot be updated");
  }

  if (errors.length) {
    return next({
      status: 400,
      message: errors.join(", "),
    });
  }

  next();
};

async function searchReservationExists(req, res, next) {
  const { mobile_number } = req.query;
  const { date } = req.query;

  if (!mobile_number && date) {
    res.locals.reservations = await service.list(date);
    return next();
  }

  if (mobile_number && !date) {
    const foundReservations = await service.search(mobile_number);
    if (foundReservations) {
      res.locals.reservations = foundReservations;
      return next();
    } else {
      res.locals.reservations = [];
      return next();
    }
  }
}

// Methods

function read(req, res, next) {
  const reservation = res.locals.reservation;

  res.json({ data: reservation });
}

async function list(req, res) {
  res.json({ data: res.locals.reservations });
}

async function create(req, res, next) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);

  res.status(201).json({ data });
}

async function updateStatus(req, res, next) {
  const { status } = req.body.data;
  const { reservation_id } = req.params;

  const data = await service.updateStatus(Number(reservation_id), status);

  res.json({ data });
}

async function update(req, res, next) {
  const newReservation = req.body.data;
  const { reservation_id } = req.params;

  const data = await service.update(Number(reservation_id), newReservation);

  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(searchReservationExists), asyncErrorBoundary(list)],
  create: [hasValidFields, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), read],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    hasValidFields,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ]
};
