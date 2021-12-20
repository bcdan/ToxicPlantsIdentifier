import {combineReducers,createStore} from 'redux';
import plantsReducer from './features/plants';

const reducers = combineReducers({
    fetchedPlants : plantsReducer
});
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;