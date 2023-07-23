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
    const {title, city } = req.body
    
    const updatedTour = await TourService.updateTourService(id, { title, city});
    return res
      .status(STATUS_CODE.OK)
      .json({ message: "Successful", data: updatedTour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getAllTour = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const getAllTours = await TourService.getAllTourService(page);
    return res.status(STATUS_CODE.OK).json({
      message: "Successful",
      count: getAllTours.length,
      data: getAllTours,
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
    return res.status(STATUS_CODE.OK).json({ message: "Successful", tour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.searchTour = async (req, res) => {
  try {
    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    const tour = await TourService.searchTourService(
      city,
      distance,
      maxGroupSize
    );
    return res.status(STATUS_CODE.OK).json({ message: "Successful", tour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.featuredTour = async (req, res) => {
  try {
    const tour = await TourService.searchFeaturedTourService();
    return res
      .status(STATUS_CODE.OK)
      .json({ message: "Successful", count: tour.length, data: tour });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getTourCount = async (req, res) => {
  try {
    const getTourCount = await TourService.getTourCountService();
    return res
      .status(STATUS_CODE.OK)
      .json({ message: "Successful", data: getTourCount });
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
