const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res, next) {
  const newTable = req.body.data;
  const data = await tablesService.create(newTable);
  res.status(201).json({ data });
}

function hasValidFields(req, res, next) {
  const { data } = req.body;
  if (!data) next({ status: 400, message: "data is missing" });

  const errors = [];

  const { table_name, capacity } = data;

  if (!table_name || table_name.trim() === "" || table_name.length < 2)
    errors.push("table_name must be at least 2 characters long");
  if (!capacity || typeof capacity !== "number" || capacity < 1)
    "capacity must be greater than 1";

  if (errors.length > 0) next({ status: 400, message: errors.join(", ") });

  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasValidFields, asyncErrorBoundary(create)],
};
