import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, logoutUser } from '../../api';
import images from '../../assests/images.png'

const Home: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState('');

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        window.location.reload();
      }).catch((err) => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-warning vh-100 h-75'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <img src={images} alt='Logo' className='img-fluid h-100' style={{ maxHeight: '400px' }} />
          </div>
          <div className='col-md-6'>
            <div className='bg-white p-4 rounded-9 h-100' style={{ maxHeight: '400px' }}>
              <div className='container mt-4'>
                {auth ? (
                  <div>
                    <h3>Welcome {name}</h3>
                    <button className='btn btn-danger' onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to='/login' className='btn btn-dark w-100 rounded-9'>
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
