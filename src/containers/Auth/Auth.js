import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component
{
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					name: 'email',
					type: 'text',
					placeholder: 'Mail address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
				errorMessage: 'Mail is missing'
			},
			password: {
				elementType: 'input',
				elementConfig: {
					name: 'password',
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
				errorMessage: 'Password is missing'
			}
		},
		isSignUp: true
	};

	componentDidMount()
	{
		if (!this.props.building && this.props.authRedirect !== '/')
		{
			this.props.onSetAuthRedirectPath('/');
		}
	}

	inputChangedHandler = (e) =>
	{
		const updatedControls = updateObject(this.state.controls,
			{
				[e.target.name]:
					updateObject(this.state.controls[e.target.name],
						{
							value: e.target.value,
							valid: checkValidity(e.target.value, this.state.controls[e.target.name].validation),
							touched: true
						})
			});

		this.setState({ controls: updatedControls });
	};

	submitHandler = (e) =>
	{
		e.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	};

	switchAuthModeHandler = () =>
	{
		this.setState((prevState) =>
		{
			return { isSignUp: !prevState.isSignUp };
		});
	};

	render()
	{
		let formElementArray = [];
		for (let key in this.state.controls)
		{
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementArray.map(formElement => (
			<Input
				key={formElement.id}
				{...formElement.config}
				changed={this.inputChangedHandler}
			/>
		));

		if (this.props.loading)
		{
			form = <Spinner />;
		}

		let errorMessage = null;
		if (this.props.error)
		{
			errorMessage = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated)
		{
			authRedirect = <Redirect to={this.props.authRedirect} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button
					btnType="Danger"
					clicked={this.switchAuthModeHandler}
				>
					SWITCH TO SIGN {this.state.isSignUp ? 'IN' : 'UP'}
				</Button>
			</div >
		);
	}
}

const mapStateToProps = state => (
	{
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirect: state.auth.authRedirect
	});

const mapDispatchToProps = dispatch => (
	{
		onAuth: (login, password, isSignUp) => dispatch(actionCreators.auth(login, password, isSignUp)),
		onSetAuthRedirectPath: path => dispatch(actionCreators.setAuthRedirectPath(path))
	});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
