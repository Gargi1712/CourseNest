import React from 'react';

const CourseCard = ({ title, instructor, price }) => {
  return (
    <div className="course-card">
      <img src="https://via.placeholder.com/200x120" alt="Course" />
      <h3>{title}</h3>
      <p>{instructor}</p>
      <strong>{price}</strong>
    </div>
  );
};

export default CourseCard;
