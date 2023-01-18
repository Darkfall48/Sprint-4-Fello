//? Libraries
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaTrello } from 'react-icons/fa';

//? Routes
import routes from '../../routes'


export function AppHeader() {
 

  return (
    <header className="app-header-section full">
      <div className='logo'>
        {/* <FaTrello/> */}
        </div>
      <nav>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
          </NavLink>
        ))}

      </nav>
    </header>
  )
}
