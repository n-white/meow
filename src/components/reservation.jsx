import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import '../styles/reservation.css';

export default function Reservation({
  roomName,
  start,
  end,
  onCancelReservation,
  reservationId,
}) {
  const startDate = moment(start).isValid()
    ? moment(start).format('M/D/YYYY')
    : 'N/A';
  const endDate = moment(end).isValid()
    ? moment(end).format('M/D/YYYY')
    : 'N/A';

  return (
    <div className={'reservation-container'}>
      <div className={'reservation-dates-container'}>
        <div className={'reservation-date'}>{startDate}</div>
        <div className={'reservation-date'}>to</div>
        <div className={'reservation-date'}>{endDate}</div>
      </div>
      <div className={'reservation-room-container'}>{roomName}</div>
      <div className={'reservation-cancel-button-container'}>
        <Button
          variant="contained"
          className={'reservation-cancel-button'}
          onClick={() => onCancelReservation(reservationId)}
        >
          cancel
        </Button>
      </div>
    </div>
  );
}

Reservation.propTypes = {
  reservationId: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  onCancelReservation: PropTypes.func.isRequired,
};
