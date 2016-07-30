import React from 'react';
import { connect } from 'react-redux';
import { completeTaskToServer } from '../actions/taskActions';

// Material things
import CircularProgress from 'material-ui/CircularProgress';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';

let style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden'
};

class Task extends React.Component {
  constructor(props) {
    super(props);
    console.log('Task props:', props);
    this.state = {
      open: false,
    }
  }

  completeTask() {
    let taskId = this.props.id;
    this.props.dispatch(completeTaskToServer({ taskId }));
  }

  componentDidMount() {
    const colors = {
      recent: '#5ED848',
      urgent: '#E39E2E',
      overdue: '#F0401D',
    }
  }

  // helpers for the model
  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  claimTask() {
    let taskId = this.props.id;
    console.log(taskId);
    console.log(this.props);
    // this.props.dispatch(claimTaskToServer( {taskId} ));
  }

  render() {
    return (
      <div>
        <div className="outerTaskBox" onTouchTap={this.handleTouchTap.bind(this)}>
          <CircularProgress mode={'determinate'} value={'72'} size={2} innerStyle="circleProgress" />
          <div className="innerTaskText">
            {this.props.name}
          </div>
        </div>
        <div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}>
          <Menu>
            <MenuItem
              primaryText="Claim for later"
              onClick={this.claimTask.bind(this)} />
            <MenuItem
              primaryText="Complete"
              onClick={this.completeTask.bind(this)} />
            <MenuItem
              primaryText="edit time due"
              onClick={() => {
                console.log('edit due time of the task')
              }} />
          </Menu>
        </Popover>
      </div>
      </div>
    );
  }
}

Task = connect()(Task);
// onTouchTap={this.completeTask.bind(this)}
/*
<div className="outerTaskBox">
    <canvas ref="canvas" width={108} height={108} />

</div>
*/
export default Task;
