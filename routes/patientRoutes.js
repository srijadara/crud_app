module.exports = app => {
    const patients = require("../controllers/patient.controller.js");
    var router = require("express").Router();
    // Create a new patient
    router.post("/", patients.create);
    // Retrieve all patient
    router.get("/", patients.findAll);
    // Retrieve all published patient
    router.get("/published", patients.findAllPublished);
    // Retrieve a single patient with id
    router.get("/:id", patients.findOne);
    // Update a patient with id
    router.put("/:id", patients.update);
    // Delete a patient with id
    // router.delete("/:id", patient.delete);
    // Delete all patient
    // router.delete("/", patient.deleteAll);
    app.use('/api/patients', router);
};