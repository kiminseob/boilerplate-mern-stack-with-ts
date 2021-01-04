import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/user_actions';
import {Link} from 'react-router-dom';

class RegisterLogin extends Component {
    state = {
        email : '',
        password : '',
        error : '',
    };

    displayError = error => <p>{error}</p>;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password,
        }

        if (this.isFormValid(this.state)) {
            this.setState({ errors: [] });

            this.props.onFormSubmit(dataToSubmit)
            .then(response => {
                if(response.payload.loginSuccess) {
                    this.props.history.push('/');
                } else {
                    this.setState({
                        error: 'Failed to log in, you can check your Email and Password'
                    })
                }
            })
        } else {
            console.error('Form is not valid');
        }
    }

    isFormValid = ({ email, password }) => {
        const form = document.getElementsByTagName('form')[0];

        if(!form.checkValidity()) {
            this.setState({error: 'Email is invalid'});
        } else if(!email || !password) {
            this.setState({error: 'Form is not valid'})
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="container">
                <h2> Login </h2>
                <div className="row">
                    <form className="col s12">
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
                                <label htmlFor="email">Email</label>
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
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                />
                                <label htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        
                        {this.state.error.length > 0 && (
                            <div>
                                {this.displayError(this.state.error)}
                            </div>
                        )}

                        <div className="row">
                            <div className="col 6">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Login
                                </button>
                            </div>

                            <div className="col 6">
                                <Link to="/register">
                                    <button
                                        className="btn waves-effect red lighten-2"
                                        type="submit"
                                        name="action"
                                    >
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFormSubmit: (dataToSubmit) => dispatch(loginUser(dataToSubmit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLogin);