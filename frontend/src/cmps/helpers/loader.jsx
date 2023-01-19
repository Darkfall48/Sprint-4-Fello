export function Loader() {
  const loader = 'Loader1.svg'
  return (
    // <h1>Loading...</h1>
    <img
      className="loader"
      src={require(`../../assets/animation/loader/${loader}`)}
      alt="Loader"
    />
  )
}
