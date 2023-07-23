const Booking = require("../models/bookingModel");

exports.createBookingService = async (bookingData) => {
  const booking = new Booking(bookingData);
  await booking.save();

  return booking;
};

exports.getBookingByIdService = async (id) => {
    const getBooking = await Booking.findById(id);
    return getBooking;
  };

  exports.getAllBookingService = async () => {
    const bookings = await Booking.find();
    return bookings;
  };