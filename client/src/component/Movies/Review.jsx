import React from 'react';
import axios from 'axios';

const Review = ({review,onDelete,userId  }) => {


    const { _id, user, rating } = review;
    const isCurrentUserReview = user === userId; //
    console.log('id is',_id)
    console.log('user',user)
    console.log(review)
    console.log(rating)
  // Convert the rating to stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < review.rating; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return stars;
  };

  const handleDeleteClick = () => {
   
    // Display a confirmation dialog to confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete this review?');

    
      // Send a DELETE request to delete the review
      if (confirmed) {
        onDelete(review._id);
      }
    
  };

  return (
    <div className="review-box">
      <div className="review-stars">{renderStars()}</div>
      <p>{review.review}</p>
      <p>Reviewed by: {review.userName}</p>
      {isCurrentUserReview && (
        <button onClick={() => onDelete(_id)}>DeleteReview</button>
     )} 
      
    </div>
  );
};

export default Review;