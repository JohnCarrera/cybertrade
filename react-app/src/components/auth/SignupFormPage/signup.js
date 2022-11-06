import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { addAsset } from "../../../store/assets";
import * as sessionActions from "../../../store/session";
import cityImg from '../../../img/cp-city-login2.jpg';
import './signup.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [renderErrors, setRenderErrors] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]);

    //individual field error states
    const [emailErr, setEmailErr] = useState('');
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [confPassErr, setConfPassErr] = useState('');

    //individual pseudo-input error classes
    const [fnErrClass, setFnErrClass] = useState('su-hasError');
    const [lnErrClass, setLnErrClass] = useState('su-hasError');
    const [emErrClass, setEmErrClass] = useState('su-hasError');
    const [pwErrClass, setPwErrClass] = useState('su-hasError');
    const [cpErrClass, setCpErrClass] = useState('su-hasError');

    useEffect(() => {

        if (!email.length || !emailCheck(email)) {
            setEmailErr('Please enter a valid email');
            renderErrors ? setEmErrClass('su-hasError') : setEmErrClass('su-valid');
        } else {
            setEmailErr('');
            setEmErrClass('su-valid')
        }
        if (!firstName.length) {
            setFirstNameErr('First name is required');
            renderErrors ? setFnErrClass('su-hasError') : setFnErrClass('su-valid');
        } else {
            setFirstNameErr('');
            setFnErrClass('su-valid');
        }
        if (!lastName.length) {
            setLastNameErr('Last name required');
            renderErrors ? setLnErrClass('su-hasError') : setLnErrClass('su-valid');
        } else {
            setLastNameErr('');
            setLnErrClass('su-valid')
        }
        if (!password.length) {
            setPassErr('Password is required');
            renderErrors ? setPwErrClass('su-hasError') : setPwErrClass('su-valid');
        } else if (password.length && password.length < 6) {
            setPassErr('passwords must be at least 6 characters');
            renderErrors ? setPwErrClass('su-hasError') : setPwErrClass('su-valid');
        } else {
            setPassErr('');
            setPwErrClass('su-valid')
        }
        if (!confirmPassword || !(confirmPassword === password)) {
            setConfPassErr('Passwords do not match');
            renderErrors ? setCpErrClass('su-hasError') : setCpErrClass('su-valid');
        } else {
            setConfPassErr('');
            setCpErrClass('su-valid')
        }
    }, [
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        renderErrors
    ]);

    if (sessionUser) return <Redirect to="/app/dashboard/overview" />;

    const emailCheck = (str) => {
        return /\S+@\S+\.\S+/.test(str);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setBackendErrors([]);
        setRenderErrors(true);

        if (
            !emailErr &&
            !firstNameErr &&
            !lastNameErr &&
            !passErr &&
            !confPassErr
        ) {
            const response = await dispatch(sessionActions.signup(
                firstName, lastName, email, password
            ))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setBackendErrors(data.errors);
                });

            if (!response) {
               await dispatch(addAsset({
                    symbol: '_CASH',
                    type:'CASH',
                    value: 1,
                    quantity: 50000,
                }))
                history.push('/app/dashboard/overview')
            }
            else {
                const err = response.map(err => err.split(': ')[1])
                setBackendErrors(err);
            }
        }
    };

    const formatBackendErrors = (errorObj) => {
        const errs = [];
        for (let key in errorObj) {
            errs.push(errorObj[key]);
        }
        return errs;
    }

    return (
        <div className="su-main-page-div">
            <div className="su-left-pane-main">
                {/* <Link to='/'>
                    <img alt='' className="su-left-main-logo" src={''} />
                </Link> */}
                <div className="su-left-pane-content">
                <img className="su-cp-city-img" src={cityImg}/>

                </div>
            </div>
            <div className="su-right-pane-main">
                <div className="su-login-btn-div">
                    <Link className='su-login-link-wrap' to='/login'>
                        <button className="su-login-btn">{'< Log in >'}</button>
                    </Link>
                </div>

                <div className="su-title-div">
                    Create an account...
                </div>
                <div className="su-login-err-div">
                    {formatBackendErrors(backendErrors).map((error, idx) => (
                        <div className="su-err-msg" key={idx}>{error}</div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="su-form-main-div">
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && firstNameErr.length > 0 && firstNameErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${fnErrClass}`}>
                                    <input
                                        placeholder="First Name"
                                        className="su-input-field"
                                        type="text"
                                        maxLength={20}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && lastNameErr.length > 0 && lastNameErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${lnErrClass}`}>
                                    <input
                                        placeholder="Last Name"
                                        className="su-input-field"
                                        maxLength={25}
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && emailErr.length > 0 && emailErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${emErrClass}`}>
                                    <input
                                        placeholder="Email"
                                        className="su-input-field"
                                        type="text"
                                        value={email}
                                        maxLength={30}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && passErr.length > 0 && passErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${pwErrClass}`}>
                                    <input
                                        placeholder="Password"
                                        className="su-input-field"
                                        type="password"
                                        value={password}
                                        maxLength={30}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-input-div">
                            <div className="su-input-inner-div">
                                <div className="su-input-label-div">
                                    <div className="su-field-error">
                                        {renderErrors && confPassErr.length > 0 && confPassErr}
                                    </div>
                                </div>
                                <div className={`su-pseudo-input ${cpErrClass}`}>
                                    <input
                                        placeholder="Confirm Password"
                                        className="su-input-field"
                                        type="password"
                                        value={confirmPassword}
                                        maxLength={30}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="su-signup-btn-div">
                            <button
                                className="su-signup-btn"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
