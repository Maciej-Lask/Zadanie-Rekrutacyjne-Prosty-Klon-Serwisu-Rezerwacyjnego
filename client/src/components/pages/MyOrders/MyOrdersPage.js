import React, { useState, useEffect } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';
import { API_URL, IMAGES_URL } from '../../../config';
import styles from './MyOrdersPage.module.scss';
import { FaEye, FaRegTrashAlt, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ads = useSelector((state) => getAllAds(state));

  useEffect(() => {
    console.log('fetching data...');
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
  }, []);

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
   
  }
  const handleEdit = (reservationId) => {
    
  }
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
                as={Link}
                to={`/ad/${reservation.adInfo}`}
              >
                <FaEye className={styles.svgIcon} />
              </Button>
              <p>Date: {reservation.reservationDate}</p>
              <p>Time: {reservation.reservationTime}</p>
              <Button variant="outline-dark" onClick={handleEdit(reservation._id)}>Edit reservation</Button>
              <Button variant="outline-dark" onClick={handleDelete(reservation._id)}>
                <FaRegTrashAlt className={styles.svgIcon} />
              </Button>
            </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MyOrders;
