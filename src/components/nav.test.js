import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import Nav from './Nav';
import { APP_VIEW } from './app_state_container';

configure({adapter: new Adapter()});

describe('Nav', () => {
  let subject;
  const onLogout = jest.fn();
  const updateView = jest.fn();
  const props = {
    reservationCount: 10,
    updateView,
    onLogout,
  };  

  beforeEach(() => {
    subject = shallow(<Nav {...props} />);
  });

  test('when current reservations button clicked', () => {
    subject.find('.nav-current-reservations').at(0).simulate('click');
    expect(updateView).toHaveBeenCalledWith(APP_VIEW.CURRENT_RESERVATIONS);
  });

  test('when create reservations button clicked', () => {
    subject.find('.nav-create-reservations').at(0).simulate('click');
    expect(updateView).toHaveBeenCalledWith(APP_VIEW.CREATE_RESERVATIONS);
  });

  test('when logout button clicked', () => {
    subject.find('.nav-logout').at(0).simulate('click');
    expect(onLogout).toHaveBeenCalled();    
  });
});