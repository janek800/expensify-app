import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({          //toEqual używamy jak porównujemy dwa obiekty lub tablice
        type: 'REMOVE_EXPENSE',      // toBe używamy jak porównujemy booleans, numbers, strings
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense( '123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last month rent'
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData, //ES6 spread operator (zawiera to samo co obiekt po ...)
            id: expect.any(String)//expect.any(typ) przepuszcza cokolwiek pod warunkiem że jest takiego typu jaki określiliśmy w nawiasie
        }
    });
});

test('should setup add expense action object with default values', () => {
    const defaultExpenseData = {
        description: '',
        note : '',
        amount: 0,
        createdAt: 0 
    }
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...defaultExpenseData,
            id: expect.any(String)
        }
    });
});