import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                value: '',
                valid: false,
                shouldValidate: true,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                value: '',
                valid: false,
                shouldValidate: true,
                touched: false
            }
        },
        isSignUp: false
    }

    switchSignUp_SignIn = () => {
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler(event, inputIdentifier) {
        const updatedControls = {
            ...this.state.controls
        }

        const updatedElement = {
            ...updatedControls[inputIdentifier]
        }

        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedControls[inputIdentifier] = updatedElement

        updatedElement.touched = true
        this.setState({ controls: updatedControls })
    }

    authHandler = (event) => {
        event.preventDefault()

        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render() {
        const form = <form onSubmit={(event) => this.authHandler(event)}>
            {Object.keys(this.state.controls).map(inputKey => {
                const input = this.state.controls[inputKey]
                return <Input key={inputKey}
                    inputtype={input.elementType}
                    config={input.elementConfig}
                    value={input.value}
                    invalid={!input.valid}
                    shouldValidate={input.shouldValidate}
                    touched={input.touched}
                    changed={(event) => this.inputChangedHandler(event, inputKey)} />
            })}
            {this.props.error ? <p>{this.props.error.message}</p> : null}
            < Button btnType='Success' > Submit </Button >
        </form>

        return (
            <div className={classes.Auth}>
                {this.props.loading ? <Spinner /> : form}
                <Button btnType='Danger' clicked={this.switchSignUp_SignIn}> Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"} </Button>
                {this.props.isAuthanticated ? 
                <Redirect to={this.props.path}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthanticated: state.auth.token !==null,
        path: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)