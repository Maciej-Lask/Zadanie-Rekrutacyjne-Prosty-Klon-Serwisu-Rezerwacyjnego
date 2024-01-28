const express = require('express');
const router = express.Router();

const reservations = require('../controllers/reservations.controller.js');
const authMiddleware = require('../utils/authMiddleware');

router.get('/reservations', reservations.getAllReservations);

router.get('/reservations/id/:id', reservations.getReservationById);

router.get('/reservations/user', authMiddleware, reservations.getAllUserReservations);

router.post('/reservations', authMiddleware, reservations.createReservation);

router.delete('/reservations/:id', authMiddleware, reservations.deleteReservation);

router.put('/reservations/:id', authMiddleware, reservations.updateReservation);

module.exports = router;
