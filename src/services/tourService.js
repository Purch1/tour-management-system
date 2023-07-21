const Tour = require("../models/tourModel");
const Review = require("../models/reviewsModel");

(exports.createTourService = async (tourData) => {
  const tour = new Tour(tourData);
  await tour.save();
  return tour;
}),
  (exports.updateTourService = async (id, tourData) => {
    const updateTour = await Tour.findByIdAndUpdate(id, tourData, {
      new: true,
    });
    await updateTour.save();
    return updateTour;
  });

exports.getAllTourService = async (page = 0) => {
  const itemsPerPage = 8;
  const skipValue = page * itemsPerPage;
  const getAllTour = await Tour.find({})
    .populate("reviews")
    .skip(skipValue)
    .limit(itemsPerPage);
  return getAllTour;
};

exports.getTourService = async (id) => {
  const getTour = await Tour.findById(id).populate("reviews");
  return getTour;
};

exports.searchTourService = async (city, distance, maxGroupSize) => {
  const searchTour = await Tour.find({
    city,
    distance: { $gte: distance },
    maxGroupSize: { $gte: maxGroupSize },
  }).populate("reviews");
  return searchTour;
};

exports.searchFeaturedTourService = async () => {
  const featuredTour = await Tour.find({ featured: true })
    .populate("reviews")
    .limit(4);
  return featuredTour;
};

exports.getTourCountService = async () => {
  const getTourCount = await Tour.estimatedDocumentCount().limit(4);
  return getTourCount;
};

exports.deleteTourService = async (id) => {
  const getTour = await Tour.findByIdAndDelete(id);
  return getTour;
};
