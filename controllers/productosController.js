"use strict";

var client = require("../database/db");
var db = client.db("certus");

var controller = {
  // Listar pedidos
  list: function (req, res) {
    console.log("---------------------");
    console.log("Entrando a la funcion List product");
    db.collection("productos")
      .find()
      .toArray((error, dataProducto) => {
        if (error || !dataProducto) {
          return res.status(404).send({ message: "Productos no disponible" });
        }

        return res.status(200).send({
          status: "success",
          productos: dataProducto,
        });
      });
  },

  // buscar pedido
  find: function (req, res) {
    console.log("--------------------");
    console.log("Entrando a la funcion Find productos");

    // console.log('id: ' + req.params.id);
    db.collection("productos")
      .find({ productoId: parseInt(req.params.id) })
      .toArray((error, dataProducto) => {
        if (error || !dataProducto) {
          return res.status(404).send({
            message: "No se encontro el producto",
          });
        } else {
          return res.status(200).send({
            status: "success",
            producto: dataProducto[0],
          });
        }
      });
  },

  // guardar pedido (insertar /  actualizar)
  save: function (req, res) {
    console.log("---------------");
    console.log("Entrando a la funcion save producto");

    console.log(req.body);
    if (req.body.productoId == "0") {
      //es nuevo
      console.log("Entrando a nuevo");
      db.collection("productos")
        .count()
        .then((countProductos) => {
          var producto = {};

          producto.productoId = countProductos + 1;
          producto.precio = req.body.precio;
          producto.precioInitial = req.body.precioInitial;
          producto.name = req.body.name;
          producto.img = req.body.img;
          producto.categoria = req.body.categoria;
          producto.estado = req.body.estado;

          db.collection("productos").insertOne(producto, (error, result) => {
            if (error) {
              {
                return res.status(404).send({
                  message: "No se pudo registrar el proudcto",
                });
              }
            } else {
              return res.status(200).send({
                message: "success",
                producto: result,
              });
            }
          });
        });
    } else {
      //es editar
      console.log("Entrando a editar");

      var producto = {};
      producto.productoId = parseInt(req.body.productoId);
      producto.pecio = req.body.precio;
      producto.precioInitial = req.body.precioInitial;
      producto.name = req.body.name;
      producto.img = req.body.img;
      producto.categoria = req.body.categoria;
      producto.estado = req.body.estado;

      console.log(producto);

      db.collection("productos").updateOne(
        { productoId: { $eq: parseInt(req.body.productoId) } },
        { $set: producto },
        (error, result) => {
          if (error) {
            return res.status(404).send({
              message: "No se pudo editar",
            });
          } else {
            return res.status(200).send({
              message: "Se pudo editar",
              producto: result,
            });
          }
        }
      );
    }
  },
};

module.exports = controller;
