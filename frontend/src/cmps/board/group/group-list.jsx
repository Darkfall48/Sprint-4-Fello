// import { useSelector } from 'react-redux'

export function GroupList() {
  // const groups = useSelector((storeState) => storeState.groupModule.groups)

  return (
    <section className="group-list-section">
      <h1>Hello from Group List</h1>
      <ul className="group-list">
        {/* {groups.map((group) => (
          <li className="group-preview" key={group._id}>
            <div> */}
              {/* <button onClick={() => { onRemoveGroup(group._id)}}> x </button> */}
              {/* <button onClick={() => { onUpdateGroup(group) }}> Edit </button> */}
            </div>
            {/* <button onClick={() => { onAddGroupMsg(group) }} > Add group msg </button> */}
          {/* </li>
        ))} */}
      </ul>
    </section>
  )
}
