//Expenses Reducer

const expensesReducerDefaultState = []

/*const expensesReducer =*/export default (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [               //ARRAY SPREAD OPERATOR to to samo co return state.concat (action.expense), 
                ...state,          //tworzy nową tablicę i dodaje w niej action.expense
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => {
                return id !== action.id
            });
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates //ważne aby było po ...expense, bo to nadpisuje
                    };
                }
                else {
                    return expense
                };
            });
        default:
            return state;
    }

};

//export default expensesReducer; export mozna zrobić tu albo wyżej zamiast definicji const expensesReducer =