const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const mongoose = require("mongoose");
// const redis = require('redis')

require("dotenv").config();
// Routes
const userRoute = require("./routes/UserRoutes");
const classRoute = require("./routes/ClassRoutes");
const mongoUser = require("./routes/MongoUserRoutes");
const client = require("./config/redis");
const app = express();
app.use(cors());
app.use(express.json());
// MySQL
try {
  const db = async () => {
    await sequelize.authenticate();
    console.log("SQL connection established");
  };
  db();
} catch (error) {
  console.log(error);
}

// MongoDB
const mongodb = mongoose.connection;
mongoose.connect(process.env.MONGO_URL);
mongoose.set({ strictQuery: true });
mongodb.on("error", (error) => console.log(error));
mongodb.once("open", () => {
  console.log("Mongo connection established");
});

try {
  const redis = async () => {
    await client.on('connect', () => {
      console.log('Redis connection established');
    })
  }
  redis();
} catch (error) {
  console.log(error.message);
}

// Redis
// client = redis.createClient();
// client.on("error", (err) => {
//   console.log("Error " + err);
// });

// client.on("connect", () => {
//   console.log("Redis ready to connect");
// });


app.use(express.json());
app.use("/mongouser", mongoUser);
app.use("/user", userRoute);
app.use("/class", classRoute);
app.listen(5000, () =>
  console.log("Service listening on http://localhost:5000")
);
