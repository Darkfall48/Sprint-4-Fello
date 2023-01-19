//? Libraries
import { Link, NavLink } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//? Store
//? Imports
// import logo from '../assets/img/logo.png'
//? Services
import {
  showErrorMsg,
  showSuccessMsg,
} from '../services/connection/event-bus.service'
//? Store
import { login, logout, signup } from '../store/actions/user.actions'
//? Components
import { LoginSignup } from '../cmps/user/login-signup'
export function Home() {
  return <section className="home-section">Hello From Home Page</section>
}
