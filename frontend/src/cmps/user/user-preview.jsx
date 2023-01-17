export function UserPreview({ user }) {
  return (
    <article>
      <p>Fullname: {user.fullname}</p>
      <p>Password:{user.password}</p>
    </article>
  )
}
