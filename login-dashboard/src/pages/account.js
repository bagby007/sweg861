import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const createAccount = (email, password, callback) => {
    fetch('http://localhost:3080/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message === 'success') {
            callback(true);
        } else {
            window.alert('User Already Exist!');
            callback(false);
        }
    });
};

const AccountCreation = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate()

    const onCreateAccountClick = () => {
        setEmailError('');
        setPasswordError('');
        let valid = true;

        if (email.length === 0) {
            setEmailError('Enter Email Address!');
            valid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Invalid Email!');
            valid = false;
        }

        if (password.length === 0) {
            setPasswordError('Enter Password!');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('The password must be at least 8 characters long!');
            valid = false;
        }

        if (valid) {
            createAccount(email, password, (success) => {
                if (success) {
                    window.alert('Account created successfully!');
                    navigate('/profile')
                }
            });
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Create Account</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={email}
                    placeholder="Email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onCreateAccountClick}
                    value={'Create Account'}
                />
                <input
                className={'inputButton'}
                type="button"
                onClick={() => navigate( '/')}
                value="Back"
               />
            </div>
        </div>
    );
};

export default AccountCreation;
