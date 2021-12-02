import { Typography, TextField, Box, Button } from '@mui/material'
import { Link } from "react-router-dom";
import React from 'react'
import { connect } from 'react-redux'
import "./signup.css"

const SignUp = ({}) => {

    let _nameInput: any;
    let _birthDateInput: any;
    let _emailInput: any;
    let _passwordInput: any;

    const _onSubmit = () => {
        
        let form = {
            name: _nameInput.value,
            birthDate: _birthDateInput.value,
            email: _emailInput.value,
            password: _passwordInput.value
        }

        console.log("[FORM] =>", form)
    }

    return (
        <div className="signup-container">
			<div>
				<Typography variant="h3"><b>Vacinatec</b></Typography>
			</div>
			<div className="signup-form-wrapper">
				<Typography variant="h5" style={{marginBottom: 12}}>
					Sign Up
				</Typography>
				<TextField
				style={{marginBottom: 12}}
					type="text"
					label="Nome"
					variant="outlined"
					size="small"
					placeholder="Digite seu nome"
					inputRef={ref => _nameInput = ref}
				/>

                <TextField
				style={{marginBottom: 12}}
                    id="date"
                    label="Data de Nascimento"
                    size="small"
                    inputRef={ref => _birthDateInput = ref}
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

				<TextField
				style={{marginBottom: 12}}
					variant="outlined"
					type="text"
					size="small"
					label="Email"
					placeholder="email@exemplo.com"
					inputRef={ref => _emailInput = ref}
				/>


				<TextField
				style={{marginBottom: 12}}
					variant="outlined"
					type="password"
					size="small"
					label="Password"
					placeholder="Password"
					inputRef={ref => _passwordInput = ref}
				/>

                

				<Button variant="contained" color="primary" onClick={_onSubmit}>Registrar</Button>
				<Link to="/" style={{margin: "8px auto"}}>Login</Link>
				
			</div>

			<Box>
				<Typography variant="body2" color="textSecondary">
					{``}
				</Typography>
			</Box>
			
		</div>
    )
}

const mapStateToProps = (state: any) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

