// import { useRef} from 'react'

export function Loader() {
  const loader = 'Loader1.svg'
  // const mountTime = useRef(Date.now());
  // const mountDelay = -(mountTime.current % 1000);

  return (
    // <h1>Loading...</h1>
    <img
      className="loader"
      src={require(`../../assets/animation/loader/${loader}`)}
      alt="Loader"
      // style={{ '--loader-delay': `${mountDelay}ms` }}
    />
  )
}
