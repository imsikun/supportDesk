const express = require('express');
const router = express.Router();

const {
  getTickets,
  getTicket,
  createTicket,
  deletTicket,
  updateTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

//Re route into note router
const noteRouter = require('./noteRoutes');

router.use('/:ticketId/notes', noteRouter);

// in this line we are doing both GET and POST request of the tickets
router.route('/').get(protect, getTickets).post(protect, createTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deletTicket)
  .put(protect, updateTicket);

module.exports = router;
