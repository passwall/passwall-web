import React, {useState}  from "react";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import Api from "./Api";
import Download from "./Download";
import ComingSoon from "./ComingSoon";
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from 'dompurify';

const recaptchaRef = React.createRef();

function onChange(value) {
	console.log("Captcha value:", value);
  }

function Form() {
    const { register, handleSubmit, errors, getValues } = useForm({
		validateCriteriaMode: "all"
	});

	const [step, setStep] = useState(1);

	// const Paddle = window.Paddle;
    // const email = document.getElementById('email').value;
    // const openCheckout  = () => {
    //     Paddle.Checkout.open({
    //         product: 630862,
    //         email: email
    //     });
    // }

	const onSubmit = data => {
		data.name = DOMPurify.sanitize(data.name);
		data.email = DOMPurify.sanitize(data.email);
		data.master_password = DOMPurify.sanitize(data.master_password);
		delete data.master_password_confirm;

		// recaptchaRef.current.execute();

		data.master_password = CryptoJS.SHA256(data.master_password).toString()
		Api.post('/auth/signup?api_key=DdOvwxOnKEBQhJomoIft6lRNu1o/gaVq9jyudBFKME0=', JSON.stringify(data))

		.then(function (response) {
			console.log(response)
			setStep(3)
		})

		.catch(function (error) {
			setStep(2)
			console.log(error)
		})
	};

	if (step===1) {
		return (
			<Price onSubmit={() => setStep(2)} />
		  );
	}

	if (step===2) {
		return (
			<div className="Form">
				<div className="SignupForm">
					<form onSubmit={handleSubmit(onSubmit)}>

					<ReCAPTCHA
						onChange={onChange}
						ref={recaptchaRef}
						size="invisible"
						sitekey="6LcbOP0UAAAAAK1Zc6jNtrIF34pMBNPGaDaz3VpY"
						/>
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
						{errors.name && <span className="error">This field is required!</span>}
					</label>

				<label>
					Email
					<input
					id="email"
					name="email"
					type="email"
					ref={register({
						required: 'This field is required!',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'Please enter a valid email address!'
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
								message: 'Master password should be at least 6 characters!'
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
				{/* Paddle Button */}
				{/* <button onClick={openCheckout}>Subscribe Now!</button> */}
				<button>Create My Account</button>
				</form>
				</div>
				<div className="KeepInMind">
					<h3>Keep in mind</h3>
					<p>There is no way to reset or recover your master password in the event that you forget it. Please do not lose your master password.</p>
				</div>
			</div>
		);
	}

	if (step===3) {
		return (
			<Welcome />
		);
	}
}

function Welcome(props) {
	return (
		<div className="Welcome">
			<h3>Thank you.</h3>
			<h2>Welcome aboard!</h2>
			<p>Now you can sign in with your desktop app. Please keep your master password secret!</p>

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

function Price(props) {
    return (
        <div className="Price">
            <h1>Start Keeping <br></br>
                Your Passwords Safe</h1>
                <div className="Tables">
                    <div className="Table Free">
                        <div className="Header-Wrapper"><h2>Free</h2></div>
                        <div className="Tda">Logins</div>
                        <div className="Tdb">Easy Import</div>
                        <div className="Tda">Some Other</div>
                        <div className="Tdb Grow">Some Other</div>
                        <div className="Footer-Wrapper">
                          <button onClick={props.onSubmit}>SIGN UP</button>
                        </div>
                    </div>
                    <div className="Table Pro">
                        <div className="Header-Wrapper">
							<h2>PRO</h2>
							<h3>$2 <span className="Month">/month</span></h3>
						</div>
                        <div className="Tda">Everything in free</div>
                        <div className="Tdb">Emails</div>
                        <div className="Tda">Bank Accounts</div>
                        <div className="Tdb">Credit Cards</div>
                        <div className="Tda">Private Notes</div>
                        <div className="Tdb Grow">Servers</div>
                        <div className="Footer-Wrapper">
                          <button onClick={props.onSubmit}>SIGN UP</button>
                        </div>
                    </div>
                </div>
        </div>
      );
}



export default Form;