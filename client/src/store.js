import {combineReducers,createStore} from 'redux';
import plantsReducer from './features/plants';
import searchReducer from './features/search';

const reducers = combineReducers({
    fetchedPlants : plantsReducer,
    searchBox : searchReducer
});
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;