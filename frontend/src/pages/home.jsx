//? Libraries
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//? Store
import { CHANGE_COUNT } from '../store/reducers/user.reducer'
//? Imports
// import logo from '../assets/img/logo.png'

export function Home() {
  const dispatch = useDispatch()
  const count = useSelector((storeState) => storeState.userModule.count)

  function changeCount(diff) {
    console.log('Changing count by:', diff)
    dispatch({ type: CHANGE_COUNT, diff })
  }

  return (
    <section className="home-section">
      <img src={''} alt="Logo" style={{ maxWidth: '300px' }} />
      <h2>
        Count {count}
        <button
          onClick={() => {
            changeCount(1)
          }}
        >
          +
        </button>
        <button className="btn"
          onClick={() => {
            changeCount(10)
          }}
        >
          +10
        </button>
      </h2>
    </section>
  )
}
