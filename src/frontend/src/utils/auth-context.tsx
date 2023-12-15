import React, {
    PropsWithChildren,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { User } from '../Api/generated/models';

type AuthContextType = {
    auth: AuthData;
    setAuth: Dispatch<SetStateAction<AuthData>>;
};

const initialContext: AuthContextType = {
    auth: {
        username: '',
        isAuthenticated: false,
        access_token: '',
    },
    setAuth: () => {},
};

type AuthData = User & {
    access_token: string;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<AuthData>({
        username: '',
        access_token: '',
        isAuthenticated: false,
        full_name: '',
        email: '',
    });

    return (
        <AuthContext.Provider
            value={{
                auth: auth,
                setAuth: setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
