import uuid from 'uuid'; //tego używaliśmy przed połączeniem z firebase
import database from '../firebase/firebase'

// //ADD_EXPENSE (przed połaczeniem z firebase i zastosowaniem thunk)
// export const addExpense = (
//     {
//         description = '',
//         note = '',
//         amount = 0,
//         createdAt = 0 
//     } = {}
// ) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// })


//ADD_EXPENSE (najpierw wysyła nowy expense do firebase a potem dispatchuje do store)
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0 
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});