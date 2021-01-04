import React, { Component } from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/user_actions';

class Register extends Component {
    state = {
        lastname: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: []
    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p>);
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    isFormValid = () => {
        const errors = [];
        const form = document.getElementsByTagName('form')[0];

        if (this.isFormEmpty(this.state)) {
            this.setState({errors: errors.concat('Fill in all fields')});
        } else if(!form.checkValidity()) {
            this.setState({errors: errors.concat('Email is invalid')});
        } else if (!this.isPasswordValid(this.state)) {
            this.setState({errors: errors.concat('Password is invalid')});
        } else {
            return true;
        }
    }

    isPasswordValid = ({password, passwordConfirmation}) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({lastname, name, email, password, passwordConfirmation}) => {
        return (
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    }

    submitForm = event => {
        event.preventDefault();
        
        let dataToSubmit = {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
        };

        if (this.isFormValid()) {
            this.setState({errors: []});
            this.props.dispatch(registerUser(dataToSubmit))
            .then(response => {
                if (response.payload.success) {
                    this.props.history.push('/login');
                } else {
                    this.setState({
                        errors: this.state.errors.concat('your attempt to send data to DB was faild')
                    })
                }
            })
            .catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            })
        } else {
            console.error('Form is not valid');
        }
    }

    render() {
        return (
            <div className="container">
                <h2> Sign Up </h2>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={e => this.handleChange(e)}
                                    id="lastname"
                                    type="text"
                                    className="validate"
                                />
                                <label htmlFor="lastname">lastname</label>
                                <span
                                    className="helper-text"
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    id="name"
                                    type="text"
                                    className="validate"
                                />
                                <label htmlFor="name">name</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className="validate"
                                />
                                <label htmlFor="email">email</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={e => this.handleChange(e)}
                                    id="passwordConfirmation"
                                    type="password"
                                    className="validate"
                                />
                                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                            </div>
                        </div>

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        <div className="row">
                            <div className="col 12">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Create an account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Register);