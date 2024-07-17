import React, { forwardRef, useState, useEffect } from 'react';
import Picone from '../assets/img/img2.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Login = forwardRef((props, ref) => {
    const loginview = props.loginview
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const status = localStorage.getItem('login_status');
            if (status === 'logined') {
                setIsLoggedIn(true);
            }
        };

        checkLoginStatus();
    }, []);

    function Handleview(){
        loginview('register')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/login/', {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('accesstoken', response.data.access);
                localStorage.setItem('refreshtoken', response.data.refresh);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('login_status', 'logined');
                setIsLoggedIn(true);

                if (response.data.role === 'doctor') {
                    navigate('/doctor-dashboard');
                } else if (response.data.role === 'patient') {
                    navigate('/patient-dashboard');
                } else if (response.data.role === 'nurse') {
                    navigate('/nurse-dashboard');
                }
            } else {
                setLoginError('Login failed. Please check your username and password.');
            }
        } catch (error) {
            setLoginError(error.response.data.info);
            console.error(error);
        }
    };

    if (isLoggedIn) {
        return (
            <div className="container" style={{ marginTop: '20px', minHeight: '560px' }}>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-7">
                        <div>
                            <h2>Thank You For Your Registration.....</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis in vitae adipisci esse possimus architecto deserunt aliquid eius praesentium, qui quam perspiciatis mollitia dolor ratione dignissimos officiis, voluptates dolorem reprehenderit, corporis odio pariatur aspernatur itaque dicta debitis? Rem sint accusamus eius magni ipsa dolorum in error nam debitis! Suscipit eius fugiat sint eum sapiente, tempora neque perferendis officia enim et cumque dolore ad nobis mollitia id, iste eveniet accusamus maxime doloribus nesciunt cum tempore! Nemo, ad sequi? Voluptatibus nam facere hic dolor quod dolorum, magni aperiam nesciunt veniam consequuntur molestiae libero recusandae non minus animi corporis quibusdam? Hic delectus rerum est provident laudantium, suscipit, eveniet et libero necessitatibus culpa iusto pariatur repellat dignissimos voluptatum aspernatur voluptates ullam sit obcaecati atque.</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-7 col-lg-5">
                        <img src={Picone} alt="Login Illustration" height="450px" width="500px" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-7 col-lg-5">
                    <div className="login-container w-100">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin} ref={ref}>
                            {loginError && <p style={{color:'red'}} className="error-message">{loginError}...</p>}
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="current-username"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn">Login</button>
                        </form>
                        <hr />
                        <p className="login_or">Or</p>
                        <Link onClick={Handleview}>Register as a New User?</Link>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-7 col-lg-7">
                    <img src={Picone} alt="Login Illustration" className='img-fluid w-100' height="500px"  />
                </div>
            </div>
        </div>
    );
});

export default Login;
