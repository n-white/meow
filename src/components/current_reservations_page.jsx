import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Reservation from './reservation';
import '../styles/current_reservations_page.css';

export default class CurrentReservationsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    _.bindAll(this, ['getUserReservations']);
  }

  getUserReservations() {
    const { user, reservations } = this.props;
    return _.filter(reservations, r => r.guestId === user.name);
  }

  render() {
    const { rooms, onCancelReservation } = this.props;
    const userReservations = this.getUserReservations();

    if (!userReservations.length) {
      return (
        <div className={'currentReservations-container'}>
          <div className={'currentReservations-header'}>
            You currently have no reservations
          </div>
        </div>
      );
    }

    return (
      <div className={'currentReservations-container'}>
        <div className={'currentReservations-header'}>
          Your upcoming reservations
        </div>
        {_.map(userReservations, reservation => {
          const room = _.find(rooms, { id: reservation.roomId });
          return (
            <Reservation
              key={reservation.id}
              reservationId={reservation.id}
              roomName={room && room.name}
              start={reservation.start}
              end={reservation.end}
              onCancelReservation={onCancelReservation}
            />
          );
        })}
      </div>
    );
  }
}

CurrentReservationsPage.propTypes = {
  rooms: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  reservations: PropTypes.array.isRequired,
  onCancelReservation: PropTypes.func.isRequired,
};
