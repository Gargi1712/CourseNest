import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoursePlayer.css';

const CoursePlayer = () => {
  const { id } = useParams();
   const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
   const [watched, setWatched] = useState({});

   const BASE_URL = process.env.REACT_APP_API_BASE_URL;



  useEffect(() => {
    const fetchVideos = async () => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    alert("Please login first.");
    navigate("/login"); 
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/course/${id}/videos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setVideos(res.data);
  } catch (err) {
    console.error("Failed to load videos:", err);
    alert("You must be logged in and have purchased this course.");
    navigate("/login"); 
  }
};

    fetchVideos();
  }, [id]);

    const toggleWatched = (videoId) => {
    setWatched((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  return (
    <div>
      <h2>Course Videos</h2>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        videos.map((video) => (
           <div key={video.id} className="video-item">
            <label>
              <input
                type="checkbox"
                checked={watched[video.id] || false}
                onChange={() => toggleWatched(video.id)}
              />
              <strong>{video.title}</strong>
            </label>
            <video width="500" controls src={video.video_url}></video>
          </div>
        ))
      )}
    </div>
  );
};

export default CoursePlayer;
