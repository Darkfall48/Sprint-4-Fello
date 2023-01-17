export function Loader() {
  const loader = 'Loader-2.svg'
  return (
    <img
      className="loader"
      src={require(`../assets/animation/loader/${loader}`)}
      alt="Loader"
    />
  )
}
