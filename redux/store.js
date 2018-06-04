import { createStore, combineReducers } from 'redux';
import { locations } from './reducers';

const reducers = combineReducers({
    locations : locations
})

const store = createStore(reducers);

// make the store avaiable to the app
export default store;