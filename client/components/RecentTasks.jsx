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
  var tasks = state.tasks;
  if (!state.search.closed && state.search.string !== '') {  //search is open so filter
    tasks = searchFilter(tasks, state.search.string);
  }
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
