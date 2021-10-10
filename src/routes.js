const express = require("express");
const routes = express.Router();

const basePath = `${__dirname}/views`;

//rota para abrir o index.html
routes.get("/", (request, response) => {
  return response.sendFile(`${basePath}/index.html`);
});

//rota para abrir o job.html
routes.get("/job", (request, response) => {
  return response.sendFile(`${basePath}/job.html`);
});

//rota para abrir o job-edit.html
routes.get("/job/edit", (request, response) => {
  return response.sendFile(`{basePath}/job-edit.html`);
});

//rota para abrir o profile.html
routes.get("/profile", (request, response) => {
  return response.sendFile(`${basePath}/profile.html`);
});

module.exports = routes;
