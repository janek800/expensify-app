import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow'; to importowalismy zanim korzystaliśmy z enzyme
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(toJSON(wrapper)).toMatchSnapshot(); //toJSON ustawiliśmy tak aby automatycznie się robiło i dlatego nie musimy zapisywać
   
    //expect(wrapper.find('h1').length).toBe(1); sprawdza czy istnieje jeden <h1></h1>
    //expect(wrapper.find('h1').text()).toBe('Expensify'); sprawdza czy istnieje h1 zawierający string 'Expensify'
    
   
    //tak wyglądało zanim zastosowaliśmy enzyme:
    // const renderer = new ReactShallowRenderer(); 
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});