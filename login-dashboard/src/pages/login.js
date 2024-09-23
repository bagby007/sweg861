import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const checkAccount = (callback) => {
        fetch('http://localhost:3080/account-exists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then((r) => r.json())
        .then((r) => {
            callback(r?.userExists);
        });
    };

    const userLogin = () => {
        fetch('http://localhost:3080/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((r) => r.json())
        .then((r) => {
            if (r.message === 'success') {
                localStorage.setItem('user', JSON.stringify({ email, token: r.token }));
                navigate(
                    '/profile',
                    {
                      state: {
                        email:email
                      }
                    },
                  );
            } else {
                window.alert('Invalid Email/Password!');
            }
        });
    };

    const onLoginClick = () => {
        setEmailError('');
        setPasswordError('');
  
        // Input Validation
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
            setPasswordError('The password must be 8 characters or longer!');
            valid = false;
        }

        if (valid) {
            checkAccount((accountExists) => {
                if (accountExists) {
                    userLogin();
                } else {
                    window.alert('Email does not exist!');
                }
            });
        }
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
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
                <input className={'inputButton'} type="button" onClick={onLoginClick} value={'Log In'} />
                <input className={'inputButton'} type="button" onClick={() => navigate( '/')} value="Back"/>
            </div>
        </div>
    );
};

export default Login;
