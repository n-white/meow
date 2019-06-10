import _ from 'lodash';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import React from 'react';

import '../styles/login_page.css';
import User from '../domain/user';

axios.defaults.withCredentials = true;
const LOGIN_OPTIONS = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers':
    'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Access-Control-Allow-Methods':
    'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Origin': 'http://localhost:1337',
};

export default class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    _.bindAll(this, ['requestLogin']);
  }

  requestLogin() {
    if (!this.state.userName) {
      return;
    }

    axios
      .post(
        'http://localhost:1337/user',
        { userName: this.state.userName },
        LOGIN_OPTIONS
      )
      .then(
        result => {
          this.props.loginUser(new User({ name: this.state.userName }));
        },
        error => console.log(error)
      );
  }

  render() {
    return (
      <div className={'login-container'}>
        <div className={'login-input-container'}>
          <Input
            type="text"
            value={this.state.userName}
            onChange={this.handleNameChange}
            placeholder="choose a username"
            fullWidth
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.requestLogin}
          className={'login-button'}
        >
          login
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};
