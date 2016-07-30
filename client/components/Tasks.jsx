import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import { urgency, searchFilter } from '../filterTasksHelpers';

let RecentTasks = ({recentTasks}) => (
  <ul>
    {recentTasks.map(recentTask => {
      return (
        <div className="col-xs-3" key={recentTask.id}>
          <Task
            id={recentTask.id}
            name={recentTask.name}
            claimedBy={recentTask.claimedBy}
            duebyNumber={recentTask.dueBy}
            interval={recentTask.interval}
            dueBy={moment().endOf(recentTask.dueBy).fromNow()}
            preciseDueBy={recentTask.dueBy}
            key={recentTask.id}
            status={recentTask.status}
            lastCompletedBy={recentTask.lastCompletedBy}
          />
        </div>
      );
    })}
  </ul>
);

RecentTasks.propTypes = {
  recentTasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    dueBy: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = function(state) {
  var tasks = state.tasks.slice(0);
  //sort tasks
  tasks.sort((a, b) => {
    return new Date(a.dueBy) > new Date(b.dueBy);
  });

  if (!state.search.closed && state.search.string !== '') {  //search is open so filter
    tasks = searchFilter(tasks, state.search.string);
  }

  let comp = {};
  state.completedList.forEach(item => {
    let t = new Date(item.createdAt);
    if (!comp[item.name] || (comp[item.name].t < t)) {
      comp[item.name] = {
        t: t,
        name: item.name,
        user: item.user
      }; 
    }
  });

  //get lastCompleted
  let now = Date.now();
  tasks.forEach(task => {
    if (comp[task.name]) {
      task.lastCompletedBy = comp[task.name].user;
    }

    task.status = 'recent';
    let timeLeft = Date.parse(task.dueBy) - now;
    if (timeLeft >= task.interval / 2) {
      //recent
    } else if (timeLeft >= 0 && timeLeft < task.interval / 2) {
      task.status = 'urgent';
    } else {
      task.status = 'overdue';
    }

  });
  return {
    recentTasks: tasks,
    completedList: state.completedList,
    search: state.search
  };
};

RecentTasks = connect(
  mapStateToProps
)(RecentTasks);

export default RecentTasks;
