import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import badge from '../../assests/badge.png';
import { validatePassword } from '../../utils/validation';

const Register: React.FC = () => {
    const [values, setValues] = useState<{ name: string; email: string; password: string }>({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isPasswordValid = validatePassword(values.password);
        if (!isPasswordValid) {
            alert('Password requirements are not met');
            return;
        }
        registerUser(values)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-warning vh-100 h-75'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img src={badge} alt='Logo' className='img-fluid' style={{ maxHeight: '2000px' }} />
                    </div>
                    <div className='col-md-6'>
                        <div className='bg-white p-3 rounded-9'>
                            <h2>LastWall User Registration</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='name'>
                                        <strong>Name</strong>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Enter Name'
                                        name='name'
                                        className='form-control rounded-0'
                                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                                    ></input>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email'>
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type='email'
                                        placeholder='Enter Email'
                                        name='email'
                                        className='form-control rounded-0'
                                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    ></input>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='password'>
                                        <strong>Password</strong>
                                    </label>
                                    <input
                                        type='password'
                                        placeholder='Enter Password'
                                        name='password'
                                        className='form-control rounded-0 border'
                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                    ></input>
                                </div>
                                <button type='submit' className='btn btn-dark w-100 rounded-9'>
                                    Sign Up
                                </button>
                                <div className="mt-3 justify-content-center align-items-center">
                                    <p className="mb-0">Already have an account? Login Instead</p>
                                </div>
                                <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                                    Login
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
