export function SetCover({ task }) {
  const { style } = task

  if (style?.bgImg)
    return (
      <img
        className="task-preview-cover-img"
        src={style?.bgImg}
        alt="Card Image"
      />
    )
  else if (style?.bgColor)
    return (
      <article
        className="task-preview-cover-color"
        style={{ background: style.bgColor }}
      ></article>
    )
  else return <div className="task-preview-no-cover"></div>
}
