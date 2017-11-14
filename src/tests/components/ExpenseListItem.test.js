import React from 'react';
//import { Link } from 'react-router-dom'; to importujemy tylko jeżeli robimy alternatywną wersję
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem with data', () => {
    // alternatywna wersja:
    // const wrapper = shallow(
    //     <div>
    //     <Link to={`/edit/${expenses[0].id}`}>
    //          <h3>{expenses[0].description}</h3>
    //     </Link>
    //     <p>{expenses[0].amount} - {expenses[0].createdAt}</p>
    //     </div>
    // );
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});