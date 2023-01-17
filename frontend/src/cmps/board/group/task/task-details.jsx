export function TaskDetails() {
  // const [task, setTask] = useState(null)
  const { taskId } = useParams()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   loadTask()
  // }, [toyId])

  // function loadTask() {
  //   toyService
  //     .get(toyId)
  //     .then((toy) => setToy(toy))
  //     .catch((err) => {
  //       console.log('Had issues in toy details', err)
  //       showErrorMsg('Cannot load toy')
  //       navigate('/toy')
  //     })
  // }

  return (
    <section className="task-details-section">
      <h1>Hello from Task Details</h1>
    </section>
  )
}
