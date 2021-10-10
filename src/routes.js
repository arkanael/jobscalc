const express = require("express");
const routes = express.Router();

const views = `${__dirname}/views`;

//rota para abrir o index
routes.get("/", (req, res) => {
  return res.render(`${views}/index`);
});

//rota para abrir o job
routes.get("/job", (req, res) => {
  return res.render(`${views}/job`);
});

//rota para abrir o job-edit
routes.get("/job/edit", (req, res) => {
  return res.render(`{views}/job-edit`);
});

//rota para abrir o profile
routes.get("/profile", (req, res) => {
  return res.render(`${views}/profile`);
});

module.exports = routes;
