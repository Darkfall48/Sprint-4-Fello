// export function Loader() {
//   const loader = 'Loader1.svg'
//   return (
//     // <h1>Loading...</h1>
//     <img
//       className="loader"
//       src={require(`../../assets/animation/loader/${loader}`)}
//       alt="Loader"
//     />
//   )
// }


import loader2 from '../../assets/animation/loader/loader2.svg'

export function Loader() {
  const loader = 'Loader2.svg'
  return (
    // <h1>Loading...</h1>
    <img
      className="loader"
      src={loader2}
      alt="Loader"
    />
  )
}
