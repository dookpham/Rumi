import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import urgency from '../urgency.service';

const inputStyle = {
  left: '-62px',
  position: 'relative',
  top: '16px',
  fontSize: '1.5em',
};

class MagnifyingGlass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // closed: true,
      outerClass: 'magOuterRing magOuterClosed',
      innerClass: 'magInnerRing magInnerClosed',
      handleClass: 'magHandle magHandleClosed',
      inputOn: false,
    };
  } 

  componentDidMount() {
    if (this.refs.searchInput) {
      console.log('searchInput exists');
      this.refs.searchInput.getDOMNode().focus();
    }
  }

  clickHandler() {
    console.log('clicked');
    if (this.props.closed) {
      this.setState({
        outerClass: 'magOuterRing magOuterStretch', 
        innerClass: 'magInnerRing magInnerStretch',
        handleClass: 'magHandle magHandleStretch',
        // closed: false
      });
      setTimeout(() => {
        this.setState({inputOn: true});
      }, 500);
    }
  }

  submitHandler() {
    if (!this.props.closed) {
      this.setState({
        outerClass: 'magOuterRing magOuterClosed', 
        innerClass: 'magInnerRing magInnerClosed',
        handleClass: 'magHandle magHandleClosed',
        // closed: true,
        inputOn: false
      });
    }
  }
  
  render() {
    var input;
    if (this.state.inputOn) {
      input = (<input autoFocus style={inputStyle}/>);
    }
    return (
    <div className="magnifyingGlass" onClick={this.clickHandler.bind(this)}>
      <div className={this.state.outerClass} />
      <div className={this.state.innerClass}/>
      <div className={this.state.handleClass}/>
      {input}
    </div>);
  } 
}

// MagnifyingGlass.propTypes = {
//   overdueTasks: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     dueBy: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
// };

// const mapStateToProps = function(state) {
//   return {
//     overdueTasks: urgency(state.tasks, 'overdue')
//   };
// };

// MagnifyingGlass = connect(
//   mapStateToProps
// )(MagnifyingGlass);

export default MagnifyingGlass;