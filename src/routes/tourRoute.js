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
const {verifyUser, verifyAdmin}  = require('../middlewares/auth')

router.post("/", verifyAdmin, createTour);
router.put("/:id", verifyAdmin, updateTour);
router.get("/", getAllTour);
router.get("/:id", getTourById);
router.delete("/:id", verifyAdmin, deleteTourById);

//Get  tour by search
router.get("/search/getTour", searchTour);
router.get("/search/featureTour", featuredTour);
router.get("/search/getTourCount", getTourCount);

module.exports = router;
