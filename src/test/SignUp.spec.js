import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import SignUp from '../container/SignUp';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('<SignUp />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  });

  it('should render without error', () => {
    expect(wrapper.find('form')).to.have.lengthOf(1);
  });

  it('should redirect to logIn', () => {
    const history = createMemoryHistory();
    wrapper.find('a').simulate('click');
    expect(history.location.pathname).to.be.equal('/');
  });
});
