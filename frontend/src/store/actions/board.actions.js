//? Services
import { boardService } from '../../services/board/board.service'
import { userService } from '../../services/user/user.service'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../services/connection/event-bus.service'
//? Store
import { store } from '../store.js'
import {
  ADD_BOARD,
  REMOVE_BOARD,
  SET_BOARDS,
  SET_BOARD,
  UNDO_REMOVE_BOARD,
  UPDATE_BOARD,
} from '../reducers/board.reducer.js'
import { SET_SCORE } from '../reducers/user.reducer.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  }
}
export function getActionAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  }
}
export function getActionUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  }
}

//? Board Actions:

export async function loadBoards() {
  try {
    const boards = await boardService.query()
    store.dispatch({
      type: SET_BOARDS,
      boards,
    })
  } catch (err) {
    console.log('Cannot load boards', err)
    throw err
  }
}

export async function loadBoard(boardId) {
  try {
    await loadBoards()
    const board = await boardService.get(boardId)
    store.dispatch({
      type: SET_BOARD,
      board,
    })
  } catch (err) {
    console.log('Cannot load board', err)
    throw err
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId)
    store.dispatch(getActionRemoveBoard(boardId))
  } catch (err) {
    console.log('Cannot remove board', err)
    throw err
  }
}

export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    console.log('Added Board', savedBoard)
    store.dispatch(getActionAddBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log('Cannot add board', err)
    throw err
  }
}

export async function updateBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    store.dispatch(getActionUpdateBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log('Cannot save board', err)
    throw err
  }
}

//? Group Actions:

export async function saveGroup(group) {
  // console.log('group:', group)
  const { board } = store.getState().boardModule
  const { groups } = board
  const groupIdx = groups.findIndex((grp) => grp.id === group.id)
  groups.splice(groupIdx, 1, group)
  const updatedBoard = { ...board, groups: [...groups] }
  try {
    await updateBoard(updatedBoard)
    loadBoard(board._id)
    // store.dispatch({ type: 'CLEAN_STORE' })
  } catch (err) {
    console.log(`Cannot save group id ${group.id}`, err)
    throw err
  }
}

//? Task Actions:

export async function addTask(group, task) {
  const updatedTasks = [...group.tasks, task]
  const updatedGroup = { ...group, tasks: updatedTasks }
  try {
    await saveGroup(updatedGroup)
  } catch (err) {
    console.log(`Cannot add task id ${task.id}`, err)
    throw err
  }
}

export async function updateTask(group, task) {
  const { tasks } = group
  const taskIdx = tasks.findIndex((tsk) => tsk.id === task.id)
  tasks.splice(taskIdx, 1, task)
  const updatedGroup = { ...group, tasks }
  try {
    await saveGroup(updatedGroup)
  } catch (err) {
    console.log(`Cannot update task id ${task.id}`, err)
    throw err
  }
}

export async function removeLabelFromAllTasks(board, labelId) {
  const { groups } = board
  try {
    const updatedGroups = await groups.map((group) => {
      return {
        ...group, tasks: group.tasks.map((task) => {
          task = { ...task, labelIds: task.labelIds.filter((lblId) => lblId !== labelId) }
          return updateTask(group, task)
        })
      }
    })
    const updatedBoard = { ...board, groups: updatedGroups }
    await updateBoard(updatedBoard)
    // loadBoard(board._id)
  } catch (err) {
    console.log('Failed to remove label', labelId, 'from all tasks', err)
    throw (err)
  }
}

export async function removeTask(group, taskId) {
  try {
    const updatedTasks = group.tasks.filter((task) => task.id !== taskId)
    const updatedGroup = { ...group, tasks: updatedTasks }
    saveGroup(updatedGroup)
  } catch (err) {
    console.log('Cannot remove task', err)
    throw err
  }
}



// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
  store.dispatch({
    type: REMOVE_BOARD,
    boardId,
  })
  showSuccessMsg('Board removed')

  boardService
    .remove(boardId)
    .then(() => {
      console.log('Server Reported - Deleted Successfully')
    })
    .catch((err) => {
      showErrorMsg('Cannot remove board')
      console.log('Cannot load boards', err)
      store.dispatch({
        type: UNDO_REMOVE_BOARD,
      })
    })
}
