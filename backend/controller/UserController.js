const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");
const model = require("../models/index");
const UserMongo = require("../models/mongo/user_mongo");
const client = require("../config/redis");
const User = model.User;
const UserClass = model.UserClass;

// SQL Based
exports.getUser = async (req, res) => {
  try {
    client.get('usersql', async (err, user) => {
      if(err) return res.status(500).json(err);
      if(user) {
        return res.json(JSON.parse(user))
      } else {
        const data = await sequelize.query(
          "SELECT users.id, users.email ,users.firstName, users.lastName, classes.`name` FROM classes INNER JOIN userclasses ON classes.id = userclasses.classId INNER JOIN users ON users.id = userclasses.userId ORDER BY users.id",
          { type: QueryTypes.SELECT }
        );
        client.setex("usersql", 3600, JSON.stringify(data))
        return res.json(data);
      }
    })
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sequelize.query(
      `SELECT users.firstName, users.email ,users.lastName, classes.id as class_id, classes.name, users.id as user_id FROM classes INNER JOIN userclasses ON classes.id = userclasses.classId INNER JOIN users ON users.id = userclasses.userId WHERE users.id = ${id}`,
      { type: QueryTypes.SELECT }
    );
    if (data.length <= 0)
      return res.status(404).json({ message: "No user found" });
    return res.json(data).status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, classId } = req.body;
  try {
    const data = await User.create({
      firstName,
      lastName,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const classUser = await UserClass.create({
      userId: data.id,
      classId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.json({ message: "Data created successfully" }).status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const data = await User.findByPk(id);
    if (!data)
      return res
        .status(404)
        .json({ message: "No user with matching id found" });
    await data.update({
      firstName,
      lastName,
      email,
    });
    return res.json({ message: "Data updated successfully" }).status(200);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id);
    if (!data)
      return res
        .status(404)
        .json({ message: "No user with matching id found" });
    await data.destroy();
    return res
      .json({ message: "Data deleted successfully", data: data })
      .status(200);
  } catch (error) {
    console.log(error);
  }
};

// Mongo Based
exports.getUserMongoose = async (req, res) => {
  try {
    const user = await UserMongo.find();
    client.get("users", async (err, data) => {
      if (err) return res.status(500).json(err);
      if (data) {
        return res.json(JSON.parse(data));
      } else {
        client.setex("users", 3600, JSON.stringify(user));
        res.json(user);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByIdMongoose = async (req, res) => {
  try {
    const user = await UserMongo.findById({ _id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.postUserMongoose = async (req, res) => {
  const { name, email, classname } = req.body;
  const user = new UserMongo({
    name,
    email,
    class: classname,
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser, message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editUserMongoose = async (req, res) => {
  const { name, email, classname } = req.body;
  try {
    const user = await UserMongo.findByIdAndUpdate(
      { _id: req.params.id },
      { name, email, class: classname }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUserMongoose = async (req, res) => {
  try {
    await UserMongo.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
