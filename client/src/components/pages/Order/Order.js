import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config';

const Order = () => {
  const { id } = useParams();

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
    console.log(formData);

    try {
      const response = await fetch(`${API_URL}api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas wysyłania rezerwacji.');
      }

      const data = await response.json();
      console.log('Rezerwacja została wysłana:', data);
    } catch (error) {
      console.error('Błąd:', error.message);
    }
  };

  return (
    <Container>
      <h1>Order details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="paypal">Paypal</option>
            <option value="blik">Blik</option>
          </Form.Control>
        </Form.Group>

        {/* Assuming you have a way to select adInfo and userInfo */}
        {/* You can use Form.Control as="select" for this */}
        {/* Make sure to update formData accordingly */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Order;
