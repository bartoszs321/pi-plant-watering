import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFastAPI } from '../../api/generated/endpoints';

const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const loginUser = getFastAPI().postLogin({
            username: username,
            password: password,
        });
        loginUser()
            .then((data) => {
                setAuth({
                    username: username,
                    access_token: data.access_token,
                    isAuthenticated: true,
                });
                navigate('/');
            })
            .catch((err) => {
                toast.error(`🦄 ${err}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            });
    };

    const usernameChangeHandler = (event: ChangeEvent) => {
        setUsername((event.target as HTMLInputElement).value);
    };

    const passwordChangeHandler = (event: ChangeEvent) => {
        setPassword((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='controls'>
                    <div className='control'>
                        <label>Username</label>
                        <input
                            type='text'
                            value={username}
                            onChange={usernameChangeHandler}
                        />
                    </div>
                    <div className='control'>
                        <label>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={passwordChangeHandler}
                        />
                    </div>
                </div>
                <div className='customWatering'>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </>
    );
};

export default LoginForm;
