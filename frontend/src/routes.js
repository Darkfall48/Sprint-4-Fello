//? Pages
import { Home } from './pages/home'
import { BoardIndex } from './pages/board/board-index'
import { Workspace } from './pages/workspace'
import { UserDetails } from './pages/user/user-details'
import { AdminIndex } from './pages/user/admin-index'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: <Home />,
    label: 'Home 🏠',
  },
  {
    path: '/board',
    component: <Workspace />,
    label: 'Workspace',
  },
  {
    path: '/board:boardId',
    component: <BoardIndex />,
    label: 'Boards',
  },
  {
    path: '/user/',
    component: <UserDetails />,
    label: 'User Page',
  },
  {
    path: '/user/:userId',
    component: <UserDetails />,
    label: 'User Details',
  },
  {
    path: '/admin',
    component: <AdminIndex />,
    label: 'Admin Only',
  },

  //   {
  //     path: 'review',
  //     component: <ReviewIndex />,
  //     label: 'Reviews',
  //   },
  //   {
  //     path: 'chat',
  //     component: <ChatApp />,
  //     label: 'Chat',
  //   },
  //   {
  //     path: 'about',
  //     component: <AboutUs />,
  //     label: 'About us',
  //   },
]

export default routes
