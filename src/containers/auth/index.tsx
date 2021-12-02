import React from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../store/ducks/auth';
import { Route, Routes, Outlet } from 'react-router-dom';
import Login from '../login';

export const Authenticated = ({token, children}: any) => {
    if(token) {
        return children;
    }else {
        return (
            <Outlet/>
        )
    }
}

export default connect(isAuthenticated)(Authenticated);
