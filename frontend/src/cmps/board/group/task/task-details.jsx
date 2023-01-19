export function TaskDetails({ isModalOpen, setIsModalOpen }) {
  // const [task, setTask] = useState(null)
  // const { taskId } = useParams()
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
    <main
      className="task-details-modal-overlay"
      onClick={() => setIsModalOpen(false)}
    >
      <section
        className="task-details-section"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setIsModalOpen(!isModalOpen)}>Close</button>
        <h1 className="task-details-section-title">Modal Content</h1>
      </section>
    </main>
  )
}
