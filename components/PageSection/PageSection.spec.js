var React = require('react')
var TestUtils = require('react/lib/ReactTestUtils')
var expect = require('expect')
import { shallow, mount, render } from 'enzyme'
var PageSection = require('./PageSection.cjsx')

describe('hello', function () {
  it('renders without problems', function () {
    const wrapper = shallow(<PageSection contentState="Ready"><h1>Hello</h1></PageSection>)
    expect(wrapper.find('h1').length).toEqual(2)
  });
});