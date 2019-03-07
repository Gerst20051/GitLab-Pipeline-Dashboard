import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import RepoEnvironment from './RepoEnvironment';

const styles = {
  card: {
    marginBottom: 20,
    marginTop: 20,
  },
  cardActions: {
    marginBottom: 8,
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
};

class RepoCard extends Component {
  render() {
    const { classes, environment } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Link href={`${environment.host}/${environment.repo}`} target="_blank">
            <Typography className={classes.title} gutterBottom>
              {environment.name}
            </Typography>
          </Link>
          { environment.environments.map((environment, index) => environment.latest.last_deployment && (
            <div key={`CardContentDiv:${environment.repo}:${environment.latest.last_deployment.id}`}>
              { !!index && <br /> }
              <RepoEnvironment
                name={environment.name}
                message={environment.latest.last_deployment.commit.title}
                date={environment.latest.last_deployment.commit.created_at}
              />
            </div>
          ))}
        </CardContent>
        <CardActions className={classes.cardActions}>
          { environment.environments.map(environment => environment.latest.last_deployment && (
            <Button key={`Button:${environment.latest.last_deployment.id}`} variant="outlined" size="small" color="primary" href={environment.latest.last_deployment.commit.commit_url} target="_blank">{environment.name}</Button>
          ))}
        </CardActions>
      </Card>
    );
  }
}

RepoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepoCard);
