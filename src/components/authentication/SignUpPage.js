import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';

const SignUpPage = () => {
    const [registrationDetails, setRegistrationDetails] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationDetails(inputs => ({ ...inputs, [name]: value }));
    }
    const handleValidation = () => {
        if (!registrationDetails.email || !registrationDetails.password || !registrationDetails.username) {
            setErrorMsg("All fields are required");
            return false;
        } else if (registrationDetails.password !== registrationDetails.confirmPassword) {
            setErrorMsg("Confirm Password should be same");
            return false;
        } else {
            setErrorMsg("");
            return true;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isVaild = handleValidation();
        if (isVaild) {
            createUserWithEmailAndPassword(auth, registrationDetails.email, registrationDetails.password)
                .then((res) => {
                    updateProfile(auth.currentUser, {
                        displayName: registrationDetails.username
                    }).then((s) => {
                        navigate("/login");
                    }).catch((err) => {
                        setErrorMsg(err.message);
                    });
                });
        }
    }


    return (
        <div className='container'>
            <div className='card p-3 float-right'>
                <div className='border-div p-5'>
                    <h2 className='mb-3'>SIGN UP</h2>
                    <form className='mt-2' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className='form-label'>E-mail Address</label>
                            <input type="email" name="email" className='form-control' value={registrationDetails.email} onChange={handleChange} placeholder='Enter Email-Id' />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Username</label>
                            <input type="text" name="username" className='form-control' value={registrationDetails.username} onChange={handleChange} placeholder='Enter Username' />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Password</label>
                            <input type="password" name="password" className='form-control' value={registrationDetails.password} onChange={handleChange} placeholder='********' />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Confirm Password</label>
                            <input type="password" name="confirmPassword" className='form-control' value={registrationDetails.confirmPassword} onChange={handleChange} placeholder='********' />
                        </div>
                        {errorMsg ? <div className="error-msg">{errorMsg}</div> : null}
                        <button type="submit" className="btn btn-success mt-4 p-2 mb-2">SIGNUP</button>
                    </form>
                </div>
            </div>

        </div>
    );
}
export { SignUpPage };


