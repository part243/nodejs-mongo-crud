
module.exports = app => {
    const DatosersonalesController = require("../controllers/datospersonales.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", 
        DatosersonalesController.create
    );
    // Retrieve all Tutorials
    router.get("/", DatosersonalesController.findAll);
    // Retrieve all published Tutorials
    router.get("/trabajadores", DatosersonalesController.findAllTrabajadores);
    // Retrieve a single Tutorial with id
    router.get("/:id", DatosersonalesController.findOne);
    // Update a Tutorial with id
    router.put("/:id", DatosersonalesController.update);
    // Delete a Tutorial with id
    router.delete("/:id", DatosersonalesController.delete);
    // Create a new Tutorial
    router.delete("/", DatosersonalesController.deleteAll);
    app.use('/api/datospersonales', router);
  };