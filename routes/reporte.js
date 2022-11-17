"use strict";

var express = require("express");

var reporteControllerProveedor = require("../controllers/reporteProveedores");
var reporteControllerCliente = require("../controllers/reporteClientes");
var reporteControllerProducto = require("../controllers/reporteProductos");

var router = express.Router();

router.get(
  "/reportes/proveedoresreport",
  reporteControllerProveedor.proveedorReport
);
router.get("/reportes/clientesreport", reporteControllerCliente.clientesReport);
router.get(
  "/reportes/prodcutosreport",
  reporteControllerProducto.productosReport
  );
module.exports = router;
