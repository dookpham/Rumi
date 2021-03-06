import socket from '../socketio.js';
import urgency from '../urgency.service';
import { addCompleted } from './completedActions';

let nextTaskId = 0;  //when we set initial state, we need to update this

const addTask = (data) => {
  return {
    type: 'ADD_TASK',
    data: data
  };
};

export const addTaskToServer = ({taskName, dueBy, interval}) => {
  var listenerOn = false;
  return dispatch => {

    socket.emit('create task', {
      name: taskName,
      dueBy,
      interval
    });

    if (!listenerOn) {
      listenerOn = true;
      socket.on('create task', newTask => {
        dispatch(addTask(newTask));
      });
    }
  };
};

const completeTask = ({id, dueBy, updatedAt}) => {
  return {
    type: 'COMPLETE_TASK',
    id,
    dueBy,
    updatedAt
  };
};

export const completeTaskToServer = ({taskId}) => {
  var listenerOn = false;
  return dispatch => {
    
    socket.emit('complete task', taskId);

    if (!listenerOn) {
      listenerOn = true;

      socket.on('complete task', function(completedTask) {
        console.log('completed:', completedTask);
        let id = completedTask.taskId;
        let updatedAt = completedTask.task.updatedAt;
        let dueBy = completedTask.task.dueBy;
        dispatch(completeTask({id, dueBy, updatedAt}));

        id = completedTask.id;
        let name = completedTask.task.name;
        let user = completedTask.user.name;
        let createdAt = completedTask.createdAt;
        dispatch(addCompleted({id, name, user, createdAt}));
      });
    }
  };
};

const loadAllTasks = ({tasks}) => {
  return {
    type: 'ADD_ALL_TASKS',
    id: nextTaskId++,
    tasks
  };
};

export const getAllTasks = () => {
  // setInterval(reprioritizeTasks, 1000 * 60);  //update every minute
  return dispatch => {
    socket.emit('get all tasks');
    socket.on('sending all tasks', tasks => {
      dispatch(loadAllTasks({tasks}));
    });
  };
};

// setInterval(() => {
//   this.setState({now: Date.now()});

//   let allTasks = [].concat(this.state.urgentTasks, this.state.recentTasks, this.state.overdueTasks);
//   this.reprioritize(allTasks);
// }, 1000 * 60); // update every minute