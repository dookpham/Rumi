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
            status="recent"
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
  if (!state.search.closed && state.search.string !== '') {  //search is open so filter
    tasks = searchFilter(tasks, state.search.string);
  }

  //map completedList to taskNames... should be taskId but oh well =( ::::
  let comp = {};
  state.completedList.forEach(item => {
    let t = new Date(item.createdAt);
    // item.t = t;
    if (!comp[item.name] || (comp[item.name].t < t)) {
      comp[item.name] = {
        t: t,
        name: item.name,
        user: item.user
      }; 
    // } else {
      // comp[item.name] = item; 
    }
  });

  //get lastCompleted
  tasks.forEach(task => {
    if (comp[task.name]) {
      task.lastCompletedBy = comp[task.name].user;
    }
  });
  return {
    recentTasks: urgency(tasks, 'recent'),
    completedList: state.completedList,
    search: state.search
  };
};

RecentTasks = connect(
  mapStateToProps
)(RecentTasks);

export default RecentTasks;
