"use strict";

var client = require("../database/db.js");
var db = client.db("certus");

var controller = {
  clientesReport: function (req, res) {
    console.log("----------------");
    console.log("Entrando a reporte clientes");
    db.collection("clientes")
      .aggregate([{ $group: { _id: "$categoria", count: { $sum: 1 } } }])
      .toArray((error, dataClientesByCategoria) => {
        if (error || !dataClientesByCategoria) {
          return res.status(404).send({
            message: "no se encontraron Clientes",
          });
        } else {
          res.status(200).send({
            status : "success",
            clientesReport: dataClientesByCategoria
          })
        }
      });
  },
};


module.exports = controller