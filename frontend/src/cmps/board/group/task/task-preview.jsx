export function TaskPreview({ task }) {
  return (
    <section className="task-preview-section">
      <article className="task-preview-background">Background color</article>
      <article className="task-preview-label">Labels</article>
      <article className="task-preview-title">
        <p>{task.title}</p>
      </article>
      <article className="task-preview-info">Infos: 0/5 5/7</article>
      <article className="task-preview-member">Sidney, Keren, Yael</article>
      {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
      <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}
    </section>
  )
}
