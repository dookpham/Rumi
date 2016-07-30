import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Completed from './Completed.jsx';
import moment from 'moment';

let completedStyle = {
  top: '240px',
  position: 'relative'
};

let CompletedList = ({completedList}) => (
  <ul style={completedStyle}>
    {completedList.map(completed => {
      // console.log(completed.user, completed.name);
      return (
      <Completed
        name={completed.name}
        due={moment(completed.createdAt).fromNow()}
        user={completed.user}
        key={completed.id}
      />);
    })}
  </ul>
);

CompletedList.propTypes = {
  completedList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = function(state) {
  return {
    completedList: state.completedList
  };
};

CompletedList = connect(
  mapStateToProps
)(CompletedList);

export default CompletedList;
