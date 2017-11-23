
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
//import './playground/promises'; to musi być jak chcemy aby działał plik promises.js w playground


const store = configureStore();

//Tego używaliśmy zanim mieliśmy działającą bazę danych
// store.dispatch(addExpense({  description: 'Water bill', amount: 4500}));
// store.dispatch(addExpense({  description: 'Gas bill', createdAt: 1000}));
// store.dispatch(addExpense({  description: 'Rent', amount: 109500}));


//Tego uzywaliśmy zanim reszta aplikacji zyskała zdolność komunikacji ze store
// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);


const jsx = (
    <Provider store={store/*to jest zmienna którą utworzyliśmy wyżej i która zawiera configureStore()*/}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});






