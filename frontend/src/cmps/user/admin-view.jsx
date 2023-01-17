// const { useEffect, useState } = React

import { userService } from '../../services/user.service.js'
import { UserPreview } from './user-preview.jsx'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../services/event-bus.service.js'
import { useEffect, useState } from 'react'

export function AdminView() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const users = await userService.query()
      setUsers(users)
    } catch (err) {
      console.log(err)
    }
  }

  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId)
      console.log('Deleted Succesfully!')
      const usersToUpdate = users.filter((user) => user._id !== userId)
      setUsers(usersToUpdate)
      showSuccessMsg('User removed')
    } catch (err) {
      console.log('Error from onRemoveUser ->', err)
      showErrorMsg('Cannot remove user')
    }
  }

  return (
    <section className="admin-view">
      <ul className="users-list">
        {users.map((user) => (
          <li className="user-preview" key={user._id}>
            <UserPreview user={user} />
            <button
              title="Delete"
              onClick={() => {
                onRemoveUser(user._id)
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
