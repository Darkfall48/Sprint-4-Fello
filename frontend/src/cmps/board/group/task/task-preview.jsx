export function TaskPreview({ task }) {
  return (
    <article className="task-preview-article">
      <h2>{task.title}</h2>
      {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
      <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}
    </article>
  )
}
