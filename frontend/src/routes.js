//? Pages
import { Home } from './pages/home'
import { Workspace } from './pages/workspace'
import { BoardIndex } from './pages/board/board-index'
import { TaskDetails } from './cmps/board/group/task/task-details'
import { UserDetails } from './pages/user/user-details'
import { AdminIndex } from './pages/user/admin-index'
import { AboutUs } from './pages/about-us'

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
    path: '/board/:boardId',
    component: <BoardIndex />,
    label: 'Board Index',
  },
  // {
  //   path: '/board/:boardId/group/:groupId/task/taskId',
  //   component: <TaskDetails />,
  //   label: 'Task Details',
  // },
  // {
  //   path: '/user/',
  //   component: <UserDetails />,
  //   label: 'User Page',
  // },
  // {
  //   path: '/user/:userId',
  //   component: <UserDetails />,
  //   label: 'User Details',
  // },
  // {
  //   path: '/admin',
  //   component: <AdminIndex />,
  //   label: 'Admin Only',
  // },

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
    path: '/about',
    component: <AboutUs />,
    label: 'About us',
  },
]

export default routes
