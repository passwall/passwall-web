import React, {useState}  from "react";
import { useForm } from "react-hook-form";
import API from './API';
import Download from "./Download";
import ComingSoon from "./ComingSoon";

function Form() {
    const { register, handleSubmit, errors, getValues } = useForm({
		validateCriteriaMode: "all"
	});

	const [visibleWelcome, setVisibleWelcome] = useState(false);

	const onSubmit = data => {

		API.post('/', JSON.stringify(data))
		
		.then(function (response) {
			console.log(response)
			setVisibleWelcome(true)
		})
		
		.catch(function (error) {
			setVisibleWelcome(false)
			console.log(error)
		})
	};

	if (!visibleWelcome) {
		return (
			<Welcome />
		);
	}
  
	return (
		<div className="SignupForm">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>PRO will be here soon, until then</h3>
				<h2>Create a free account</h2>
				<label>
					Full Name
					<input
					name="name"
					type="text"
					placeholder="John Doe"
					ref={register({ required: true })}
					/>
					{errors.name && <span className="error">This field is required</span>}
				</label>

			<label>
				Email
				<input
				name="email"
				type="email"
				ref={register({
					required: 'This field is required!',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'Please enter a valid email address'
					}
				})
				}
				placeholder="hello@passwall.io"
				/>
				{errors.email && <span className="error">{errors.email.message}</span>}
			</label>
			
			<label>
				Master Password
				<input
				name="master_password"
				type="password"
				ref={
					register({
						required: 'This field is required!',
						minLength : {
							value: 6,
							message: 'Master password should be at least 6 characters'
					}
					})
				}
				/>
				{errors.master_password && <span className="error">{errors.master_password.message}</span>}
			</label>

			<label>
				Master Password Confirm
				<input
				name="master_password_confirm"
				type="password"
				ref={register({
					required: "Please confirm your master password!",
					validate: {
					matchesPreviousPassword: value => {
						const { master_password } = getValues();
						return master_password === value || "Master passwords should match!";
					}
					}
				})}
				/>
				{errors.master_password_confirm && <span className="error">{errors.master_password_confirm.message}</span>}
			</label>

			<button>Create My Account</button>
			</form>
		</div>
  );
}

function Welcome(props) {
	return (
		<div className="Welcome">
			<h3>Thank you.</h3>
			<h2>Welcome aboard!</h2>		
			<p>We’ve e-mailed details and your master password, keep it a secret!</p>

			<div className="Available">
				<p>Available platforms</p>
				<Download />
			</div>
			<div className="ComingSoon">
				<p>Coming Soon</p>
				<ComingSoon />
			</div>
		</div>
	);
}



export default Form;