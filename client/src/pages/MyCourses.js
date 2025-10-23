import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/my-courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(res.data.purchasedCourses);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Your Purchased Courses</h2>
      {courses.length === 0 ? (
        <p>No course purchased.</p>
      ) : (
      courses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <video src={course.video_url} controls width="400" />
          <br />
          <button onClick={() => navigate(`/course/${course.id}`)}>
            Go to Course Page
          </button>
        </div>
      )))}
    </div>
  );
};

export default MyCourses;
