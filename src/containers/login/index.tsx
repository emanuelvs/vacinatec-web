import React from 'react'
import { Button, TextField, Typography, Box } from '@mui/material';
import { connect } from 'react-redux'
import { authentication } from '../../store/ducks/auth'
import "./login.css";
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface Props {
	authentication: (credentials: any) => any;
}

export const Login = ({authentication}: any) => {
	let navigate = useNavigate();
	
	let _emailInput: any;
	let _passwordInput: any;

	const onSubmit = () => {
		const credentials = {
			email: _emailInput.value,
			password: _passwordInput.value
		}
		authentication(credentials)
		setTimeout(() => {
			navigate("/")
		}, 500)
	}

	return (
		<div className="login-container">
			<div>
				<Typography variant="h3"><b>Vacinatec</b></Typography>
			</div>
			<div className="login-form-wrapper">
				<Typography variant="h5">
					Sign in
				</Typography>
				<TextField
				style={{marginBottom: 12}}
					type="text"
					label="Email"
					variant="outlined"
					size="small"
					placeholder="Put your username here"
					inputRef={ref => _emailInput = ref}
				/>
				<TextField
					variant="outlined"
					style={{marginBottom: 12}}
					type="password"
					size="small"
					label="Password"
					placeholder="Put your password here"
					inputRef={ref => _passwordInput = ref}
				/>
				<Button variant="contained" color="primary" onClick={onSubmit}>Login</Button>
				<Link to="/signup" style={{margin: "8px auto"}}>Registrar-se</Link>
				
			</div>

			
			
		</div>
	)
}

export default connect(null, (dispatch: any) => ({
	authentication: (credentials: any) => dispatch(authentication(credentials))
}))(Login)
