//? Global Variables
// Board
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const CLEAN_STORE = 'CLEAN_STORE'

const initialState = {
  boards: [],
  board: {},
  lastRemovedBoard: null,
}

export function boardReducer(state = initialState, action) {
  let newState = state
  let boards
  let board
  switch (action.type) {
    case SET_BOARDS:
      newState = { ...state, boards: action.boards }
      break
    case SET_BOARD:
      newState = {
        ...state,
        board: state.boards.filter(
          (board) => board._id === action.board._id
        )[0],
      }
      break
    case REMOVE_BOARD:
      const lastRemovedBoard = state.boards.find(
        (board) => board._id === action.boardId
      )
      boards = state.boards.filter((board) => board._id !== action.boardId)
      newState = {
        ...state,
        boards: boards,
        lastRemovedBoard: lastRemovedBoard,
      }
      break
    case ADD_BOARD:
      newState = { ...state, boards: [...state.boards, action.board] }
      break
    case UPDATE_BOARD:
      boards = state.boards.map((board) =>
        board._id === action.board._id ? action.board : board
      )
      board =  state.board._id === action.board._id ? action.board : state.board
      newState = { ...state, boards: boards, board }

      break
    case UNDO_REMOVE_BOARD:
      if (state.lastRemovedBoard) {
        newState = {
          ...state,
          boards: [...state.boards, state.lastRemovedBoard],
          lastRemovedBoard: null,
        }
      }
      break
    case CLEAN_STORE:
      return initialState
    default:
  }
  return newState
}
