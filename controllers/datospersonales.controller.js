const express = require('express');
const db = require('../models');

const DatosPersonalesModel = db.DatosPersonalesSchema;

exports.create = (req, res)=>{
// validar petición
if (!req.body.apellidos) {
    res.status(400).send({ message: "complete los campos" });
    return;
  }
  // Create a Tutorial
  const datPersonal = new DatosPersonalesModel({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    trabaja: req.body.trabaja ? req.body.trabaja : false
  });
  // Save Tutorial in the database
  datPersonal
    .save(datPersonal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error al guardar datos."
      });
    });
}
// buscar por apellido
exports.findAll = (req, res) =>{
    const apellidos = req.query.apellidos;
    var condition = apellidos ? { apellidos: { $regex: new RegExp(apellidos), $options: "i" } } : {};
    DatosPersonalesModel.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al buscar datos"
        });
      });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    DatosPersonalesModel.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No hay datos con id seleccionado " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "error al consultar id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Debe agregar campos para poder actualizar"
      });
    }
    const id = req.params.id;
    DatosPersonalesModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar el documento con id=${id}, no se tiene acceso al servidor`
          });
        } else res.send({ message: "Datos almacenados correctamente." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar los datos id=" + id
        });
      });
  };
  
exports.delete = (req, res) => {
    const id = req.params.id;
    DatosPersonalesModel.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se puede eliminar el documento con id=${id}. No se encuentra el acceso!`
          });
        } else {
          res.send({
            message: "Dato personal eliminado correctamente!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al intentar eliminar el documento con id id=" + id
        });
      });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  DatosPersonalesModel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Datos personales eliminados correctamente!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error a eliminar todos los registros."
      });
    });
};
// Find all published Tutorials
exports.findAllTrabajadores = (req, res) => {
  DatosPersonalesModel.find({ trabaja: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al intentar obtener todos los trabajadores."
      });
    });
};