import React from 'react';
import { Container, Card, Button, Spinner, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { json, useParams } from 'react-router-dom';
import { getAdById } from '../../../redux/adsRedux';
import { IMAGES_URL, API_URL } from '../../../config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAds } from '../../../redux/adsRedux';
import { useState } from 'react';
import styles from './Ad.module.scss';
import CommentSection from '../../features/CommentSection/CommentSection';

const Ad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const user = localStorage.getItem('user');
  let author = '';
  if (ad) {
    author = JSON.stringify(ad.sellerInfo.login);
  }
  const isAuthor = user === author;

  const [status, setStatus] = useState(null); // null, success, serverError, clientError, loginError, loading

  const handleDelete = () => {
    console.log('delete');
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}api/ads/${id}`, options)
      .then((res) => {
        console.log('Response:', res);
      })
      .then((res) => {
        if (res.status === 204) {
          setStatus('success');
          dispatch(fetchAds());
          setTimeout(() => navigate('/'), 3000);
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
        console.error('Fetch error:', err);
      });
  };

  return (
    <Container>
      {ad ? (
        <div>
          <h2 className="pt-5">{ad.title}</h2>
          <Row className={styles.ad}>
            <Col xs={12} md={6} lg={8}>
              <Card className="mt-4">
                <Card.Img src={`${IMAGES_URL}/${ad.image}`} alt={ad.title} />
                <Card.Body className="p-0">
                  {isAuthor && (
                    <>
                      <Link to={`/ad/edit/${ad._id}`}>
                        <Button variant="primary" className="mr-2">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="m-2"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col className={styles.info} xs={12} md={6} lg={4}>
              <h3 className="text-center p-3">{ad.title}</h3>
              <p>Location: {ad.location}</p>
              <p>Price: ${ad.price}</p>
              <p>Description: {ad.content}</p>
              <p>Seller: {ad.sellerInfo.login}</p>
              <Link to={`/order-details/${id}`}>
                <Button variant="outline-dark">Book a visit</Button>
              </Link>
            </Col>
            <CommentSection />
          </Row>
        </div>
      ) : (
        <Spinner
          color="primary"
          className="standard-box d-block me-auto ms-auto"
        />
      )}
    </Container>
  );
};

export default Ad;
