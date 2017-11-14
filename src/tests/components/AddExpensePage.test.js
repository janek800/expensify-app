import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

//beforeEach wykona się w każdym teście przed expect dzieki czemu nie trzeb pisać kilka razy tego samego kodu
//mozna wielokrotnie używać spy i wrapper
beforeEach(() => {
    addExpense = jest.fn(); //spy function na potrzeby testowania https://facebook.github.io/jest/docs/en/mock-functions.html
    history = { push: jest.fn() }; //spy function na potrzeby testowania https://facebook.github.io/jest/docs/en/mock-functions.html
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});


test('should render AddExpensePage correctly', () => {
    //dzięki beforeEach nie musimy tego tu zapisywać
    // const addExpense = jest.fn(); 
    // const history = { push: jest.fn() }; 
    // const wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    //dzięki beforeEach nie musimy tego tu zapisywać
    // const addExpense = jest.fn(); 
    // const history = { push: jest.fn() }; 
    // const wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});