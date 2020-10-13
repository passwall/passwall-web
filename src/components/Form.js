import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import Api from "./Api";
import Download from "./Download";
import BackIcon from "./BackIcon";
import ComingSoon from "./ComingSoon";
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from "dompurify";

const recaptchaRef = React.createRef();

function onChange(value) {

  const [step, setStep] = useState(1);
  const [paid, setPaid] = useState(false);

  const openCheckout = ({
    email,
    successCallback = () => { },
    closeCallback = () => { },
  }) => {
    const Paddle = window.Paddle;
    Paddle.Checkout.open({
      product: 630862,
      email,
      successCallback,
      closeCallback,
    });
  };

  const submitAPI = (data) => {
    data.master_password = CryptoJS.SHA256(data.master_password).toString();
    Api.post(
      "/auth/signup?api_key=DdOvwxOnKEBQhJomoIft6lRNu1o/gaVq9jyudBFKME0=",
      JSON.stringify(data)
    )

      .then(function (response) {
        console.log(response);
        setStep(3);
      })

      .catch(function (error) {
        setStep(2);
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    data.name = DOMPurify.sanitize(data.name);
    data.email = DOMPurify.sanitize(data.email);
    data.master_password = DOMPurify.sanitize(data.master_password);
    delete data.master_password_confirm;

    if (paid) {
      openCheckout({
        email: data.email,
        successCallback: (res) => {
          submitAPI(data);
        },
        closeCallback: (res) => {
          console.warn(res);
        },
      });
    } else {
      submitAPI(data);
    }

    // recaptchaRef.current.execute();
  };

  if (step === 1) {
    return (
      <Price
        onPaidSubmit={() => {
          setPaid(true);
          setStep(step + 1);
        }}
        onFreeSubmit={() => {
          setPaid(false);
          setStep(step + 1);
        }}
      />
    );
  }

  if (step === 2) {
    const Title = () =>
      paid ? (
        <div className="formTitle">
          <h3>Create a PRO account</h3>
        </div>
      ) : (
        <div>
          <h3>PRO will be here soon, until then</h3>
          <h2>Create a free account</h2>
        </div>
      );
    return (
      <div className="Form">
        <div className="SignupForm">
          <BackIcon
            color="white"
            height="30"
            width="30"
            style={{
              alignSelf: "flex-start",
              marginBottom: 12,
              cursor: "pointer",
            }}
            onClick={() => setStep(1)}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReCAPTCHA
              onChange={onChange}
              ref={recaptchaRef}
              size="invisible"
              sitekey="6LcbOP0UAAAAAK1Zc6jNtrIF34pMBNPGaDaz3VpY"
            />
            <Title />
            <label>
              Full Name
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                ref={register({ required: true })}
              />
              {errors.name && (
                <span className="error">This field is required!</span>
              )}
            </label>

            <label>
              Email
              <input
                id="email"
                name="email"
                type="email"
                ref={register({
                  required: "This field is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address!",
                  },
                })}
                placeholder="hello@passwall.io"
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </label>

            <label>
              Master Password
              <input
                name="master_password"
                type="password"
                ref={register({
                  required: "This field is required!",
                  minLength: {
                    value: 6,
                    message: "Master password should be at least 6 characters!",
                  },
                })}
              />
              {errors.master_password && (
                <span className="error">{errors.master_password.message}</span>
              )}
            </label>

            <label>
              Master Password Confirm
              <input
                name="master_password_confirm"
                type="password"
                ref={register({
                  required: "Please confirm your master password!",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { master_password } = getValues();
                      return (
                        master_password === value ||
                        "Master passwords should match!"
                      );
                    },
                  },
                })}
              />
              {errors.master_password_confirm && (
                <span className="error">
                  {errors.master_password_confirm.message}
                </span>
              )}
            </label>
            {/* Paddle Button */}
            {/* <button onClick={openCheckout}>Subscribe Now!</button> */}
            <button>
              {paid ? "Continue to Payment" : "Create My Account"}
            </button>
          </form>
        </div>
        <div className="KeepInMind">
          <h3>Keep in mind</h3>
          <p>
            There is no way to reset or recover your master password in the
            event that you forget it. Please do not lose your master password.
          </p>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return <Welcome />;
  }
}

function Welcome(props) {
  return (
    <div className="Welcome">
      <h3>Thank you.</h3>
      <h2>Welcome aboard!</h2>
      <p>
        Now you can sign in with your desktop app. Please keep your master
        password secret!
      </p>

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
      <h1>
        Start Keeping <br></br>
        Your Passwords Safe
      </h1>
      <div className="Tables">
        <div className="Free">
          <div className="Header-Wrapper">
            <h2>Free</h2>
          </div>
          <div className="Tda">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
              </path>
            </svg>
            Logins
            </div>
          <div className="Tdb">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clip-rule="evenodd">
              </path>
            </svg>
            Easy Import
            </div>
          <div className="Tda">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
              </path>
            </svg>
            Some Other
            </div>
          <div className="Tdb Grow">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
              </path>
            </svg>
            Some Other
            </div>
          <div className="Footer-Wrapper">
            <button onClick={props.onFreeSubmit}>SIGN UP</button>
          </div>
        </div>
        <div className="Pro">
          <div className="Header-Wrapper">
            <h2>PRO</h2>
            <h3>
              $2 <span className="Month">/month</span>
            </h3>
          </div>
          <div className="Tda">
            <div>
              <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd">
                </path>
              </svg>
            </div>
              Everything in free
          </div>
          <div className="Tdb">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd">
              </path>
            </svg>
            Emails
            </div>
          <div className="Tda">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd">
              </path>
            </svg>
            Bank Accounts
            </div>
          <div className="Tdb">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd">
              </path>
            </svg>
            Credit Cards
          </div>
          <div className="Tda">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3C8 2.73478 8.10536 2.48043 8.29289 2.29289C8.48043 2.10536 8.73478 2 9 2H11C11.2652 2 11.5196 2.10536 11.7071 2.29289C11.8946 2.48043 12 2.73478 12 3C12 3.26522 11.8946 3.51957 11.7071 3.70711C11.5196 3.89464 11.2652 4 11 4H9C8.73478 4 8.48043 3.89464 8.29289 3.70711C8.10536 3.51957 8 3.26522 8 3Z" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3C6 3.79565 6.31607 4.55871 6.87868 5.12132C7.44129 5.68393 8.20435 6 9 6H11C11.7956 6 12.5587 5.68393 13.1213 5.12132C13.6839 4.55871 14 3.79565 14 3C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H6C5.46957 18 4.96086 17.7893 4.58579 17.4142C4.21071 17.0391 4 16.5304 4 16V5C4 4.46957 4.21071 3.96086 4.58579 3.58579ZM7.85714 10.1875V11.0625C7.62981 11.0625 7.4118 11.1547 7.25105 11.3188C7.09031 11.4829 7 11.7054 7 11.9375V14.125C7 14.3571 7.09031 14.5796 7.25105 14.7437C7.4118 14.9078 7.62981 15 7.85714 15H12.1429C12.3702 15 12.5882 14.9078 12.7489 14.7437C12.9097 14.5796 13 14.3571 13 14.125V11.9375C13 11.7054 12.9097 11.4829 12.7489 11.3188C12.5882 11.1547 12.3702 11.0625 12.1429 11.0625V10.1875C12.1429 9.60734 11.9171 9.05094 11.5152 8.6407C11.1134 8.23047 10.5683 8 10 8C9.43168 8 8.88663 8.23047 8.48477 8.6407C8.08291 9.05094 7.85714 9.60734 7.85714 10.1875ZM11.2857 11.0625V10.1875C11.2857 9.8394 11.1503 9.50556 10.9091 9.25942C10.668 9.01328 10.341 8.875 10 8.875C9.65901 8.875 9.33198 9.01328 9.09086 9.25942C8.84974 9.50556 8.71429 9.8394 8.71429 10.1875V11.0625H11.2857Z" />
            </svg>
            Private Notes
            </div>
          <div className="Tdb Grow">
            <svg class="svgForm" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd">
              </path>
            </svg>
            Servers
          </div>
          <div className="Footer-Wrapper">
            <button onClick={props.onPaidSubmit}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
