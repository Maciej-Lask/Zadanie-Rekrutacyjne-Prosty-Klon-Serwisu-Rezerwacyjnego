const Reservation = require('../models/Reservation.model');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error while getting all reservations' });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res
        .status(404)
        .json({ error: 'No reservation found with that ID' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error while getting reservation' });
  }
};

exports.getAllUserReservations = async (req, res) => {
  try {
    const userId = req.session.userId;
    const reservations = await Reservation.find({ userInfo: userId });
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'Error while getting all user reservations',
      });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const {
      name,
      comment,
      reservationDate,
      reservationTime,
      paymentMethod,
      adInfo,
    } = req.body;
    const userId = req.session.userId;
    const commentToSave = comment ? comment : null;
    const newReservation = await Reservation.create({
      name,
      comment: commentToSave,
      reservationDate,
      reservationTime,
      paymentMethod,
      adInfo,
      userInfo: userId,
    });
    res.status(201).json(newReservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error while creating reservation' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.session.userId;
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res
        .status(404)
        .json({ error: 'Not found' });
    }
    if (reservation.userInfo.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized access' });
    }
    await Reservation.findByIdAndDelete(reservationId);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error while deleting reservation' });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userId = req.session.userId;
    const {
      name,
      comment,
      reservationDate,
      reservationTime,
      paymentMethod,
      adInfo,
    } = req.body;
    const reservation = await Reservation.findById(reservationId);
    const commentToSave = comment ? comment : null;
    if (!reservation) {
      return res
        .status(404)
        .json({ error: 'No reservation found with that ID' });
    }
    if (reservation.userInfo.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized access' });
    }
    await Reservation.findByIdAndUpdate(reservationId, {
      name,
      comment: commentToSave,
      reservationDate,
      reservationTime,
      paymentMethod,
      adInfo,
    });
    res.status(200).json({ message: 'Reservation updated' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error while updating reservation' });
  }
};
