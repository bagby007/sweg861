import React from 'react'
import { useNavigate, useLocation} from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const email = location.state?.email;

  const onSurveyClick = () => {
    navigate( '/survey', { state: { email } })
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>User Profile</div>
      </div>
      <div>Email: {email} </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onSurveyClick}
          value="Complete Survey"
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={() => navigate( '/')}
          value="Log Out"
        />
      </div>
    </div>
  )
}

export default Profile