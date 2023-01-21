export function SetDescription({ task }) {
  const { description } = task

  if (!description)
    return <section className="task-details-section-description"></section>
  return (
    <section className="task-details-section-description">
      <h2 className="task-details-section-description-title">Description</h2>
      <textarea
        className="task-details-section-description-input"
        type="text"
        name="task-description"
        id="task-description"
        defaultValue={description}
      />
    </section>
  )
}
