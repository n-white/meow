import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import CreateReservationPage from './create_reservation_page';
import Room from '../domain/room';
import Reservation from '../domain/reservation';
import User from '../domain/user';

configure({adapter: new Adapter()});

describe('CreateReservationPage', () => {
  const onCreateReservation = jest.fn();
  const rooms = [
    new Room({ id: 1, name: 'King' }),
    new Room({ id: 2, name: 'Queen' }),
    new Room({ id: 3, name: 'Single' }),
  ]

  const reservations = [
    new Reservation({ id: 1, roomId: 1, guestId: 'trent', start: new Date(2019, 3, 4), end: new Date(2019, 4, 3) }),
    new Reservation({ id: 2, roomId: 2, guestId: 'trent', start: new Date(2019, 5, 4), end: new Date(2019, 6, 5) }),
  ];

  const user = new User({ name: 'trent' });

  let props = {
    reservations,
    rooms,
    user,
    onCreateReservation,
  };
  let subject;

  describe('when create reservation button clicked', () => {
    describe('with valid parameters', () => {
      beforeEach(() => {
        subject = shallow(<CreateReservationPage {...props} />);
        subject.setState({
          selectedRoomId: 3,
          selectedStartDate: new Date(2019, 3, 4),
          selectedEndDate: new Date(2019, 4, 5),
        });
      });

      test('it invokes onCreateReservation with reservation attributes', () => {
        subject.find('.createReservation-create-button').at(0).simulate('click');
        expect(onCreateReservation).toHaveBeenCalledWith({
          end: new Date(2019, 4, 5),
          guestId: user.name,
          roomId: 3,
          start: new Date(2019, 3, 4),
        });
      });
    });

    describe('with invalid dates', () => {
      beforeEach(() => {
        subject = shallow(<CreateReservationPage {...props} />);
        subject.setState({
          selectedRoomId: 3,
          selectedEndDate: new Date(2019, 3, 4),
          selectedStartDate: new Date(2019, 4, 5),
        });
      });

      test('it sets error message to state', () => {
        subject.find('.createReservation-create-button').at(0).simulate('click');
        expect(subject.state('errorMessage')).toEqual('Oops! The Check-in date must come before the Check-out date');
      });
    });

    describe('with missing reservation attribute', () => {
      beforeEach(() => {
        subject = shallow(<CreateReservationPage {...props} />);
        subject.setState({
          selectedRoomId: null,
          selectedStartDate: new Date(2019, 3, 4),
          selectedEndDate: new Date(2019, 4, 5),
        });
      });

      test('it sets error message to state', () => {
        subject.find('.createReservation-create-button').at(0).simulate('click');
        expect(subject.state('errorMessage')).toEqual('Reservations must include a Check-in date, Check-out date and room selection');
      });
    });
  });
});
