const express = require("express");
const router = express.Router();
const {
  updateUser,
  getAllUser,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");

const {verifyUser, verifyAdmin}  = require('../middlewares/auth')

router.put("/:id", verifyUser, updateUser);
router.get("/", verifyAdmin, getAllUser);
router.get("/:id", verifyUser, getUserById);
router.delete("/:id", verifyAdmin, deleteUserById);

module.exports = router;
