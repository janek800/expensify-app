import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// tak to wyglądało zanim zastosowaliśmy mapDispatchToProps 
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit={(expense) => {
//                 props.dispatch(addExpense(expense)); 
//                 props.history.push('/'); //to po submicie przekierowuje do dashboard page
//             }}
//         />
//     </div>
// );

// export default connect()(AddExpensePage);

//Poniżej wersja z mapDispatchToProps zastosowanym aby dało się to przetestować, zastosowaliśmy class constructor
//aby uniknąć inline functions

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/'); //to po submicie przekierowuje do dashboard page
    };
    render() {
        return (
            <div>
            <h1>Add Expense</h1>
            <ExpenseForm
                onSubmit={this.onSubmit}//w tej linijce nie chcemy inline function, dlatego użyliśmy class constructor
            />
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({ 
        addExpense: (expense) => dispatch(addExpense(expense))
});

// alternatywny sposób zapisu:
// const mapdispatchToProps = (dispatch) => {
//     return {
//         onSubmit: (expense) => dispatch(addExpense(expense))
//     };
// };

export default connect(undefined, mapDispatchToProps)(AddExpensePage); //undefined jest dlatego, ze nie potrzebujemy mapState to props w tym komponencie