"use strict";

var client = require("../database/db");
var db = client.db("certus");

var controller = {
  // Listar pedidos
  list: function (req, res) {
    console.log("---------------------");
    console.log("Entrando a la funcion List product");
    db.collection("proveedores")
      .find()
      .toArray((error, dataProveedor) => {
        if (error || !dataProveedor) {
          return res.status(404).send({ message: "Proveedor no disponible" });
        }

        return res.status(200).send({
          status: "success",
          proveedores: dataProveedor,
        });
      });
  },

  // buscar pedido
  find: function (req, res) {
    console.log("--------------------");
    console.log("Entrando a la funcion Find productos");

    // console.log('id: ' + req.params.id);
    db.collection("proveedores")
      .find({ proveedorId: parseInt(req.params.id) })
      .toArray((error, dataProveedor) => {
        if (error || !dataProveedor) {
          return res.status(404).send({
            message: "No se encontro el proveedor",
          });
        } else {
          return res.status(200).send({
            status: "success",
            proveedor: dataProveedor[0],
          });
        }
      });
  },

  // guardar pedido (insertar /  actualizar)
  save: function (req, res) {
    console.log("---------------");
    console.log("Entrando a la funcion save producto");

    console.log(req.body);
    if (req.body.proveedorId == "0") {
      //es nuevo
      console.log("Entrando a nuevo");
      db.collection("proveedores")
        .count()
        .then((countProveedores) => {
          var proveedor = {};
          proveedor.proveedorId = countProveedores + 1;
          proveedor.fecha = req.body.fecha;
          proveedor.product = req.body.product;
          proveedor.total = req.body.total;

          db.collection("proveedores").insertOne(proveedor, (error, result) => {
            if (error) {
              {
                return res.status(404).send({
                  message: "No se pudo registrar el proveedior",
                });
              }
            } else {
              return res.status(200).send({
                message: "success",
                proveedor: result,
              });
            }
          });
        });
    } else {
      //es editar
      console.log("Entrando a editar");

      var proveedor = {};
          proveedor.proveedorId = countProveedores + 1;
          proveedor.fecha = req.body.fecha;
          proveedor.product = req.body.product;
          proveedor.total = req.body.total;
      console.log(proveedor);

      db.collection("proveedores").updateOne(
        { proveedorId: { $eq: parseInt(req.body.proveedorId) } },
        { $set: proveedor },
        (error, result) => {
          if (error) {
            return res.status(404).send({
              message: "No se pudo editar",
            });
          } else {
            return res.status(200).send({
              message: "No se pudo editar",
              proveedor: result,
            });
          }
        }
      );
    }
  },
};

module.exports = controller;
