//? Libraries
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CgMenuGridR } from 'react-icons/cg';
import { BiChevronDown } from 'react-icons/bi';

//? Routes
import routes from '../../routes'


export function AppHeader() {
 

  return (
    <header className="app-header-section full">
      <Link to="/" ><CgMenuGridR className="header-links"/></Link>
      <Link to="/board" className='logo'/>
      <nav>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
            <BiChevronDown className='down-arrow-nav'/>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
