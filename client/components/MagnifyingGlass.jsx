import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import { searchClose, searchOpen, searchText } from '../actions/searchActions';

const inputStyle = {
  left: '-62px',
  position: 'absolute',
  top: '16px',
  fontSize: '1.5em',
  width: '184px',
};

const closeBtnStyle = {
  position: 'absolute',
  fontSize: '1.5em',
  left: '140px',
  top: '19px',
  color: '#FA0'
};

const classNames = {
  outer: 'magOuterRing magOuter',
  inner: 'magInnerRing magInner',
  handle: 'magHandle magHandle',
};

class MagnifyingGlass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOn: false,
    };
  } 

  clickHandler() {
    console.log('clicked');
    if (this.props.search.closed) {
      this.props.dispatch(searchOpen());

      //delay turning on the input a bit
      setTimeout(() => {
        this.setState({inputOn: true});
      }, 250);
    }
  }

  updateSearchString(e) {
    console.log(e.target.value);
    this.props.dispatch(searchText(e.target.value));
  }

  closeSearch() {
    this.props.dispatch(searchClose());
  }
  
  render() {
    var input;
    if (this.state.inputOn) {
      input = (
        <div>
          <input autoFocus value={this.props.search.searchText} style={inputStyle} onChange={this.updateSearchString.bind(this)}/>
          <p style={closeBtnStyle} onClick={this.closeSearch.bind(this)}>X</p>
        </div>
      );
    }

    var classNameEnd = 'Stretch';
    if (this.props.search.closed) {
      input = null;
      classNameEnd = 'Closed';
      this.state.inputOn = false;
    } 
    return (
    <div className="magnifyingGlass" onClick={this.clickHandler.bind(this)}>
      <div className={ classNames.outer + classNameEnd } />
      <div className={ classNames.inner + classNameEnd }/>
      <div className={ classNames.handle + classNameEnd }/>
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

const mapStateToProps = function(state) {
  return {
    search: state.search
  };
};

MagnifyingGlass = connect(
  mapStateToProps
)(MagnifyingGlass);

export default MagnifyingGlass;