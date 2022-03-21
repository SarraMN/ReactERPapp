import { createStore } from 'redux'
import rootReducer from 'src/redux/reducers'

const store = createStore(rootReducer)
export default store
