//? Libraries
import { createStore, combineReducers } from 'redux'
//? Store
// Board
import { boardReducer } from './reducers/board.reducer.js'
import { groupReducer } from './reducers/group.reducer.js'
import { taskReducer } from './reducers/task.reducer.js'
// User
import { userReducer } from './reducers/user.reducer.js'
import { reviewReducer } from './reducers/review.reducer'
// App
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
  boardModule: boardReducer,
  groupModule: groupReducer,
  taskModule: taskReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  console.log('**** Store state changed: ****')
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})
