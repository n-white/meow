import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import CurrentReservationsPage from './current_reservations_page';
import Room from '../domain/room';
import Reservation from '../domain/reservation';
import User from '../domain/user';

configure({adapter: new Adapter()});

describe('CurrentReservationsPage', () => {
  const onCancelReservation = jest.fn();
  const rooms = [
    new Room({ id: 1, name: 'King' }),
    new Room({ id: 2, name: 'Queen' }),
    new Room({ id: 3, name: 'Single' }),
  ]

  let reservations;

  const user = new User({ name: 'trent' });

  let props = {
    reservations,
    rooms,
    user,
    onCancelReservation,
  };
  let subject;

  describe('with reservations', () => {
    beforeEach(() => {
      props.reservations = [
        new Reservation({ id: 1, roomId: 1, guestId: 'trent', start: new Date(2019, 3, 4), end: new Date(2019, 4, 3) }),
        new Reservation({ id: 2, roomId: 2, guestId: 'trent', start: new Date(2019, 5, 4), end: new Date(2019, 6, 5) }),
      ];
      subject = shallow(<CurrentReservationsPage {...props} />);
    });

    test('it renders reservations header', () => {
      expect(subject.find('.currentReservations-header').text()).toEqual('Your upcoming reservations');
    });

    test('it renders reservations', () => {
      expect(subject.find('.currentReservations-container').children().length).toEqual(3);
    });
  });

  describe('without reservations', () => {
    beforeEach(() => {
      props.reservations = [];
      subject = shallow(<CurrentReservationsPage {...props} />);
    });

    test('it renders reservations header', () => {
      expect(subject.find('.currentReservations-header').text()).toEqual('You currently have no reservations');
    });

    test('it does not renders reservations', () => {
      expect(subject.find('.currentReservations-container').children().length).toEqual(1);
    });
  });
});