import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ NEW
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [method, setMethod] = useState('card');

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("You must be logged in to access this page.");
    navigate('/login');
    return;
  }

  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
    if (decoded.exp * 1000 < Date.now()) {
      alert("Session expired. Please login again.");
      localStorage.removeItem('token');
      navigate('/login');
    }
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem('token');
    navigate('/login');
  }
}, [navigate]);



  const handleConfirmPayment = async () => {
    let isValid = false;

    if (method === 'card') {
      const cardNumber = document.querySelector('input[placeholder="Card Number"]').value.trim();
      const nameOnCard = document.querySelector('input[placeholder="Name on Card"]').value.trim();
      const expiry = document.querySelector('input[placeholder="MM/YY"]').value.trim();
      const cvv = document.querySelector('input[placeholder="CVV"]').value.trim();

      if (!cardNumber || !nameOnCard || !expiry || !cvv) {
        alert('Please fill in all card details');
        return;
      }
      isValid = true;
    }

    else if (method === 'upi') {
      const upi = document.querySelector('input[placeholder*="UPI"]').value.trim();
      if (!upi) {
        alert('Please enter UPI ID');
        return;
      }
      isValid = true;
    }

    else if (method === 'gpay') {
      const phone = document.querySelector('input[placeholder*="Mobile Number"]').value.trim();
      if (!phone) {
        alert('Please enter mobile number');
        return;
      }
      isValid = true;
    }

    else if (method === 'netbanking') {
      const bank = document.querySelector('select').value;
      if (bank === 'Select your bank') {
        alert('Please select your bank');
        return;
      }
      isValid = true;
    }

  if (isValid) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('You must be logged in to make a payment.');
    navigate('/login');
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/payment', {
      courseId: course.id,
        paymentMethod: method, 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(`✅ Payment successful for "${course.title}" using ${method.toUpperCase()}`);
    navigate('/my-courses');
  } catch (err) {
     if (err.response?.status === 403 || err.response?.status === 401) {
        alert('Session expired or unauthorized. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('❌ Payment error:', err.response?.data || err.message);
        alert(err.response?.data?.message || '❌ Failed to record payment. Try again.');
      }
    }
}

  };

  if (!course) {
    return <p>No course selected. Go back to <a href="/">home</a>.</p>;
  }

  return (
    <div className="payment-wrapper">
      <h2>Complete Your Purchase</h2>

      <div className="payment-container">
        <div className="payment-left">
          <h3>Select Payment Method</h3>
          <div className="tabs">
            {['card', 'upi', 'gpay', 'netbanking'].map(opt => (
              <button
                key={opt}
                className={method === opt ? 'active' : ''}
                onClick={() => setMethod(opt)}
              >
                {opt === 'card' && 'Credit/Debit Card'}
                {opt === 'upi' && 'UPI'}
                {opt === 'gpay' && 'Google Pay / PhonePe / Paytm'}
                {opt === 'netbanking' && 'Net Banking'}
              </button>
            ))}
          </div>

          <div className="form-section">
            {method === 'card' && (
              <>
                <input placeholder="Card Number" />
                <input placeholder="Name on Card" />
                <div className="half-inputs">
                  <input placeholder="MM/YY" />
                  <input placeholder="CVV" />
                </div>
              </>
            )}

            {method === 'upi' && (
              <input placeholder="Enter UPI ID (e.g. name@bank)" />
            )}

            {method === 'gpay' && (
              <input placeholder="Enter Mobile Number linked with UPI" />
            )}

            {method === 'netbanking' && (
              <select>
                <option>Select your bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis Bank</option>
              </select>
            )}
          </div>

          <button className="pay-btn" onClick={handleConfirmPayment}>
            Pay Now
          </button>
        </div>

        <div className="payment-right">
          <h3>Order Summary</h3>
          <p><strong>Course:</strong> {course.title}</p>
          <p><strong>Price:</strong> ₹{course.price}</p>
          <p><strong>Payment Method:</strong> {method.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;