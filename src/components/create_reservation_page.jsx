import _ from 'lodash';
import Button from '@material-ui/core/Button';
import DatePicker from 'react-date-picker';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';

import '../styles/create_reservation_page.css';

export default class CreateReservationPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedEndDate: null,
      selectedRoomId: _.get(_.first(this.props.rooms), 'id', null),
      selectedStartDate: null,
      errorMessage: '',
    };

    _.bindAll(this, [
      'createReservation',
      'getAvailableRooms',
      'getUnavailableRoomIds',
      'onEndDateChange',
      'onRoomChange',
      'onStartDateChange',
      'renderAvailableRooms',
    ]);
  }

  createReservation() {
    const { selectedRoomId, selectedStartDate, selectedEndDate } = this.state;
    const hasMissingValue = !selectedRoomId || !selectedStartDate || !selectedEndDate;

    if (hasMissingValue) {
      this.setState({
        errorMessage:
          'Reservations must include a Check-in date, Check-out date and room selection',
      });
    }

    const hasInvalidDateRange = selectedStartDate > selectedEndDate;

    if (hasInvalidDateRange) {
      this.setState({
        errorMessage:
          'Oops! The Check-in date must come before the Check-out date',
      });
    }

    if (hasMissingValue || hasInvalidDateRange) {
      return;
    }

    this.setState({ errorMessage: '' });

    this.props.onCreateReservation({
      end: selectedEndDate,
      guestId: this.props.user.name,
      roomId: selectedRoomId,
      start: selectedStartDate,
    });

    this.setState({ selectedStartDate: null, selectedEndDate: null });
  }

  getUnavailableRoomIds() {
    const { selectedStartDate, selectedEndDate } = this.state;
    return _.uniq(
      _.map(
        _.filter(this.props.reservations, room => {
          if (!selectedStartDate || !selectedEndDate) {
            return false;
          }
          return selectedEndDate > room.start && selectedStartDate < room.end;
        }),
        reservation => reservation.roomId
      )
    );
  }

  getAvailableRooms() {
    let availableRooms = this.props.rooms;
    const unavailableRoomIds = this.getUnavailableRoomIds();
    availableRooms = _.reject(availableRooms, room =>
      _.includes(unavailableRoomIds, room.id)
    );
    return availableRooms;
  }

  renderAvailableRooms() {
    const availableRooms = this.getAvailableRooms();

    if (!availableRooms) {
      return null;
    }

    return _.map(availableRooms, room => {
      return (
        <MenuItem key={room.id} value={room.id}>
          {room.name}
        </MenuItem>
      );
    });
  }

  onRoomChange(e) {
    const id = e.target.value;
    this.setState({ selectedRoomId: id });
  }

  onStartDateChange(date) {
    this.setState({ selectedStartDate: date });
  }

  onEndDateChange(date) {
    this.setState({ selectedEndDate: date });
  }

  render() {
    return (
      <div className={'createReservation-container'}>
        <div className={'createReservation-header-padding'} />
        <div className={'createReservation-header'}>Check-in Time</div>
        <DatePicker
          onChange={this.onStartDateChange}
          value={this.state.selectedStartDate}
        />
        <div className={'createReservation-header'}>Check-out Time</div>
        <DatePicker
          onChange={this.onEndDateChange}
          value={this.state.selectedEndDate}
        />
        <div className={'createReservation-header'}>Room Type</div>
        <FormControl>
          <Select
            className={'createReservation-selectRoom'}
            onChange={this.onRoomChange}
            value={this.state.selectedRoomId || ''}
          >
            {this.renderAvailableRooms()}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={'createReservation-create-button'}
          onClick={this.createReservation}
        >
          Create Reservation
        </Button>
        <div className={'createReservation-error'}>
          {this.state.errorMessage}
        </div>
        <div className={'createReservation-footer-padding'} />
      </div>
    );
  }
}

CreateReservationPage.propTypes = {
  rooms: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  reservations: PropTypes.array.isRequired,
  onCreateReservation: PropTypes.func.isRequired,
};
