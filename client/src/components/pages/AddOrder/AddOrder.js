import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import styles from './AddOrder.module.scss';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    reservationDate: '',
    reservationTime: '',
    paymentMethod: 'cash',
    adInfo: id ? id : '',
  });

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
      const response = await fetch(`${API_URL}api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error sending reservation data');
      }
      
      // const data = await response.json();
    } catch (error) {
      console.error('Error:', error.message);
    }
    navigate('/my-orders');
  };

  return (
    <Container className={styles.orderContainer}>
      <h1 className={styles.orderTitle}>Order details</h1>
      <Form className={styles.orderForm} onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label className={styles.orderLabel}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            className={styles.orderInput}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="comment">
          <Form.Label className={styles.orderLabel}>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment ( optional )"
            name="comment"
            className={styles.orderInput}
            value={formData.comment}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="reservationDate">
          <Form.Label className={styles.orderLabel}>Date</Form.Label>
          <Form.Control
            type="date"
            name="reservationDate"
            className={styles.orderInput}
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="reservationTime">
          <Form.Label className={styles.orderLabel}>Hour</Form.Label>
          <Form.Control
            type="time"
            name="reservationTime"
            className={styles.orderInput}
            value={formData.reservationTime}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="paymentMethod">
          <Form.Label className={styles.orderLabel}>Payment Method</Form.Label>
          <Form.Control
            as="select"
            name="paymentMethod"
            className={styles.orderInput}
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="paypal">Paypal</option>
            <option value="blik">Blik</option>
          </Form.Control>
        </Form.Group>

        <Button
          variant="outline-dark"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Order;
