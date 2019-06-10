import React from 'react';
import { shallow } from 'enzyme';
import Reservation from './reservation';
import Adapter from 'enzyme-adapter-react-16';

shallow.configure({ adapter: new Adapter() })

test('Reservation', () => {
  const onCancelReservation = jest.fn()
  const props = {
    reservationId: 'some-reservation-id',
    roomName: 'some-room-name',
    start: new Date(2019, 5, 5),
    end: new Date(2019, 5, 6),
    onCancelReservation,
  };
  const subject = shallow(<Reservation {...props} />);

  expect(subject.find('.reservation-container').exists()).to.equal(true);
});