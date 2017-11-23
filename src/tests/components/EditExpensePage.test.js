import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

//let editExpense, removeExpense, history, wrapper; ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    //editExpense = jest.fn(); ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
    startEditExpense = jest.fn();
    //removeExpense = jest.fn(); ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            //editExpense={editExpense} ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
            startEditExpense={startEditExpense}
            //removeExpense={removeExpense} ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[2]}
        />
    );
});

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

//przed zastosowniem firebase poniższy test nazywał się 'should handle editExpense'
test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    //expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]); ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

//przed zastosowniem firebase poniższy test nazywał się 'should handle removeExpense'
test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    //expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[2].id}); ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[2].id})
});