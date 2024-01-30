import { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import styles from './EditOrder.module.scss';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    reservationDate: '',
    reservationTime: '',
    paymentMethod: 'cash',
    adInfo: id ? id : '',
  });

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`${API_URL}api/reservations/id/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reservation data');
        }

        const reservationData = await response.json();
        setFormData({
          name: reservationData.name,
          comment: reservationData.comment,
          reservationDate: reservationData.reservationDate,
          reservationTime: reservationData.reservationTime,
          paymentMethod: reservationData.paymentMethod,
          adInfo: reservationData.adInfo,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    if (id) {
      fetchReservation();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error sending reservation data');
      }

      // const data = await response.json();
      // console.log('Reservation data:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
    navigate('/my-orders');
  };

  if (loading) {
    return <Spinner animation="border" role="status"></Spinner>;
  }

  return (
    <Container>
      <h1 className={styles.orderTitle}>Order details</h1>
      <Form className={styles.orderForm} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.orderInput}
          />
        </Form.Group>

        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className={styles.orderInput}
          />
        </Form.Group>

        <Form.Group controlId="reservationDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
            className={styles.orderInput}
          />
        </Form.Group>

        <Form.Group controlId="reservationTime">
          <Form.Label>Hour</Form.Label>
          <Form.Control
            type="time"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
            className={styles.orderInput}
          />
        </Form.Group>

        <Form.Group controlId="paymentMethod">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            as="select"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className={styles.orderInput}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="paypal">Paypal</option>
            <option value="blik">Blik</option>
          </Form.Control>
        </Form.Group>

        <Button variant="outline-dark" type="submit">
          Submit changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditOrder;
