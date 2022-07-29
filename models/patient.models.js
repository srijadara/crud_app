module.exports = (sequelize, Sequelize) => {
    const patient = sequelize.define("patient", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return patient;
  };