import React, { PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

let style = {
  padding: '6px',
  width: '720px',
  margin: '0 auto',
};

const Completed = ({name, due, user}) => (
  <Card>
    <CardHeader
      title={name}
      subtitle={`Completed by ${user} ${due}`}
      avatar="http://lorempixel.com/100/100/nature/"
      style={style}
    />
  </Card>
);

Completed.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
};

export default Completed;
/*
Onclick of completed tasks, can show additional information.
This functionality can easily be re-added, but I am not sure if it is necessary.

props on CardHeader:
  actAsExpander={true}
  showExpandableButton={true}

comp below CardHeader:
  <CardText expandable={true}>
    {`${user} completed ${name} ${due}`}
  </CardText>
*/
