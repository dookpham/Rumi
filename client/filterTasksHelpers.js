/**
 * @typedef PrioritizedTasks
 * @type {object}
 * @property {Task[]} recent An array of recently completed tasks
 * @property {Task[]} urgent An array of urgent tasks
 * @property {Task[]} overdue An array of overdue tasks
 */

/**
 * Prioritizes tasks according to their due date and interval length
 * @param  {object[]} allTasks      An array of all tasks
 * @return {PrioritizedTasks}       An object grouping tasks by priority
 */
export const urgency = (allTasks, priority) => {
  let tasks = {
    recent: (tasks) => {
      let now = Date.now();
      return tasks.filter(t => {
        let timeLeft = Date.parse(t.dueBy) - now;
        if (timeLeft >= t.interval / 2) {
          return t;
        }
      });
    },

    urgent: (tasks) => {
      let now = Date.now();
      return tasks.filter(t => {
        let timeLeft = Date.parse(t.dueBy) - now;
        if (timeLeft >= 0 && timeLeft < t.interval / 2) {
          return t;
        }
      });
    }, 

    overdue: (tasks) => {
      let now = Date.now();
      return tasks.filter(t => {
        let timeLeft = Date.parse(t.dueBy) - now;
        if (timeLeft < 0) {
          return t;
        }
      });
    } 
  };

  if (tasks[priority]) {
    return tasks[priority](allTasks);
  } 
};

export const searchFilter = (tasks, string) => {
  return tasks.filter(t => {
    if (t.name.search(string) !== -1) { return t; }
  });
};

// export default urgency;