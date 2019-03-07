import axios from 'axios';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

import RepoCard from './RepoCard';
import SearchAppBar from './SearchAppBar';

const styles = {
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  root: {
    margin: '20px auto',
    maxWidth: 600,
    padding: '5px 20px 10px',
  },
};

class Dashboard extends Component {
  state = {
    environments: {},
    formattedEnvironments: [],
    loading: true,
    searchTerm: '',
  };

  componentDidMount() {
    this.axiosRequest = axios.get('environments.json')
      .then(({ data }) => {
        this.setState({
          environments: data,
          formattedEnvironments: this.getReposThatHaveEnvironments(data),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.axiosRequest.abort();
  }

  getReposThatHaveEnvironments = environments => {
    const keys = Object.keys(environments);
    const repos = [];
    for (const key of keys) {
      if (environments[key].environments && environments[key].environments.length) {
        repos.push(key);
      }
    }
    const output = [];
    for (const repo of repos.sort((a, b) => a.split('/')[1].localeCompare(b.split('/')[1]))) {
      output.push({
        name: repo.split('/')[1],
        repo: repo,
        ...environments[repo],
      });
    }
    return output;
  };

  render() {
    const { classes } = this.props;
    const { formattedEnvironments, loading, searchTerm } = this.state;

    const filteredEnvironments = formattedEnvironments.filter(environment => {
      return !searchTerm || environment.name.includes(searchTerm);
    });

    return (
      <>
        <SearchAppBar onChange={searchTerm => this.setState({ searchTerm })} />
        <Paper className={classes.root}>
          { !loading && filteredEnvironments.length ? filteredEnvironments.map(environment => environment.environments[0].latest.last_deployment && (
            <RepoCard key={environment.repo} environment={environment} />
          )) : (loading
            ? <Typography className={classes.label}>Loading...</Typography>
            : <Typography className={classes.label}>No Repos Match Search</Typography>
          )}
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Dashboard);
