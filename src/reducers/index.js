import { combineReducers } from 'redux';
import tasks from './tasks';
import isOpened from './isOpened';
import isShowInactive from './isShowInactive';
import searchQuery from './searchQuery';
import selectedTask from './selectedTask'

var myReducer = combineReducers({
    tasks,
    isOpened,
    isShowInactive,
    searchQuery,
    selectedTask
})

export default myReducer;