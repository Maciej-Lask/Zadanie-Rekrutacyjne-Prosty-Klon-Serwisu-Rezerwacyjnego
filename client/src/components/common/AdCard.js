import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../config';
import { FaLocationArrow, FaEye } from 'react-icons/fa';

import styles from './AdCard.scss';

const AdCard = ({ ad }) => {
  return (
    <div className="root d-flex flex-column">
      
      <div className="product-card">
        <Link className="link" to={`/ad/${ad._id}`}>
          <img
            className="product-card-img"
            src={`${IMAGES_URL}/${ad.image}`}
            alt={ad.title}
          />
          <div className="product-card-info">
            <p className="product-text-title">{ad.title} </p>
            <p className="product-text-body">
              <FaLocationArrow className="m-2" />
              {ad.location}
            </p>
          </div>
          <div className="product-card-footer">
            <span className="product-text-title">${ad.price}</span>
            <div className="product-card-button">
              <a href={`/ad/${ad._id}`}>
              
                <FaEye className="product-svg-icon" />
              </a>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdCard;
