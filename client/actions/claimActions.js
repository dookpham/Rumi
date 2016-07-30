import socket from '../socketio.js';

const claimTask = function({ taskId, updatedAt, userId, name }) {
  return {
    type: 'CLAIM_TASK_TO_USER',
    taskId: taskId,
    name: name,
    userId: userId,
    updatedAt: updatedAt,
  };
};

export const claimTaskToServer = ({ taskId }) => {
  return dispatch => {
    // need to figure this one out
    socket.emit('claim task', taskId);
    socket.on('claimed task', ( {name, id, createdAt} ) => {
      console.log(name, id, createdAt, taskId);
      let updatedAt =  Date.now();
      let formatted = {
        userId: id,
        name: name,
        taskId: taskId,
        updatedAt: updatedAt,
      };
      console.log('zzzyyyzzz', formatted);
      dispatch(claimTask(formatted));
      });
    };
  };
