import React from 'react';
import ReactDOM from 'react-dom';

import { LoginForm } from '../components/LoginForm';
import withDefaultLayout from '../components/DefaultLayout';

function LoginPage() {
    return withDefaultLayout(LoginForm());
}

ReactDOM.render(
    <LoginPage/>,
    document.getElementById('root')
);