//? Global Variables
// Board
export const SET_BOARDS = 'SET_BOARDS'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
// Cart
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const initialState = {
  boards: [],
  cart: [],
  lastRemovedBoard: null,
}

export function boardReducer(state = initialState, action) {
  var newState = state
  var boards
  var cart
  switch (action.type) {
    case SET_BOARDS:
      newState = { ...state, boards: action.boards }
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
      newState = { ...state, boards: boards }
      break
    case ADD_TO_CART:
      newState = { ...state, cart: [...state.cart, action.board] }
      break
    case REMOVE_FROM_CART:
      cart = state.cart.filter((board) => board._id !== action.boardId)
      newState = { ...state, cart }
      break
    case CLEAR_CART:
      newState = { ...state, cart: [] }
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
    default:
  }
  return newState
}
