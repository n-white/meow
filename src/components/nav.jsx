import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { APP_VIEW } from './app_state_container';

export default class Nav extends React.PureComponent {
  render() {
    return (
      <div className="">
        <Button
          color="primary"
          onClick={() => this.props.updateView(APP_VIEW.CURRENT_RESERVATIONS)}
        >
          {`Current reservations (${this.props.reservationCount})`}
        </Button>
        <Button
          color="primary"
          onClick={() => this.props.updateView(APP_VIEW.CREATE_RESERVATIONS)}
        >
          Reserve a room
        </Button>
        <Button color="primary" onClick={this.props.onLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

Nav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  reservationCount: PropTypes.number.isRequired,
  updateView: PropTypes.func.isRequired,
};
