import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getAllAds } from '../../../redux/adsRedux';
import AdCard from '../../common/AdCard';


import './AdsSection.scss';

const AdsSection = () => {



  const ads = useSelector(getAllAds);

  return (
    <section className="trending-box">
      <Container>
        <h2 className="pt-5 text-center">Looking for unforgettable experiences?</h2>
        <Row>
          {ads.map((ad) => (
            <Col key={ad._id} xs={12} md={4} lg={3}>
              <AdCard ad={ad} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default AdsSection;