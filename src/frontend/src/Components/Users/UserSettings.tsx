import React, {
    ChangeEvent,
    FormEvent,
    useContext,
    useEffect,
    useState,
} from 'react';
import { AuthContext } from '../../utils/auth-context';
import Header from '../Layout/Header';

const UserSettings = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetch(import.meta.env.REACT_APP_BACKEND_ADDRESS + '/users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${auth.access_token}`,
                accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                var userData = { ...auth };
                userData = { ...auth, ...data };
                setAuth((auth) => userData);
            });
    }, [auth, setAuth]);

    const handlePasswordChange = async (event: FormEvent) => {
        event.preventDefault();

        var body = {
            new_password: newPassword,
        };

        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent((body as any)[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        const formBodyString = formBody.join('&');

        const response = await fetch('http://127.0.0.1:8000/user', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${auth.access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBodyString,
        }).catch(() => {
            console.log('Failed');
        });
        await response?.json();
        if (response?.ok) {
            console.log('password changed');
        } else {
            console.log('Password change failed');
        }
    };

    const passwordChangeHandler = (event: ChangeEvent) => {
        setNewPassword((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <Header />
            <div>
                <h1>User Deets</h1>
                <p>{auth.username}</p>
                <p>{auth.full_name}</p>
                <p>{auth.email}</p>
            </div>
            <div>
                {/* <button>Add User Placeholder</button> */}
                <form onSubmit={handlePasswordChange}>
                    <input
                        type='text'
                        value={newPassword}
                        onChange={passwordChangeHandler}
                    />
                    <button type='submit'>Change password</button>
                </form>
            </div>
        </>
    );
};

export default UserSettings;
