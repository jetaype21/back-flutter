"use strict";

var express = require("express");
var productosController = require("../controllers/productosController");
var clientesController = require("../controllers/clientesController");
var proveedoresController = require("../controllers/proveedoresController");

var router = express.Router();

// Rutas
// GET ALL
router.get("/productos", productosController.list);
router.get("/clientes", clientesController.list);
router.get("/proveedores", proveedoresController.list);

// find
router.get("/productos/:id", productosController.find);
router.get("/clientes/:id", clientesController.find);
router.get("/proveedores/:id", proveedoresController.find);

// send
router.post("/productos/save", productosController.save);
router.post("/clientes/save", clientesController.save);
router.post("/proveedores/save", proveedoresController.save);

module.exports = router;
