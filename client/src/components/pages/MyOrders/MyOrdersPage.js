import React, { useState, useEffect } from 'react';
import { Button, Container, Spinner, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import { API_URL, IMAGES_URL } from '../../../config';
import styles from './MyOrdersPage.module.scss';
import { FaEye, FaRegTrashAlt, FaLocationArrow } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const navigate = useNavigate();

  const ads = useSelector((state) => getAllAds(state));

  useEffect(() => {
    fetch(`${API_URL}api/reservations/user`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [reloadFlag]);

  const getAdData = (adId) => {
    const ad = ads.find((ad) => ad._id === adId);
    return ad ? (
      <div className={styles.adInfo}>
        <img src={`${IMAGES_URL}/${ad.image}`} alt={ad.title} />
        <p>{ad.title}</p>
        <p>
          <FaLocationArrow className="m-2" /> {ad.location}
        </p>
      </div>
    ) : null;
  };

  const handleDelete = (reservationId) => {
    setSelectedReservationId(reservationId); 
    setShowModal(true); 
  };

  const confirmDelete = () => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}api/reservations/${selectedReservationId}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        
        if (res.status !== 204) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log('Data:', data);
        } else {
          setReloadFlag(!reloadFlag);
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
    setShowModal(false); 
  };

  return (
    <Container>
      <h1>Your orders</h1>
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : error ? (
        <div>Error: {error}</div>
      ) : reservations.length === 0 ? (
        <h2>No reservations found.</h2>
      ) : (
        <div className={styles.ordersContainer}>
          {reservations.map((reservation) => (
            <div key={reservation._id} className={styles.orderItem}>
              {getAdData(reservation.adInfo)}
              <div className={styles.orderInfo}>
                <Button
                  variant="outline-dark"
                  onClick={() => navigate(`/ad/${reservation.adInfo}`)}
                >
                  <FaEye className={styles.svgIcon} > See more </FaEye>
                </Button>
                <p>Date: {reservation.reservationDate}</p>
                <p>Time: {reservation.reservationTime}</p>
                <Button
                  variant="outline-dark"
                  onClick={() => navigate(`/my-orders/edit/${reservation._id}`)}
                >
                  Edit reservation
                </Button>

                <Button
                  variant="outline-dark"
                  onClick={() => handleDelete(reservation._id)}
                >
                  <FaRegTrashAlt className={styles.svgIcon} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this reservation?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyOrders;
