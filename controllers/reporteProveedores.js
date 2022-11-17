"use strict";

var client = require("../database/db.js");
var db = client.db("certus");

var controller = {
  proveedorReport: function (req, res) {
    console.log("----------------");
    console.log("Entrando a reporte proveedor");
    db.collection("proveedores")
      .aggregate([{ $group: { _id: "$categoria", count: { $sum: 1 } } }])
      .toArray((error, dataProveedoresByCategoria) => {
        if (error || !dataProveedoresByCategoria) {
          return res.status(404).send({
            message: "no se encontraron proveedores",
          });
        } else {
          res.status(200).send({
            status : "success",
            proveedoresReport: dataProveedoresByCategoria
          })
        }
      });
  },
};


module.exports = controller