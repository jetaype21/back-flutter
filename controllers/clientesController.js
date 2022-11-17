"use strict";

var client = require("../database/db");
var db = client.db("certus");

var controller = {
  // Listar pedidos
  list: function (req, res) {
    console.log("---------------------");
    console.log("Entrando a la funcion List product");
    db.collection("clientes")
      .find()
      .toArray((error, dataCliente) => {
        if (error || !dataCliente) {
          return res.status(404).send({ message: "clientes no disponible" });
        }

        return res.status(200).send({
          status: "success",
          clientes: dataCliente,
        });
      });
  },

  // buscar pedido
  find: function (req, res) {
    console.log("--------------------");
    console.log("Entrando a la funcion Find productos");

    // console.log('id: ' + req.params.id);
    db.collection("clientes")
      .find({ clienteId: parseInt(req.params.id) })
      .toArray((error, dataCliente) => {
        if (error || !dataCliente) {
          return res.status(404).send({
            message: "No se encontro el cliente",
          });
        } else {
          return res.status(200).send({
            status: "success",
            producto: dataCliente[0],
          });
        }
      });
  },

  // guardar pedido (insertar /  actualizar)
  save: function (req, res) {
    console.log("---------------");
    console.log("Entrando a la funcion save producto");

    console.log(req.body);
    if (req.body.clienteId == "0") {
      //es nuevo
      console.log("Entrando a nuevo");
      db.collection("clientes")
        .count()
        .then((countClientes) => {
          var cliente = {};

          cliente.clienteId = countClientes + 1;
          cliente.fecha = req.body.fecha;
          cliente.product = req.body.product;
          cliente.total = req.body.total;
          cliente.categoria = req.body.categoria;
          cliente.estado = req.body.estado;

          db.collection("clientes").insertOne(cliente, (error, result) => {
            if (error) {
              {
                return res.status(404).send({
                  message: "No se pudo registrar el cliente",
                });
              }
            } else {
              return res.status(200).send({
                message: "success",
                cliente: result,
              });
            }
          });
        });
    } else {
      //es editar
      console.log("Entrando a editar");

      var cliente = {};

      cliente.clienteId = parseInt(req.body.clienteId);
      cliente.fecha = req.body.fecha;
      cliente.product = req.body.product;
      cliente.total = req.body.total;
      cliente.categoria = req.body.categoria;
      cliente.estado = req.body.estado;

      console.log(cliente);

      db.collection("clientes").updateOne(
        { clienteId: { $eq: parseInt(req.body.clienteId) } },
        { $set: cliente },
        (error, result) => {
          if (error) {
            return res.status(404).send({
              message: "No se pudo editar",
            });
          } else {
            return res.status(200).send({
              message: "Se pudo editar",
              cliente: result,
            });
          }
        }
      );
    }
  },
};

module.exports = controller;
