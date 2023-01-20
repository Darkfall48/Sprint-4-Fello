//? Libraries
import { Link } from 'react-router-dom'
import React from 'react'
//? Assets
import svg from '../assets/img/home-page.svg'

export function Home() {
  return (
    <section className="home-section">
      <div className="wave-container">
        <div className="content-container">
          <div className="txt-container">
            <h1>Trello brings all your tasks, teammates, and tools together</h1>
            <p>Keep everything in the same place—even if your team isn't.</p>
            <Link className="home-btn" to={'/board'}>
              Start demo
            </Link>
          </div>
          <div className="img-container">
            <img
              src={require(`../assets/img/home-page/hero.webp`)}
              alt="Hero"
            />
          </div>
        </div>

        <img src={svg} alt="Wave" />
      </div>
      <div className="secondary-content-container">
        <h1>A productivity powerhouse</h1>
        <p>
          Simple, flexible, and powerful. All it takes are boards, lists, and
          cards to get a clear view of who's doing what and what needs to get
          done.
        </p>
        <Link className="home-btn" to={'/board'}>
          Start
        </Link>
      </div>
    </section>
  )
}
