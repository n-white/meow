import _ from 'lodash';
import axios from 'axios';
import React from 'react';

import '../styles/app_state_container.css';
import CreateReservationPage from './create_reservation_page';
import CurrentReservationsPage from './current_reservations_page';
import LoginPage from './login_page';
import Nav from './nav';
import Reservation from '../domain/reservation';
import Room from '../domain/room';
import { newId } from '../id_generator';

export const APP_VIEW = {
  VIEW_RESERVATIONS: 'VIEW_RESERVATIONS',
  CREATE_RESERVATIONS: 'CREATE_RESERVATIONS',
  LOGIN: 'LOGIN',
};

export default class AppStateContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      view: APP_VIEW.LOGIN,
      user: '',
      reservations: [],
    };

    _.bindAll(this, [
      'updateView',
      'renderPage',
      'onCancelReservation',
      'onCreateReservation',
      'onLogout',
      'loginUser',
      'renderNav',
    ]);
  }

  updateView(view) {
    this.setState({ view });
  }

  onCancelReservation(reservationId) {
    axios
      .post('http://localhost:1337/reservations/cancel', { reservationId })
      .then(
        result => {
          axios
            .get('http://localhost:1337/reservations', {
              withCredentials: true,
            })
            .then(
              result => {
                const reservations = _.map(
                  result.data,
                  r => new Reservation(r)
                );
                this.setState({ reservations });
              },
              error => console.log(error)
            );
        },
        error => console.log(error)
      );
  }

  onLogout() {
    axios
      .get('http://localhost:1337/logout', {
        withCredentials: true,
      })
      .then(
        result => {
          console.log(result);
        },
        error => console.log(error)
      );

    this.setState({ view: APP_VIEW.LOGIN, user: '' });
  }

  onCreateReservation({ start, end, roomId, guestId }) {
    const newReservation = new Reservation({
      id: newId(),
      roomId,
      guestId,
      start,
      end,
    });

    axios.post('http://localhost:1337/reservations/add', newReservation).then(
      result => {
        axios
          .get('http://localhost:1337/reservations', { withCredentials: true })
          .then(
            result => {
              const reservations = _.map(result.data, r => new Reservation(r));
              this.setState({ reservations });
            },
            error => console.log(error)
          );
      },
      error => console.log(error)
    );
  }

  loginUser(user) {
    this.setState({ user: user, view: APP_VIEW.VIEW_RESERVATIONS });

    axios.get('http://localhost:1337/rooms', { withCredentials: true }).then(
      result => {
        const rooms = _.map(result.data, r => new Room(r));
        this.setState({ rooms });

        axios
          .get('http://localhost:1337/reservations', { withCredentials: true })
          .then(
            result => {
              const reservations = _.map(result.data, r => new Reservation(r));
              this.setState({ reservations });
            },
            error => console.log(error)
          );
      },
      error => console.log(error)
    );
  }

  renderPage() {
    const { view, rooms, user, reservations } = this.state;

    switch (view) {
      case APP_VIEW.LOGIN:
        return <LoginPage loginUser={this.loginUser} />;
      case APP_VIEW.VIEW_RESERVATIONS:
        return (
          <CurrentReservationsPage
            rooms={rooms}
            user={user}
            reservations={reservations}
            onCancelReservation={this.onCancelReservation}
          />
        );
      case APP_VIEW.CREATE_RESERVATIONS:
        return (
          <CreateReservationPage
            rooms={rooms}
            user={user}
            reservations={reservations}
            onCreateReservation={this.onCreateReservation}
          />
        );
      default:
        return null;
    }
  }

  renderNav() {
    const { view, reservations, user } = this.state;
    const userReservations = _.filter(
      reservations,
      r => r.guestId === _.get(user, 'name')
    );
    const reservationCount = userReservations ? userReservations.length : 0;

    if (view === APP_VIEW.LOGIN) {
      return null;
    }

    return (
      <Nav
        updateView={this.updateView}
        reservationCount={reservationCount}
        onLogout={this.onLogout}
      />
    );
  }

  render() {
    return (
      <div className={'appStateContainer'}>
        {this.renderNav()}
        {this.renderPage()}
      </div>
    );
  }
}
