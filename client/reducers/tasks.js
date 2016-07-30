const task = (state, action) => {
  switch (action.type) {

  case 'ADD_TASK':
    return action.data;
  case 'COMPLETE_TASK':
    return Object.assign({}, state, {
      dueBy: action.dueBy,
      updatedAt: action.updatedAt
    });
  case 'CLAIM_TASK_TO_USER':
    let some = Object.assign({}, state, {
      claimedBy: action.name,
      updatedAt: action.updatedAt,
    });
    return some;
  default:
    return state;
  }
};

const tasks = (state = [], action) => {
  switch (action.type) {

  case 'ADD_TASK':
    return [
      ...state, task(undefined, action)
    ];
  case 'COMPLETE_TASK':
    return state.map(t => {
      if (t.id === action.id) {
        return task(t, action);
      } else {
        return t;
      }
    });
  case 'ADD_ALL_TASKS':
    return action.tasks;
  case 'CLAIM_TASK_TO_USER':
    return state.map(t => {
      if (t.id === action.taskId) {
        return task(t, action);
      } else {
        return t;
      }
    });
  default:
    return state;
  }
};

export default tasks;
