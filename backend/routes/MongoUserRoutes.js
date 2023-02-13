const router = require("express").Router();
const {
  getUserMongoose,
  postUserMongoose,
  editUserMongoose,
  deleteUserMongoose,
  getUserByIdMongoose,
} = require("../controller/UserController");

router.get("/", getUserMongoose);
router.get("/:id", getUserByIdMongoose);
router.post("/", postUserMongoose);
router.patch("/:id", editUserMongoose);
router.delete("/:id", deleteUserMongoose);
module.exports = router;
