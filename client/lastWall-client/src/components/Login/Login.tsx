import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import './Login.css';
import badge from '../../assests/badge.png';

const Login: React.FC = () => {
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checked) {
      alert("You haven't agreed to our terms and conditions");
      return;
    }

    loginUser(values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/');
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-warning vh-100 h-75'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img src={badge} alt='Logo' className='img-fluid h-100' style={{ maxHeight: '400px' }} />
          </div>
          <div className='col-md-6'>
            <div className='bg-white p-4 rounded-9'>
              <h2>LastWall Login</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
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
                <div className='mb-2'>
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
                <div className="row my-2">
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                        className="form-check-input me-2"
                        style={{ borderColor: 'black' }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <p className={checked ? 'text-black mb-1' : 'mb-1'}>You agree to our terms and conditions</p>
                  </div>
                </div>
                <button type='submit' className='btn btn-dark w-100 rounded-9'>
                  Login
                </button>
                <div className="mt-2 justify-content-center align-items-center">
                  <p className="mb-0">New to LastWall? Create a new account</p>
                </div>
                <Link to='/register' className='btn btn-default border w-100 bg-gray rounded-9 text-decoration-none mt-1 mb-0'>
                  Create Account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
