import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/welcome'
import Login from './pages/login'
import Account from './pages/account'
import Survey from './pages/survey'
import Profile from './pages/profile'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user || !user.token) {
            setLoggedIn(false)
        } else {
            fetch('http://localhost:3080/verify', {
                method: 'POST',
                headers: {
                    'jwt-token': user.token,
                },
                })
                .then((r) => r.json())
                .then((r) => {
                    setLoggedIn('success' === r.message)
                    setEmail(user.email || '')
                })
        }
        }, [])

    return (
    <div className="App">
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/survey" element={<Survey/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
        </BrowserRouter>
    </div>
    )
}

export default App