
const ReviewService = require("../services/reviewsService");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");

exports.createReview = async (req, res) => {
  try {
    const { tourId } = req.params;
      const {username, reviewText, rating } = req.body; 

     // Check if the required fields are provided
     if (!username || !reviewText || !rating) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: "username, reviewText, and rating are required fields.",
      });
    }
    
    const createReview = await ReviewService.createUserService(tourId, req.body);

    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Successful", data: createReview });
  } catch (error) {
    return handleError(error, res);
  }
};