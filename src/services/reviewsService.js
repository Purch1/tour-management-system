const Reviews = require("../models/reviewsModel");
const Tour = require("../models/tourModel");

exports.createUserService = async (tourId, reviewData) => {
  const newReview = new Reviews(reviewData);
  await newReview.save();

  const updateTourID = await Tour.findByIdAndUpdate(tourId, {
    $push: {
      reviews: newReview._id,
    },
  });

  return newReview;
};