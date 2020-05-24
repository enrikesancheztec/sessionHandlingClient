import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import mainApi from '../../services/MainApi';

interface IState {
    username: string;
    password: string;
    submitted: boolean;
    error: string;
}

class Login extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            error: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        let username = target.value;
        this.setState({ username: username });
    }

    handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        let password = target.value;
        this.setState({ password: password });
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        this.setState({ submitted: true });

        let username = this.state.username;
        let password = this.state.password;

        if (!(username && password)) {
            return;
        }

        mainApi.post('/user-management/authenticate', {
            username: username,
            password: password
            })
            .then(response => {
                sessionStorage.setItem("token", response.data.token);
                this.setState({
                    error: ''
                });

                window.location.href = '/books'
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({
                        error: 'Invalid Credentials'
                    });
                } else {
                    this.setState({
                        error: 'Please contact support team'
                    });
                }
            });
    }

    public render() {
        let alert

        if (this.state.error === '') {
          alert = '';
        } else {
          alert = <Alert severity="error">{this.state.error}</Alert>;
        }

        return (
            <div>
                {alert}
                <form noValidate>
                    <TextField name="username" type="text" id="username" label="Username"
                        variant="outlined" margin="normal" required fullWidth autoComplete="username" autoFocus
                        value={this.state.username} onChange={this.handleUsernameChange} />
                    <TextField name="password" type="password" id="password" label="Password"
                        variant="outlined" margin="normal" required fullWidth autoComplete="current-password"
                        value={this.state.password} onChange={this.handlePasswordChange} />
                    <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>Login</Button>
                </form>
            </div>
        );
    }
}

export default Login;
