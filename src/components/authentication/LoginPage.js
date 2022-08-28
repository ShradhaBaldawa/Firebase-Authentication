import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';

function LoginPage() {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(loginDetails => ({ ...loginDetails, [name]: value }));
    }
    const checkboxHandler = () => {
        setAgree(!agree);
    }
    const handleValidation = () => {
        if (!loginDetails.email || !loginDetails.password) {
            setErrorMsg("All fields are required");
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
            signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
                .then(res => {
                    localStorage.setItem('userDetails', JSON.stringify(res.user));
                    navigate("/dashboard");
                }).catch((err) => {
                    setErrorMsg(err.message);
                });
        }

    }

    return (
        <div className='container'>
            <div className='card p-3 float-right'>
                <div className='border-div p-5'>
                    <h2 className='mb-3'>ADMIN LOGIN</h2>
                    <form className='mt-2' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className='form-label'>E-mail Address</label>
                            <input type="email" name="email" autoComplete="true" className='form-control' value={loginDetails.email} onChange={handleChange} placeholder='Enter Email-Id' />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Password</label>
                            <input type="password" name="password" autoComplete="true" className='form-control' value={loginDetails.password} onChange={handleChange} placeholder='********' />
                        </div>
                        <div className="d-flex justify-content-between align-items-center p-1">
                            <div className="form-check mb-0">
                                <input type="checkbox" className="form-check-input" onChange={checkboxHandler} />
                                <label className='remember-me'>Remember Me</label>
                            </div>
                            <a href="#!" className="forgot-text">Forgot password?</a>
                        </div>
                        {errorMsg ? <div className="error-msg">{errorMsg}</div> : null}
                        <button type="submit" className="btn btn-success mt-3 p-2 mb-2">LOGIN</button>

                    </form>
                </div>
            </div>

        </div>
    );
}

export { LoginPage };