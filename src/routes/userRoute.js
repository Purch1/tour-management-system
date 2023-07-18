const express = require("express");
const router = express.Router();
const {
  updateUser,
  getAllUser,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");

router.put("/:id", updateUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
