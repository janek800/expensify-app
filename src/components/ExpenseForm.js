import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


const now = moment();
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '', 
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
        
    }
    // state = {                  //taki state może być jak robimy tylko AddExpensePage
    //     description: '',       //jak chcemy aby dodać EditExpensePage to musimy zrobić w constructor 
    //     note: '',              //bo trzeba jeszcze dodać warunki (ternary operators)
    //     amount: '', //tu jest przechowywane jako string, dlatego trzeba użyć parseFloat
    //     createdAt: moment(),
    //     calendarFocused: false,
    //     error: ''
    // };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));//ES6 object shorhand {description} to to samo co {description:description}
    };
    onNoteChnge = (e) => {
        const note = e.target.value;
        this.setState(() =>({ note }));
    };
    onAmountChange = (e) =>{
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { //regExp wynajdujący liczby z 2 miejscami po . !amount || pozwala kasować wpisaną wartość po jej zaznaczeniu
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {            //if (createdAt){ } zapobiega mozliwości skasowania daty przez użytkownika
            this.setState(() => ({ createdAt }));
        }      
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({calendarFocused: focused}));
    };
    onSubmit = (e) => {
        e.preventDefault();
        
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({  //te propsy zostały utworzone w pliku AddExpensePage.js w <ExpenseForm/>
                description: this.state.description, //tutaj ustalamy jak wyglądają, wykonywane będą w AddExpensePage.js
                amount: parseFloat(this.state.amount, 10) * 100, //jako obiekt expense w onSubmit={(expense) => {}}
                createdAt: this.state.createdAt.valueOf(), //.valueOf() to metoda z dokumentacji moment.js zmieniająca moment object na timestamp (w milisekundach)
                note: this.state.note
            })
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}    
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1} //ile miesięcy wyświetla się w pop-upie
                        isOutsideRange={() => false} //pozwala wybierać daty przed obecną datą
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChnge}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
        
    }
}