import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import entityReducer from './entityReducer'
import pageReducer from './pageReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entityReducer,
  pages: pageReducer,
  user: userReducer,
  auth: authReducer,
  form: formReducer
})

export default rootReducer
