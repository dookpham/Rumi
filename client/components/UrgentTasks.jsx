import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import { urgency, searchFilter } from '../filterTasksHelpers';

let UrgentTasks = ({urgentTasks}) => (
  <ul>
    {urgentTasks.map(urgentTask => {
      return (
        <div className="col-xs-3" key={urgentTask.id}>
          <Task
            id={urgentTask.id}
            name={urgentTask.name}
            claimedBy={urgentTask.claimedBy}
            duebyNumber={urgentTask.dueBy}
            interval={urgentTask.interval}
            dueBy={moment().endOf(urgentTask.dueBy).fromNow()}
            key={urgentTask.id}
            status="urgent"
          />
        </div>
      );
    })}
  </ul>
);

UrgentTasks.propTypes = {
  urgentTasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    dueBy: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = function(state) {
  var tasks = state.tasks;
  if (!state.search.closed) {  //search is open so filter
    tasks = searchFilter(tasks, state.search.string);
  }
  return {
    urgentTasks: urgency(tasks, 'urgent')
  };
};

UrgentTasks = connect(
  mapStateToProps
)(UrgentTasks);

export default UrgentTasks;
