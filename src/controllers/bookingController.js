
const BookingService = require("../services/bookingSerivce");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");

//Create new booking
exports.createBooking = async (req, res) => {
  try {
    const createBooking = await BookingService.createBookingService(req.body);

    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Successful", data: createBooking });
  } catch (error) {
    return handleError(error, res);
  }
};

//Get single booking by ID
exports.getBookingById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const booking = await BookingService.getBookingByIdService(id);
      if (!booking) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Tour not found" });
      }
      return res.status(STATUS_CODE.OK).json({ message: "Successful", data: booking });
    } catch (error) {
      return handleError(error, res);
    }
  };
  
  //Get all bookings
  exports.getAllBookings = async (req, res) => {
    try {
      const getAllBookings = await BookingService.getAllBookingService();
      return res.status(STATUS_CODE.OK).json({
        message: "Successful",
        count: getAllBookings.length,
        data: getAllBookings,
      });
    } catch (error) {
      return handleError(error, res);
    }
  };