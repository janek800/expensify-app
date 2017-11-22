import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

//W poniższym teście done w argumencie wskazuje, że cały test ma być skończony kiedy wywołamy
//done() dzięki temu możemy testować asynchroniczne funkcje
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => { //chainowanie promisa
            expect(snapshot.val()).toEqual(expenseData);
            done();
        
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => { //chainowanie promisa
            expect(snapshot.val()).toEqual(expenseDefault);
            done();
        
    });
    });

// Ten test jest niepotrzebny po polaczeniu action generatora z firebase
// test('should setup add expense action object with provided values', () => {
//     const expenseData = {
//         description: 'Rent',
//         amount: 109500,
//         createdAt: 1000,
//         note: 'This was last month rent'
//     }
//     const action = addExpense(expenseData);
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData, //ES6 spread operator (zawiera to samo co obiekt po ...)
//             id: expect.any(String)//expect.any(typ) przepuszcza cokolwiek pod warunkiem że jest takiego typu jaki określiliśmy w nawiasie
//         }
//     });
// });

// Ten test jest niepotrzebny po polaczeniu action generatora z firebase
// test('should setup add expense action object with default values', () => {
//     const defaultExpenseData = {
//         description: '',
//         note : '',
//         amount: 0,
//         createdAt: 0 
//     }
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...defaultExpenseData,
//             id: expect.any(String)
//         }
//     });
// });