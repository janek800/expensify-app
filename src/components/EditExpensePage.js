import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
//import { editExpense, removeExpense } from '../actions/expenses'; tak było zanim używaliśmy firebase
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

//Wersja stateless functional component (przed zastosowaniem map Dispatch to props)

// const EditExpensePage = (props) => { //tutaj w (props) są propsy i state, które niżej zmapowaliśmy
//     return (
//     // <div>
//     //     Editing the expense with id of {props.match.params.id} to było tu wcześniej aby sprawdzać czy wyświetla się odpowiedni expense
//     // </div>
//     <div>
//         <ExpenseForm
//             expense={props.expense}
//             onSubmit={(expense) => {
//                 props.dispatch(editExpense(props.expense.id, expense)); //props.expense.id można zastąpić {props.match.params.id}
//                 props.history.push('/');
//             }}
//          />
//          <button onClick={(expense) => {
//             props.dispatch(removeExpense({id: props.expense.id}));
//             props.history.push('/');
//         }}>Remove</button>
//     </div>
// );
// };

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
      //this.props.editExpense(this.props.expense.id, expense); ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
      this.props.startEditExpense(this.props.expense.id, expense);
      this.props.history.push('/');
    };
    onRemove = () => {
        //this.props.removeExpense({ id: this.props.expense.id }); ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}
                >Remove</button>
            </div>    
        );
    }
};

const mapStateToProps = (state, props) => {//mapuje state na propsy, które dalej są przekazywane do EditExpensePage, 
    return {                             //oraz propsy na propsy, które też są przekazywane do EditExpensePage
        expense: state.expenses.find((expense) => { //wyszukuje w tablicy expenses tego expense, którego id jest takie same jak id wyświetlanego właśnie expense
            return expense.id === props.match.params.id
        })
    }
}

const mapDispatchToProps = (dispatch, props) => ({ //propsy są potrzebne dla removeExpense, przekazywane jest w nich id expense do usunięcia
    //editExpense: (id, expense) => dispatch(editExpense(id, expense)), ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    //removeExpense: (data) => dispatch(removeExpense(data)) ta linijka zamiast tej poniżej była kiedy nie używaliśmy jeszcze firebase
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);