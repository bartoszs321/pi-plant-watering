import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        var body = {
            grant_type: 'password',
            username: username,
            password: password,
        };
        var formBody: string[] = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent((body as any)[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        const formBodyString = formBody.join('&');
        var response;
        try {
            response = await fetch(
                import.meta.env.REACT_APP_BACKEND_ADDRESS + `/token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formBodyString,
                }
            );
            const data = await response.json();
            if (response.ok) {
                setAuth({
                    username: username,
                    access_token: data.access_token,
                    isAuthenticated: true,
                });
                navigate('/');
            } else {
                toast.error(`🦄 ${data.detail}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                return response.statusText;
            }
        } catch (e: any) {
            toast.error(`🦄 ${e.message}`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
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
