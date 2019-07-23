import React, { FormEvent } from 'react';

export interface LoginProps {
    handleSubmit: any
}

export interface LoginState {
    username: string,
    password: string,
}

export class AbstractLoginForm extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event: any) {
        this.setState({
            username: event.target.value,
        })
    }

    handlePasswordChange(event: any) {
        this.setState({
            password: event.target.value,
        })
    }

    //TODO- make usernames between 8 and 16 characters
    // and strictly alphanumeric
    isValidUsername(username: string): boolean {
        return true;
    }

    render() {
        return (
          <form onSubmit={this.props.handleSubmit.bind(this)}>
            <label>
              Username:
              <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            </label>
            <label>
              Password:
              <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}

export function LoginForm() {
    return (
        <AbstractLoginForm
            handleSubmit={ (event: any) => {
                console.log("Submitting Login form!");
                // TODO send to server and redirect as necessary
                event.preventDefault();
            }}
        />
    );
}

export function RegisterForm() {
    return (
        <AbstractLoginForm
            handleSubmit={ function(this: AbstractLoginForm, event: any) {
                console.log("Submitting Registration form!");
                // TODO send to server and redirect as necessary
                event.preventDefault();
                let url = '/register';
                let postData = {
                    username: this.state.username,
                    password: this.state.password,
                };
                console.log(postData);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow',
                    body: JSON.stringify(postData),
                })
                .then(response => response.json()
                .then(data => console.log(data)));
            }}
        />
    );
}