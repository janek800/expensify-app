import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest //zawiera pozostałe propsy, których nie zdestrukturyzowaliśmy (zdestrukturyzowaliśmy isAuthenticated i component: Component)
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid //!! zamienia uid ze state na true (jeżeli nie ma uid to zostaje undefined)
});

export default connect(mapStateToProps)(PublicRoute);