import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadUser } from '../store/user.actions'

export function UserDetails() {

  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)

  useEffect(() => {
    loadUser(params.id)
    return () => {

    }
  }, [])

  return (
    <section className="user-details">
      <h1>User Details</h1>
      {user && <div>
        <h3>
          {user.fullname}
        </h3>
        {/* Demo for dynamic images: */}
        <div className="user-img" style={{ backgroundImage: `url('/img/u${0}.png')` }}>
        </div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>}
    </section>
  )
}