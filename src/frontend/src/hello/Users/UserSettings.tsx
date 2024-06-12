import React, {
    ChangeEvent,
    FormEvent,
    useContext,
    useEffect,
    useState,
} from 'react';
import { AuthContext } from '../../utils/auth-context';
import Header from '../Layout/Header';
import { getFastAPI } from '../generated/endpoints';

const UserSettings = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');

    const getUserData = getFastAPI().getCurrentUserInfo;
    useEffect(() => {
        getUserData()
            .then((data) => {
                var userData = { ...auth };
                userData = { ...auth, ...data };
                setAuth((auth) => userData);
            })
            .catch();
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

        const updatePassword = () =>
            getFastAPI().updateUser({
                new_password: newPassword,
            });
        updatePassword()
            .then(() => {
                console.log('password changed');
            })
            .catch(() => {
                console.log('Password change failed');
            });
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
