import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function Header(props) {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(5000); // Default radius in meters
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  let locations = [
    { "latitude": 28.6139, "longitude": 77.2090, "placeName": "New Delhi, Delhi" },
    { "latitude": 19.0760, "longitude": 72.8777, "placeName": "Mumbai, Maharashtra" },
    { "latitude": 13.0827, "longitude": 80.2707, "placeName": "Chennai, Tamil Nadu" },
    { "latitude": 22.5726, "longitude": 88.3639, "placeName": "Kolkata, West Bengal" },
    { "latitude": 12.9716, "longitude": 77.5946, "placeName": "Bengaluru, Karnataka" },
    { "latitude": 25.5941, "longitude": 85.1376, "placeName": "Patna, Bihar" },
    { "latitude": 23.0225, "longitude": 72.5714, "placeName": "Ahmedabad, Gujarat" },
    { "latitude": 26.9124, "longitude": 75.7873, "placeName": "Jaipur, Rajasthan" },
    { "latitude": 21.1458, "longitude": 79.0882, "placeName": "Nagpur, Maharashtra" },
    { "latitude": 17.3850, "longitude": 78.4867, "placeName": "Hyderabad, Telangana" },
    { "latitude": 18.5204, "longitude": 73.8567, "placeName": "Pune, Maharashtra" },
    { "latitude": 21.7679, "longitude": 78.8718, "placeName": "Bhopal, Madhya Pradesh" },
    { "latitude": 26.8467, "longitude": 80.9462, "placeName": "Lucknow, Uttar Pradesh" },
    { "latitude": 31.1048, "longitude": 77.1734, "placeName": "Shimla, Himachal Pradesh" },
    { "latitude": 29.9457, "longitude": 78.1642, "placeName": "Dehradun, Uttarakhand" },
    { "latitude": 34.0837, "longitude": 74.7973, "placeName": "Srinagar, Jammu and Kashmir" },
    { "latitude": 23.1765, "longitude": 75.7885, "placeName": "Ujjain, Madhya Pradesh" },
    { "latitude": 27.1767, "longitude": 78.0081, "placeName": "Agra, Uttar Pradesh" },
    { "latitude": 24.5854, "longitude": 73.7125, "placeName": "Udaipur, Rajasthan" },
    { "latitude": 15.2993, "longitude": 74.1240, "placeName": "Panaji, Goa" },
    { "latitude": 30.7333, "longitude": 76.7794, "placeName": "Chandigarh, Punjab/Haryana" },
    { "latitude": 11.0168, "longitude": 76.9558, "placeName": "Coimbatore, Tamil Nadu" },
    { "latitude": 9.9312, "longitude": 76.2673, "placeName": "Kochi, Kerala" },
    { "latitude": 8.5241, "longitude": 76.9366, "placeName": "Thiruvananthapuram, Kerala" },
    { "latitude": 21.2787, "longitude": 81.8661, "placeName": "Raipur, Chhattisgarh" },
    { "latitude": 22.3072, "longitude": 73.1812, "placeName": "Vadodara, Gujarat" },
    { "latitude": 25.3176, "longitude": 82.9739, "placeName": "Varanasi, Uttar Pradesh" },
    { "latitude": 21.1702, "longitude": 72.8311, "placeName": "Surat, Gujarat" },
    { "latitude": 28.4089, "longitude": 77.3178, "placeName": "Gurgaon, Haryana" },
    { "latitude": 17.6868, "longitude": 83.2185, "placeName": "Visakhapatnam, Andhra Pradesh" },
    { "latitude": 18.1124, "longitude": 79.0193, "placeName": "Warangal, Telangana" },
    { "latitude": 15.8281, "longitude": 78.0373, "placeName": "Tirupati, Andhra Pradesh" },
    { "latitude": 24.1595, "longitude": 75.8041, "placeName": "Kota, Rajasthan" },
    { "latitude": 27.5534, "longitude": 76.6348, "placeName": "Alwar, Rajasthan" },
    { "latitude": 20.2961, "longitude": 85.8245, "placeName": "Bhubaneswar, Odisha" },
    { "latitude": 19.9975, "longitude": 73.7898, "placeName": "Nashik, Maharashtra" },
    { "latitude": 12.9141, "longitude": 74.8560, "placeName": "Mangalore, Karnataka" },
    { "latitude": 10.7867, "longitude": 78.7047, "placeName": "Tiruchirappalli, Tamil Nadu" },
    { "latitude": 13.6288, "longitude": 79.4192, "placeName": "Chittoor, Andhra Pradesh" },
    { "latitude": 20.9374, "longitude": 77.7796, "placeName": "Amravati, Maharashtra" },
    { "latitude": 26.2389, "longitude": 73.0243, "placeName": "Jodhpur, Rajasthan" },
    { "latitude": 13.3392, "longitude": 77.1136, "placeName": "Chikkaballapur, Karnataka" },
    { "latitude": 22.0954, "longitude": 82.1411, "placeName": "Bilaspur, Chhattisgarh" },
    { "latitude": 27.2144, "longitude": 77.7960, "placeName": "Mathura, Uttar Pradesh" },
    { "latitude": 32.7266, "longitude": 74.8570, "placeName": "Jammu, Jammu and Kashmir" },
    { "latitude": 16.3067, "longitude": 80.4365, "placeName": "Guntur, Andhra Pradesh" },
    { "latitude": 23.3441, "longitude": 85.3096, "placeName": "Ranchi, Jharkhand" },
    { "latitude": 23.3636, "longitude": 85.3376, "placeName": "Dhanbad, Jharkhand" },
    { "latitude": 24.4828, "longitude": 88.3336, "placeName": "Malda, West Bengal" },
    { "latitude": 22.6587, "longitude": 88.3372, "placeName": "Howrah, West Bengal" }
];


  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    localStorage.setItem('userLoc', e.target.value);
  };

  const handleSearchByLocation = () => {
    const [lat, lon] = location.split(',');
    axios.get('http://localhost:4000/search-by-location', {
      params: {
        latitude: lat,
        longitude: lon,
        maxDistance: radius
      }
    })
    .then(response => {
      props.handleLocationSearch(response.data.products); // Pass the products to Home component
    })
    .catch(error => {
      console.error('Error searching by location:', error);
    });
  };

  // Check if user is logged in using localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <div>
      <div className='header-container d-flex justify-content-between align-items-center'>
        <div className="header d-flex align-items-center">
          <Link to="/" className='links me-3'>Home</Link>
          <select value={location} onChange={handleLocationChange} className="form-select form-select-sm me-3">
            {locations.map((item, index) => (
              <option key={index} value={`${item.latitude},${item.longitude}`}>
                {item.placeName}
              </option>
            ))}
          </select>
          <input 
            type="number" 
            placeholder='Radius (meters)' 
            className='form-control me-3' 
            value={radius} 
            onChange={(e) => setRadius(e.target.value)} 
          />
          {isLoggedIn && (
            <div className="input-group">
              <input
                type="text"
                placeholder='Search for your products'
                className='search form-control'
                value={props.search}
                onChange={(e) => props.handlesearch(e.target.value)}
              />
              <button className='search-btn btn btn-dark' onClick={props.handleclick}><FaSearch /></button>
            </div>
          )}
          <button className="btn btn-secondary" onClick={handleSearchByLocation}>Search by Location</button>
        </div>
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <Link to='/add-product'>
                <button className="logout-btn btn btn-dark me-2">Add Product</button>
              </Link>
              <Link to='/liked-products'>
                <button className="logout-btn btn btn-dark me-2">Wishlist</button>
              </Link>
              <button onClick={handleLogout} className='logout-btn btn btn-dark'>LOGOUT</button>
            </>
          ) : (
            <button className='logout-btn btn btn-dark'>
              <Link to="/login" className='link-class text-white'>LOGIN</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
