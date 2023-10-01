import React, { useState } from "react";
import axios from "axios";
import { useParams ,useNavigate} from 'react-router-dom';
import './ReviewForm.css';


function MovieReviewForm() {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); // Initialize with default rating
  const { movieId } = useParams();
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const userId = localStorage.getItem("userId");
  console.log(`User ID: ${userId}, Movie ID: ${movieId}`);

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    

    try {
      // Send the review and rating data to your backend API
      const reviewData = {
        movieId: movieId, // Make sure movieId and userId are defined
        userId: userId,
        review: reviewText,
        rating: rating,
      };
  console.log(reviewData)
      // Send the review data to your backend API here using Axios
      const response = await axios.post('http://localhost:5000/api/reviews/', reviewData);
  
      // Check if the review was successfully added on the server
      if (response.status === 201) {
        // Clear the form after successful submission
        setReviewText('');
        setRating(0);
  
        // Optionally, you can show a success message to the user
        alert('Review submitted successfully!');
      }
    } catch (error) {
      // Handle Axios errors
      if (error.response) {
        // Server responded with an error (e.g., 400 Bad Request)
        console.error(error.response.data);
        alert('Error submitting review: ' + error.response.data.message);
      } else {
        // Network error or other unexpected error
        console.error('An error occurred:', error.message);
        alert('An error occurred while submitting the review.');
      }
    }
  };

  return (
    <div>
  {hasUserReviewed ? (
    <p>You have already reviewed this movie.</p>
  ) : (
    <div className="form-container">
 
  <form onSubmit={handleSubmit}>
  <h2 className="form-header">Write a Review</h2>
    <div className="form-group">
      <label>Review:</label>
      <textarea
        className="form-control"
        value={reviewText}
        onChange={handleReviewTextChange}
        rows={4}
        cols={50}
      />
    </div>
    <div className="form-group">
      <label>Rating:</label>
      <select className="form-control" value={rating} onChange={handleRatingChange}>
        <option value={0}>Select Rating</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
    <button type="submit" className="submit-button">
      Submit Review
    </button>
  </form>
</div>
  )}
</div>
  );
}

export default MovieReviewForm;