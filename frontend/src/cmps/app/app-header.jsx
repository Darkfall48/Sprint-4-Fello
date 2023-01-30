//? Libraries
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CgMenuGridR } from 'react-icons/cg'

//? Routes
import routes from '../../routes'
import { useState } from 'react'
import { BoardAdd } from '../workspace/board-add'
import { FastAverageColor } from 'fast-average-color'
import { useRef } from 'react'
import blueLogo from '../../assets/img/header/trello-logo-blue.png'
import { logout } from '../../store/actions/user.actions'
import { SET_USER } from '../../store/reducers/user.reducer'
import { useDispatch } from 'react-redux'

export function AppHeader({ type }) {
  const user = useSelector((storeState => storeState.userModule.user))
  const fac = new FastAverageColor()
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const buttonRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function setUser(user) {
    dispatch({ type: SET_USER, user })
}

  function onLogout() {
    logout()
        .then(() => {
            setUser(null)
        })
    navigate('/')
}

  switch (type) {
    case 'main':
      return (<header
        className="app-header-section full"
        style={board?.style?.bgColor && { background: board.style.bgColor }}
      >
        <div className="menu">
        <Link to="/">
          <CgMenuGridR className="header-links" style={ board?.style?.isLight && {color: 'rgb(23, 43, 77)'}}/>
        </Link>
        <Link to="/board">
          <h2
            className="logo-name"
            style={ board?.style?.isLight ? {fontFamily: 'charlie-regular', color: 'rgb(23, 43, 77)'} :{ fontFamily: 'charlie-regular', color: 'white' }}
          >
            Fello
          </h2>
        </Link>
        <nav>
          {routes.map((route) => (
            <NavLink key={route.path} to={route.path} style={board?.style?.isLight? {color: 'rgb(23, 43, 77)'} : {color: 'white'}}>
              {route.label}
            </NavLink>
          ))}
        </nav>

        <div className='create-dropdown'>
          <button ref={buttonRef} onClick={() => { setIsModalOpen(!isModalOpen) }}>Create</button>
          {isModalOpen && <BoardAdd onCloseModal={onCloseModal} buttonRef={buttonRef} />}
        </div>
        </div>
        <div className="user-section">
        { user && <img src={user.imgUrl} alt=""/>}
        {/* {user && <button className="logout-btn" onClick={onLogout}>Logout</button>} */}
        </div>
      </header>)
     
      break
    case 'home':
      return (<header
        className="app-header-home-section full"
        style={{ background: "white" }}
      >
        <div className="logo-section">
          <img src={blueLogo} alt="logo" />
          <h2
            className="logo-name"
            style={{ fontFamily: 'charlie-regular', margin: 0 }}
          >
            Fello
          </h2>
        </div>
        <Link to="/login">Login</Link>
      </header>)
      break
    default:
      return (console.log(`Cannot load component type: ${type}.`))
  }
}