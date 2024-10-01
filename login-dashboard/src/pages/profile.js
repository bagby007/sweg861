import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [id, setId] = useState(null);
  const [firstName, setFirst] = useState(null);
  const [lastName, setLast] = useState(null);

  // Function to fetch user ID based on email
  const getUserID = async (email) => {
    try {
      const response = await fetch(`http://localhost:3080/user-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (data) {
        setId(data.userID);
        setFirst(data.firstName);
        setLast(data.lastName);

      } else {
        console.error('User ID not found.');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  useEffect(() => {
    if (email && !id) {
      getUserID(email);
    }
  }, [email]);

  const onProfileClick = () => {
    if (id) {
      navigate('/settings', { state: { email, id } });
    } else {
      window.alert('User ID not found.');
    }
  };

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>User Profile</div>
      </div>
      <div>Email: {email}</div>
      <div>First Name: {firstName ? firstName : 'Not Set'}</div>
      <div>Last Name: {lastName ? lastName : 'Not Set'}</div>
      <div>UserID: {id ? id : 'Loading...'}</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onProfileClick}
          value="Update Profile"
          disabled={!id}
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={() => navigate('/')}
          value="Log Out"
        />
      </div>
    </div>
  );
};

export default Profile;
