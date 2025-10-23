import React from 'react';
import './About.css'; // optional styling

const About = () => {
  return (
    <div className="about-container">
      <p>
        CourseNest is a modern online learning platform where you can explore, purchase,
        and watch educational courses in tech, business, and more.
      </p>
      <p>
        Built using <strong>React</strong>, <strong>Node.js</strong>, and <strong>PostgreSQL</strong>,
        this app demonstrates a full-stack experience including user authentication, protected routes,
        payment simulation, and course playback.
      </p>
      <p>
        This is a student-built project intended for learning and portfolio demonstration.
      </p>
    </div>
  );
};

export default About;
