import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import urgency from '../urgency.service';

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
            dueBy={moment().endOf(recentTask.dueBy).fromNow()}
            overdue={2}
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
  return {
    recentTasks: urgency(state.tasks, 'recent'),
    completedList: state.completedList,
  };
};

RecentTasks = connect(
  mapStateToProps
)(RecentTasks);

export default RecentTasks;
