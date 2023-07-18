const Tour = require("../models/tourModel");

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

exports.getAllTourService = async (page) => {
  const getAllTour = await Tour.find()
    .skip(page * 4)
    .limit(4);
  return getAllTour;
};

exports.getTourService = async (id) => {
  const getTour = await Tour.findById(id);
  return getTour;
};

exports.searchTourService = async (city, distance, maxGroupSize) => {
  const searchTour = await Tour.find({
    city,
    distance: { $gte: distance },
    maxGroupSize: { $gte: maxGroupSize },
  });
  return searchTour;
};

exports.searchFeaturedTourService = async () => {
    const featuredTour = await Tour.find({ featured:true })
    .limit(4);
    return featuredTour;
  };

  exports.getTourCountService = async () => {
    const getTourCount = await Tour.estimatedDocumentCount()
    .limit(4);
    return getTourCount;
  };

exports.deleteTourService = async (id) => {
  const getTour = await Tour.findByIdAndDelete(id);
  return getTour;
};
