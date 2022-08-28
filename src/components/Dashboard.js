import { signOut } from 'firebase/auth'
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';

export const Dashboard = () => {
    const userInfo = localStorage.getItem('userDetails');
    let data = userInfo ? JSON.parse(userInfo) : {};

    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth);
        localStorage.removeItem('userDetails');
        navigate("/login")
    }
    useEffect(() => {
        toast("User Logged in Successfully");
    }, []);
    return (
        <div>
            <h3 className='text-center p-4 mt-3'>Welcome <span className='forgot-text'>{data.displayName}!</span></h3>
            <h5 className='text-center mt-2 mb-2'>This is the dashboard, if you can see this you're logged in.</h5>
            <div className='col-md-4 ms-5 float-center'>
                <h3>User Details:</h3>
                <div className='form-group'>
                    <label className='form-label'>Email:</label>
                    <span className='form-control'>{data.email}</span>
                </div>
                <div className='form-group'>
                    <label className='form-label'>Name:</label>
                    <span className='form-control'>{data.displayName}</span>
                </div>
                <div className='form-group'>
                    <label className='form-label'>Email Verified:</label>
                    {data.emailVerified === false ? <span className='form-control forgot-text'>
                        Please verify your email</span> : <span className='form-control'>
                        Email is Verified</span>}
                </div>
            </div>
            <button className='mt-3 ms-5 btn btn-primary' onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div >
    )
}
