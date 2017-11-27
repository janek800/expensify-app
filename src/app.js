
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
//import { setTextFilter } from './actions/filters';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
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

//const i let poniżej sprawdzają czy aplikacja była już renderowana, jeżeli nie to renderują ją 1 raz
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}


ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// To było tu zanim zaimplementowaliśmy atentyfikacje
// store.dispatch(startSetExpenses()).then(() => {
//   ReactDOM.render(jsx, document.getElementById('app'));
// });

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
          });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});






