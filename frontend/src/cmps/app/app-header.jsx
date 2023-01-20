//? Libraries
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CgMenuGridR } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';

//? Routes
import routes from '../../routes'
import { useState } from 'react';
import { BoardAdd } from '../workspace/board-add';


export function AppHeader() {

  const board = useSelector((storeState) => storeState.boardModule.board)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // console.log('isModalOpen', isModalOpen);

  // console.log('board', board);

  function onCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  return (
    // <header className="app-header-section full" style={board?.style?.backgroundImg && {background: `url(${board.style.backgroundImg}) center center / cover`} || board?.style?.bgColor && { background: board.style.bgColor }}>
    <header className="app-header-section full" >
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
      <div className='dropdown'>
        <button onClick={() => { setIsModalOpen(!isModalOpen) }}>Create</button>
        {isModalOpen && <div className='dropdown-content'>
         {isModalOpen && <BoardAdd onCloseModal={onCloseModal} />}
        </div>}
      </div>

    </header>
  )
}
