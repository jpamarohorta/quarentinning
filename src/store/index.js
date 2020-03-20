import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

const enhancers = []
const middleware = [thunk]

const composeEnhancers = composeWithDevTools({})

const composedEnhancers = composeEnhancers(
  applyMiddleware(...middleware),
  ...enhancers
)
const initializeStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, composedEnhancers)
}

export default initializeStore
