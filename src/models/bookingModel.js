const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
    },
    email: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: String,
      // required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
