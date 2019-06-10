import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';

import LoginPage from './app_state_container';

configure({adapter: new Adapter()});

describe('LoginPage', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<LoginPage />);
  });

  test('it renders input', () => {
    expect(subject.find('.login-input-container')).toBeDefined();
  });

  test('it renders login button', () => {
    expect(subject.find('.login-button')).toBeDefined();
  });

  // NOTE: this is meant to be a simplistic test
  // with extra time, I would write more extensive tests
  // including login action and http requests
});
