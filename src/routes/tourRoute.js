const express = require('express');
const router = express.Router();
const { createTour, updateTour, getAllTour, getTourById, deleteTourById} = require('../controllers/tourController');

router.post('/', createTour)
router.put('/:id', updateTour)
router.get('/', getAllTour)
router.get('/:id', getTourById)
router.delete('/:id', deleteTourById)

module.exports = router;
