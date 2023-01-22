export function SetDescription({ task }) {
  const { description } = task

  if (!description || !description.length)
    return <section className="task-details-main-description"></section>
  return (
    <section className="task-details-main-description">
      <h2 className="task-details-main-description-title">Description</h2>
      <textarea
        className="task-details-main-description-input"
        type="text"
        name="task-description"
        id="task-description"
        placeholder="Add a description.."
        defaultValue={description}
      />
    </section>
  )
}
