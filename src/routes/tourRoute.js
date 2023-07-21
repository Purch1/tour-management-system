const express = require("express");
const router = express.Router();
const {
  createTour,
  updateTour,
  getAllTour,
  getTourById,
  deleteTourById,
  searchTour,
  featuredTour,
  getTourCount,
} = require("../controllers/tourController");
const { verifyAdmin } = require('../utils/verifyToken')

router.post("/", createTour);
router.put("/:id", verifyAdmin, updateTour);
router.get("/", getAllTour);
router.get("/:id", getTourById);
router.get("/search/getTour", searchTour);
router.get("/search/featureTour", featuredTour);
router.get("/search/getTourCount", getTourCount);
router.delete("/:id", verifyAdmin, deleteTourById);

module.exports = router;
