const db = require("../models");
const patient = db.patient;
const Op = db.Sequelize.Op;

creating = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a patient
  const patient = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    walletAmount: req.body.walletAmount
  };
  // Save patient in the database
  patient.create(patient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the patient details."
      });
    });
};


findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  patient.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patient details."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  patient.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find patient with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving patient with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;
  patient.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "patient was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update patient with id=${id}. Maybe patient was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating patient with id=" + id
      });
    });
};


exports.findAllPublished = (req, res) => {
  patient.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patient details."
      });
    });
};


module.exports = {
  creating


}