//? Libraries
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CgMenuGridR } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';


//? Routes
import routes from '../../routes'
import { useState } from 'react';
import { BoardAdd } from '../workspace/board-add';
import { FastAverageColor } from 'fast-average-color';
import { useRef } from 'react';

export function AppHeader() {

  const fac = new FastAverageColor();
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const buttonRef = useRef()

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <header className="app-header-section full" style={board?.style?.bgColor && { background: board.style.bgColor }}>
      <Link to="/" ><CgMenuGridR className="header-links" /></Link>
      <Link to="/board" className='logo' />
      <nav>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
            <FiChevronDown className='down-arrow-nav' />
          </NavLink>
        ))}
      </nav>

      <div className='create-dropdown'>
        {/* <button onClick={() => { setIsModalOpen(!isModalOpen) }}>Create</button> */}
        <button ref={buttonRef} onClick={() => { setIsModalOpen(!isModalOpen) }}>Create</button>
        {isModalOpen && <BoardAdd onCloseModal={onCloseModal} buttonRef={buttonRef}/>}
      </div>

    </header>
  )
}
