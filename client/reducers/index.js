import { combineReducers } from 'redux';
import completedList from './completedList';
import tasks from './tasks';
import search from './search';

const appReducer = combineReducers({
  completedList,
  tasks,
  search
});

export default appReducer;