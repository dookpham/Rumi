import React from 'react';
import { connect } from 'react-redux';
import { completeTaskToServer } from '../actions/taskActions';
import CircularProgress from 'material-ui/CircularProgress';

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
  }

  completeTask () {
    let taskId = this.props.id;
    this.props.dispatch(completeTaskToServer({ taskId }));
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="outerTaskBox">
          <CircularProgress mode={'determinate'} value={'72'} size={2} innerStyle="circleProgress" />
          <div className="innerTaskText">
            {this.props.name}
          </div>
        </div>
      </div>
    );
  }
}

// Task = connect()(Task);
// onTouchTap={this.completeTask.bind(this)}
/*
<div className="outerTaskBox">
    <canvas ref="canvas" width={108} height={108} />

</div>
*/
export default Task;
