import React from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <>
      <div className="review-card">
        <img
          src="https://alliance.site.drupaldisttest.cc.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"
          alt=""
          className="review-card-image"
        />
        <div className="review-card-content">
          <p className="review-card-name">{review.name}</p>
          <ReactStars {...options} />
          <span className="review-card-comment">{review.comment}</span>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
