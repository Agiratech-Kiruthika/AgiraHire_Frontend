import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', {
        applicantId: 1, // Replace with actual applicant ID
        interviewerId: 1, // Replace with actual interviewer ID
        comments: newFeedback,
        ratings: newRating,
        overallComments: '', // You may add a field for overall comments as well
      });
      setFeedbacks([...feedbacks, response.data]);
      setNewFeedback('');
      setNewRating(0);
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Enter your feedback"
          required
        />
        <input
          type="number"
          value={newRating}
          onChange={(e) => setNewRating(parseInt(e.target.value))}
          placeholder="Enter rating (0-5)"
          min="0"
          max="5"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Feedbacks:</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.feedbackId}>
            <div>Applicant ID: {feedback.applicantId}</div>
            <div>Interviewer ID: {feedback.interviewerId}</div>
            <div>Comments: {feedback.comments}</div>
            <div>Ratings: {feedback.ratings}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackForm;
