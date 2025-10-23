import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/courses');
        console.log('Courses received:', res.data);
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };
    fetchCourses();
  }, []);

  const openModal = (course) => {
    setSelectedCourse(course);
  };
  const closeModal = () => {
    setSelectedCourse(null);
  };
  const handlePayment = () => {
    navigate('/payment', { state: { course: selectedCourse } });
  };

   const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="home-container">
      <h2>Available Courses</h2>
       <input
        type="text"
        placeholder="Search for courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px' }}
      />
      <div className="course-list">
            {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => openModal(course)}
          >
            <h3>{course.title}</h3>
            <p>₹{course.price}</p>
          </div>
            ))
          ) : (
            <p>No courses match your search</p>
          )}
      </div>

      
      

      {selectedCourse && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <p><strong>Total Videos:</strong> {selectedCourse.total_videos}</p>
            <p><strong>Total Hours:</strong> {selectedCourse.hours}</p>
            <p><strong>Price:</strong> ₹{selectedCourse.price}</p>
            <button onClick={handlePayment}>Pay Now</button>
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
