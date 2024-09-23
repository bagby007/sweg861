import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  const onLoginClick = () => {
    navigate('/login')
  }

  const onCreateClick = () => {
    navigate('/account')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome To SWENG-861!</div>
      </div>
      <div>Please Log In Below</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginClick}
          value="Login"
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={onCreateClick}
          value="Create Account"
        />
      </div>
    </div>
  )
}

export default Welcome