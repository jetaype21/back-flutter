'use strict'
// requires
const express = require('express');
const bodyParser = require('body-parser');

// ejecutar expres
var app = express();

// cargar los archivps
var productosRouter = require("./routes/productos");

// midlewars
app.use(bodyParser.urlencoded({ extends: false }))
app.use(bodyParser.json())

// configurar cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// reescribir rutas
app.use('/api', productosRouter)
// exportat modulo
module.exports = app