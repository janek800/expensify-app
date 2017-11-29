import React from 'react';
import { /*BrowserRouter*/ Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import NotFoundPage from "../components/NotFoundPage";
//import Header from "../components/Header";
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

//zanim zaimportowaliśmy createHistory, zamiast <Router history={history}></Roter> używaliśmy 
//<BrowserRouter></BrowserRouter> on ma wbudowane history ale działa tylko w routingu, 
//tak więc jeżeli chcemy mieć dostęp do histori elementów poza routingiem
//(np firebase.auth().onAuthStateChanged((user) => {} w app.js) trzeba zmienić na Router
//
//Dodaliśmy równierz <PrivateRoute/> zamiast <Route/> aby nie można było się przełączać na dowolną stronę 
//aplikacji nie będąc zalogowanym
//
//Usuneliśmy też <Header /> znad <Switch> i przenieśliśmy do PrivateRoute.js


export default AppRouter;
