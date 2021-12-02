import React from 'react';
import './App.css';
import { Authenticated } from './containers/auth';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './containers/login';
import Signup from './containers/signup';
import { Dashboard } from './containers/dashboard';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <Authenticated>
            <Dashboard/>
          </Authenticated>
        }>
          <Route path="signup" element={<Signup/>}/>
          <Route path="" element={<Login/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
