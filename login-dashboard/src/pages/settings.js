import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Settings = () => {
    const [newEmail, setEmail] = useState('');
    const [newPass, setPass] = useState('');
    const [newUser, setUsername] = useState('');
    const [newFirst, setFirst] = useState('');
    const [newLast, setLast] = useState('');
    const [newHome, setHome] = useState('');
    const [newJob, setOccupation] = useState('');
    const [newMajor, setMajor] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userError, setUserError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const id = location.state?.id;

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
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
                    setEmail(data.email || '');
                    setUsername(data.username || '');
                    setFirst(data.firstName || '');
                    setLast(data.lastName || '');
                    setHome(data.hometown || '');
                    setOccupation(data.occupation || '');
                    setMajor(data.major || '');
                } else {
                    console.error('User not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const onUpdateClick = () => {
        const updateData = {};
        let valid = true;

        // Validate and update fields only if changed
        if (newUser) {
            updateData.username = newUser;
        }
        
        // Validate email only if provided
        if (newEmail) {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newEmail)) {
                setEmailError('Invalid Email!');
                valid = false;
            } else {
                updateData.email = newEmail;
                setEmailError(''); // Reset error if valid
            }
        }

        // Validate password only if provided
        if (newPass) {
            if (newPass.length < 8) {
                setPasswordError('The password must be at least 8 characters long!');
                valid = false;
            } else {
                updateData.password = newPass;
                setPasswordError('');
            }
        }

        if (newFirst) updateData.firstName = newFirst;
        if (newLast) updateData.lastName = newLast;
        if (newHome) updateData.hometown = newHome;
        if (newJob) updateData.occupation = newJob;
        if (newMajor) updateData.major = newMajor;

        if (!valid || Object.keys(updateData).length === 0) {
            window.alert('No changes made or invalid inputs.');
            return;
        }

        updateData.userID = id;

        fetch(`http://localhost:3080/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'User profile updated successfully') {
                    window.alert('Profile updated successfully!');
                    navigate('/profile', { state: { email, id } });
                } else {
                    window.alert(data.message);
                }
            })
            .catch(() => {
                window.alert('Server error!');
            });
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Edit Profile</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Username</label>
                <input
                    placeholder="Enter new username"
                    value={newUser}
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{userError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Email</label>
                <input
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Password</label>
                <input
                    type="password"
                    placeholder="********"
                    value={newPass}
                    onChange={(ev) => setPass(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update First Name</label>
                <input
                    placeholder="Enter first name"
                    value={newFirst}
                    onChange={(ev) => setFirst(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Last Name</label>
                <input
                    placeholder="Enter last name"
                    value={newLast}
                    onChange={(ev) => setLast(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Hometown</label>
                <input
                    placeholder="Enter hometown"
                    value={newHome}
                    onChange={(ev) => setHome(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Occupation</label>
                <input
                    placeholder="Enter occupation"
                    value={newJob}
                    onChange={(ev) => setOccupation(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <label>Update Major</label>
                <input
                    placeholder="Enter major"
                    value={newMajor}
                    onChange={(ev) => setMajor(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onUpdateClick}
                    value={'Update'}
                />
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={() => navigate('/profile', { state: { email } })}
                    value={'Back to Profile'}
                />
            </div>
        </div>
    );
};

export default Settings;
