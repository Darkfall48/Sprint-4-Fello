export const dndService = {
  swapItemBetweenLists,
  reorder,
}

function swapItemBetweenLists(
  sourceList,
  destinationList,
  sourceIdx,
  destinationIdx
) {
  const deletedItem = sourceList.tasks.splice(sourceIdx, 1)
  destinationList.tasks.push(...deletedItem)
  return reorder(
    destinationList.tasks,
    destinationList.tasks.length - 1,
    destinationIdx
  )
}

function reorder(arr, startIdx, endIdx) {
  const orderedArr = [...arr]
  const [removed] = orderedArr.splice(startIdx, 1)
  orderedArr.splice(endIdx, 0, removed)
  return orderedArr
}
