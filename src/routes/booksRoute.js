const express = require("express");
const router = express.Router();
const { verifyUser, verifyAdmin } = require("../middlewares/auth");
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/bookingController");

router.post("/", verifyUser, createBooking);
router.get("/", verifyAdmin, getAllBookings);
router.get("/:id", verifyUser, getBookingById);

module.exports = router;
