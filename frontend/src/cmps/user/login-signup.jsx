
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup, login } from '../../store/actions/user.actions'
import blueLogo from '../../assets/img/header/trello-logo-blue.png'

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
  }
}

export function LoginSignup({ setUser }) {

  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)

  const navigate = useNavigate()

  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const funcs = { signup, login }
    const method = isSignupState ? 'signup' : 'login'

    console.log('credentials', credentials);

    return funcs[method](credentials)
      .then((user) => {
        navigate('/board')
      })
      .catch(err => {
        console.log(err);
      })

  }

  function onToggleSignupState() {
    setIsSignupState(!isSignupState)
  }


  const { username, password, fullname } = credentials
  return <div className="login-page">

    <div className="logo-section">
      <img src={blueLogo} alt="logo" />
      <h2
        className="logo-name"
        style={{ fontFamily: 'charlie-regular', margin: 0 }}
      >
        Fello
      </h2>
    </div>

    <div className="login-container">

      <h1>Log in to Fello</h1>

      <form className="login-form" onSubmit={onSubmit}>
        {/* <label htmlFor="username">Username</label> */}
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={handleCredentialsChange}
          required
          autoFocus
        />

        {/* <label htmlFor="password">Password</label> */}
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleCredentialsChange}
          required
        />

        {/* {isSignupState && <label htmlFor="fullname">Fullname</label>} */}
        {isSignupState && <input
          id="fullname"
          type="text"
          name="fullname"
          value={fullname}
          placeholder="Full name"
          onChange={handleCredentialsChange}
          required
        />}

        <button className='login-btn'>{isSignupState ? 'Signup' : 'Login'}</button>
      </form>

      <hr />

      <div className="btns">
        <Link to="/login" onClick={onToggleSignupState}>
          {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
        </Link >
      </div>
    </div>
  </div >

}