//? Libraries
import { Link } from 'react-router-dom'
import React from 'react'
//? Assets
import boardSvg from '../assets/img/TrelloImage-1.webp'
import { AppHeader } from '../cmps/app/app-header'
import { useSelector } from 'react-redux'
//? Private Variables
const heroImgUrl = 'https://res.cloudinary.com/dqbvyn6b2/image/upload/v1674716698/hero_vffzlz.webp'

export function Home() {

  const user = useSelector((storeState => storeState.userModule.user))

  return (
    <>
    { <AppHeader type={'home'} />}
    {/* {!user && <AppHeader type={'home'} />} */}
    <section className="home-section main-container main-layout">
      <div className="wave-container full">
        <div className="content-container">
          <div className="txt-container">
            <h1>Fello brings all your tasks, teammates, and tools together</h1>
            <p>Keep everything in the same place—even if your team isn't.</p>
            <Link className="home-btn" to={'/board'}>
              Start demo
            </Link>
          </div>
          <div className="img-container">
            <img src={heroImgUrl} alt="Hero" />
            {/* <img src='frontend/src/assets/img/home-page/hero.webp' alt="Hero" /> */}
          </div>
        </div>

        {/* <img src={svg} alt="Wave" /> */}
      </div>
      <div className="secondary-content-container full">
        <div className="txt-content">
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
        <img src={boardSvg} alt="boardSvg" />
      </div>
    </section>
    </>
  )
}
