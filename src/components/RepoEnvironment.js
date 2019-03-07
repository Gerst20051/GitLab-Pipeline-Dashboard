import React, { Component } from 'react';
import Moment from 'react-moment';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

class RepoEnvironment extends Component {
  render() {
    const { name, message, date } = this.props;

    return (
      <>
        <Typography><b>{name}</b> (<Tooltip title={date}><Moment fromNow>{date}</Moment></Tooltip>)</Typography>
        <Typography>{message}</Typography>
      </>
    );
  }
}

export default RepoEnvironment;
