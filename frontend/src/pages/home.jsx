//? Libraries
import { Link, NavLink } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//? Store
//? Imports
// import logo from '../assets/img/logo.png'
//? Services
import { showErrorMsg, showSuccessMsg } from '../services/connection/event-bus.service'
//? Store
import { login, logout, signup } from '../store/actions/user.actions'
//? Components
import { LoginSignup } from '../cmps/user/login-signup'
export function Home() {

  const user = useSelector((storeState) => storeState.userModule.user)

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <section className="home-section">

      {user && (
        <span className="user-info">
          <Link to={`user/${user._id}`}>
            {user.imgUrl && <img src={user.imgUrl} />}
            {user.fullname}
          </Link>
          <span className="score">{user.score?.toLocaleString()}</span>
          <button onClick={onLogout}>Logout</button>
        </span>
      )}
      {!user && (
        <section className="user-info">
          <LoginSignup onLogin={onLogin} onSignup={onSignup} />
        </section>
      )}
    </section>
  )
}
