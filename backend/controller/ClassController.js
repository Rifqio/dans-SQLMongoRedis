const sequelize = require("../config/database");
const model = require("../models/index");
const Class = model.Class;

exports.getClass = async (req, res) => {
  try {
    const classes = await Class.findAll();
    return res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
