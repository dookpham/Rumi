import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import { urgency, searchFilter } from '../filterTasksHelpers';

let OverdueTasks = ({overdueTasks}) => (
  <ul>
    {overdueTasks.map(overdueTask => {
      return (
        <div className="col-xs-3" key={overdueTask.id}>
          <Task
            id={overdueTask.id}
            name={overdueTask.name}
            claimedBy={overdueTask.claimedBy}
            duebyNumber={overdueTask.dueBy}
            interval={overdueTask.interval}
            dueBy={moment().endOf(overdueTask.dueBy).fromNow()}
            key={overdueTask.id}
            status="overdue"
          />
        </div>
      );
    })}
  </ul>
);

OverdueTasks.propTypes = {
  overdueTasks: PropTypes.arrayOf(PropTypes.shape({
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
    overdueTasks: urgency(tasks, 'overdue')
  };
};

OverdueTasks = connect(
  mapStateToProps
)(OverdueTasks);

export default OverdueTasks;
