//? Pages
import { Home } from './pages/home'
import { Workspace } from './pages/workspace'
import { AdminIndex } from './pages/user/admin-index'
import { UserDetails } from './pages/user/user-details'
import { AboutUs } from './pages/about-us'

// Routes accessible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: <Home />,
    label: 'Home',
  },
  {
    path: '/board',
    component: <Workspace />,
    label: 'Workspaces',
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
  {
    path: 'about',
    component: <AboutUs />,
    label: 'About us',
  },
]

export default routes
