import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import urgency from '../urgency.service';

let UrgentTasks = ({urgentTasks}) => (
  <ul>
    {urgentTasks.map(urgentTask => {
      return (
        <div className="col-xs-3" key={urgentTask.id}>
          <Task
            id={urgentTask.id}
            name={urgentTask.name}
            dueBy={moment().endOf(urgentTask.dueBy).fromNow()}
            color={1}
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
  return {
    urgentTasks: urgency(state.tasks, 'urgent')
  };
};

UrgentTasks = connect(
  mapStateToProps
)(UrgentTasks);

export default UrgentTasks;