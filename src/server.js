const express = require("express");
const server = express();
const routes = require("./routes");

//Habilitar a view engine do ejs
server.set("view engine", "ejs");

//Habilitar arquivos estáticos.
server.use(express.static("public"));

//usar o req body
server.use(express.urlencoded({extended: true}));

//Habilitar o uso de rotas exportado do arquivo routes.js
server.use(routes);

server.listen(3000, () => console.log("Rodando..."));
