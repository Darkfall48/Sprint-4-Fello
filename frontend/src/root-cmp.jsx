//? Libraries
import React from 'react'
import { Routes, Route } from 'react-router'
//? Components
import { AppHeader } from './cmps/app/app-header'
import { UserDetails } from './pages/user/user-details'
import { BoardIndex } from './pages/board/board-index'
import { Home } from './pages/home'

//? Routes
import routes from './routes'

export function RootCmp() {
  return (
    <div className="main-layout app">
      <AppHeader />
      <main>
        <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<BoardIndex/>} path='board/:boardId'/>
          <Route element={<UserDetails/>} path='user'/>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
    </div>
  )
}
