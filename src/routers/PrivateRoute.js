import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from "../components/Header";

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest //zawiera pozostałe propsy, których nie zdestrukturyzowaliśmy (zdestrukturyzowaliśmy isAuthenticated i component: Component)
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid //!! zamienia uid ze state na true (jeżeli nie ma uid to zostaje undefined)
});

export default connect(mapStateToProps)(PrivateRoute);