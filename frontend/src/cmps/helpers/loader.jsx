// import { useRef} from 'react'

// export function Loader() {
//   const loader = 'Loader1.svg'
//   // const mountTime = useRef(Date.now());
//   // const mountDelay = -(mountTime.current % 1000);

//   return (
//     // <h1>Loading...</h1>
//     <img
//       className="loader"
//       src={loader2}
//       alt="Loader"
//       // style={{ '--loader-delay': `${mountDelay}ms` }}
//     />
//   )
// }

import loader2 from '../../assets/animation/loader/loader2.svg'

export function Loader() {

  return <section className="loader">
    <img
      className="loader-img"
      src={loader2}
      alt="Loader"
    />
  </section>
}
