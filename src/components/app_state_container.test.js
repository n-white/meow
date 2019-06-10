import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import AppStateContainer, { APP_VIEW } from './app_state_container';
import Nav from './nav';
import CreateReservationPage from './create_reservation_page';
import CurrentReservationsPage from './current_reservations_page';

configure({adapter: new Adapter()});

describe('CreateReservationPage', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<AppStateContainer />);
  });

  test('it renders Nav', () => {
    subject.setState({ view: APP_VIEW.LOGIN });
    expect(subject.find(Nav)).toBeDefined();
  });

  test('it renders CreateReservationPage', () => {
    subject.setState({ view: APP_VIEW.CREATE_RESERVATIONS });
    expect(subject.find(CreateReservationPage)).toBeDefined();
  });

  test('it renders CurrentReservationsPage', () => {
    subject.setState({ view: APP_VIEW.CURRENT_RESERVATIONS });
    expect(subject.find(CurrentReservationsPage)).toBeDefined();
  });

  // NOTE: this is meant to be a simplistic test
  // with extra time, I would write more extensive tests for the state management
});
