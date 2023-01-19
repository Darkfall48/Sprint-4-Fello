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
import svg from '../assets/img/home-page.svg'

export function Home() {
  return <section className="home-section">

    <div class="wave-container">
      <div className="content-container">
        <div className="txt-container">
          <h1>Trello brings all your tasks, teammates, and tools together
          </h1>
          <p>Keep everything in the same place—even if your team isn't.</p>
          <Link to={'/board'}><button className='home-btn'>Start demo</button></Link>
        </div>
        <div className="img-container">
          <img src="//images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=540" alt="" />
        </div>
      </div>


      <img src={svg} alt="" />
    </div>
    <div className="secondary-content-container">
      <h1>A productivity powerhouse</h1>
      <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done.</p>
      <Link to={'/board'}><button className='home-btn'>Start</button></Link>
    </div>

  </section>
}
