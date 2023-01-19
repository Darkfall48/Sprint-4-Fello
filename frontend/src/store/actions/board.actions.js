//? Services
import { boardService } from '../../services/board/board.service.local'
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
    // console.log('boardId', boardId)
    const board = await boardService.get(boardId)
    // console.log('Board from DB:', board)
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

export function updateBoard(board) {
  console.log('board', board)
  return boardService.save(board)
    .then((savedBoard) => {
      console.log('Updated Board:', savedBoard)
      store.dispatch(getActionUpdateBoard(savedBoard))
      return savedBoard
    })
    .catch((err) => {
      console.log('Cannot save board', err)
      throw err
    })
  }
  


// export async function checkout(total) {
//   try {
//     const score = await userService.changeScore(-total)
//     store.dispatch({ type: SET_SCORE, score })
//     return score
//   } catch (err) {
//     console.log('BoardActions: err in checkout', err)
//     throw err
//   }
// }

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






