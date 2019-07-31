import React from 'react';
import ReactDOM from 'react-dom';

import { RegisterForm } from '../components/LoginForm';
import withDefaultLayout from '../components/DefaultLayout';

function RegisterPage() {
    return withDefaultLayout(RegisterForm);
}

ReactDOM.render(
    <RegisterPage/>,
    document.getElementById('root')
);