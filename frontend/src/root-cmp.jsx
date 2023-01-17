//? Libraries
import React from 'react'
import { Routes, Route } from 'react-router'
//? Components
import { AppHeader } from './cmps/app/app-header'
import { AppFooter } from './cmps/app/app-footer'
import { UserDetails } from './pages/user/user-details'
//? Routes
import routes from './routes'

export function RootCmp() {
  return (
    <div>
      <AppHeader />
      <main>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route path="user/:id" element={<UserDetails />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
