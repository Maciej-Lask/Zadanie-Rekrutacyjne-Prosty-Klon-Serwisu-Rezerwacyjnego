import React from 'react';
import styles from './Featured.module.scss';
import { getAllAds } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';
import { Row, Col, Carousel, Container } from 'react-bootstrap';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import AdCard from '../../common/AdCard';

const Featured = () => {
  const ads = useSelector(getAllAds);

  const selectedAds = ads.slice(0, 9);
  const chunkedAds = selectedAds.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);


  return (
    <Container className={styles.root}>
      <h1 className={styles.title}> Featured </h1>
      <Carousel
        indicators={false}
        interval={null}
        itemScope={true}
        prevIcon={<FaArrowAltCircleLeft className={styles.carouselIcon} />}
        nextIcon={<FaArrowAltCircleRight className={styles.carouselIcon} />}
        className={styles.carousel}
      >
        {chunkedAds.map((adsGroup, index) => (
          <Carousel.Item key={index}>
            <Row>
              {adsGroup.map((ad) => (
                <Col key={ad._id} xs={12} md={4}>
                  <AdCard className={styles.card} ad={ad} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Featured;
