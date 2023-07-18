const TourService = require("../services/tourService");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");

exports.createTour = async (req, res) => {
  try {
    const tour = await TourService.createTourService(req.body);
    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Created succesfully", data: tour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTour = await TourService.updateTourService(id, req.body);
    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Successful", data: updatedTour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getAllTour = async (req, res) => {
    
    try {
      const page = parseInt(req.query.page);
    const getAllTour = await TourService.getAllTourService(page);
    return res
      .status(STATUS_CODE.CREATED)
      .json({
        message: "Successful",
        count: getAllTour.length,
        data: getAllTour,
      });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await TourService.getTourService(id);
    if (!tour) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "Tour not found" });
    }
    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Successful", tour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.deleteTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await TourService.deleteTourService(id);
    if (!tour) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "Tour not found" });
    }
    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Tour deleted", tour });
  } catch (error) {
    return handleError(error, res);
  }
};
