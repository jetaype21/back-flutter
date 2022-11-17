"use strict";

var client = require("../database/db.js");
var db = client.db("certus");

var controller = {
  productosReport: function (req, res) {
    console.log("----------------");
    console.log("Entrando a reporte proveedor");
    db.collection("productos")
      .aggregate([{ $group: { _id: "$categoria", count: { $sum: 1 } } }])
      .toArray((error, dataProductosByCategoria) => {
        if (error || !dataProductosByCategoria) {
          return res.status(404).send({
            message: "no se encontraron productos",
          });
        } else {
          res.status(200).send({
            status: "success",
            productosReport: dataProductosByCategoria,
          });
        }
      });
  },
};


module.exports = controller