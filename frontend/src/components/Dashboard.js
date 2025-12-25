import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentAPI } from '../services/api';

const Dashboard = () => {
  const [profile, setProfile] = useState({ username: '', email: '', balance: 0 });
  const [formData, setFormData] = useState({ receiverUsername: '', amount: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    console.log('Fetching profile');
    try {
      const res = await paymentAPI.getProfile();
      console.log('Profile data:', res.data);
      setProfile(res.data);
    } catch (err) {
      console.log('Error fetching profile:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await paymentAPI.sendPayment(formData);
      setMessage('Payment sent successfully');
      setProfile({ ...profile, balance: res.data.newBalance });
      setFormData({ receiverUsername: '', amount: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Payment failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Balance: ${profile.balance}</p>
      <button onClick={handleLogout}>Logout</button>
      <h3>Send Payment</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="receiverUsername"
          placeholder="Receiver Username"
          value={formData.receiverUsername}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;