const Reservation = require('../models/Reservation.model');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas pobierania rezerwacji.' });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res
        .status(404)
        .json({ error: 'Rezerwacja nie została znaleziona.' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas pobierania rezerwacji.' });
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
        error: 'Wystąpił błąd podczas pobierania rezerwacji użytkownika 123.',
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
    const newReservation = await Reservation.create({
      name,
      comment,
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
      .json({ error: 'Wystąpił błąd podczas tworzenia rezerwacji.' });
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
        .json({ error: 'Rezerwacja nie została znaleziona.' });
    }
    if (reservation.userInfo.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Brak uprawnień do usunięcia tej rezerwacji.' });
    }
    await Reservation.findByIdAndDelete(reservationId);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas usuwania rezerwacji.' });
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
      reservationTimeEnd,
      paymentMethod,
      adInfo,
    } = req.body;
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res
        .status(404)
        .json({ error: 'Rezerwacja nie została znaleziona.' });
    }
    if (reservation.userInfo.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Brak uprawnień do edycji tej rezerwacji.' });
    }
    await Reservation.findByIdAndUpdate(reservationId, {
      name,
      comment,
      reservationDate,
      reservationTimeEnd,
      paymentMethod,
      adInfo,
    });
    res.status(200).json({ message: 'Rezerwacja została zaktualizowana.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas aktualizacji rezerwacji.' });
  }
};
