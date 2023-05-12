import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Form, Button } from 'react-bootstrap';

const RegisterPage = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: '100vh' }}
		>
			<div>
				<p>Register User</p>

				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" required />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" required />
					</Form.Group>

					<Button type="submit" className="w-100 mb-3">
						Login user
					</Button>
					<p className="text-center w-100">
						Already have account? <Link to="/">Log in here</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default RegisterPage;
