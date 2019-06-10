import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import Reservation from './reservation';

configure({adapter: new Adapter()});

describe('Reservation', () => {
  let subject;
  const onCancelReservation = jest.fn();
  const props = {
    reservationId: 'some-reservation-id',
    roomName: 'some-room-name',
    start: new Date(2019, 5, 5),
    end: new Date(2019, 5, 6),
    onCancelReservation,
  };

  beforeEach(() => {
    subject = shallow(<Reservation {...props} />);
  });

  test('renders', () => {
    expect(subject.find('.reservation-container')).toBeDefined();
    expect(subject.find('.reservation-date').at(0).text()).toEqual('6/5/2019');
    expect(subject.find('.reservation-date').at(2).text()).toEqual('6/6/2019');
    expect(subject.find('.reservation-room-container').text()).toEqual(props.roomName);
  });

  test('invokes onCancelReservation when cancel button clicked', () => {
    subject.find('.reservation-cancel-button').simulate('click');
    expect(onCancelReservation).toHaveBeenCalledWith(props.reservationId);
  });
});