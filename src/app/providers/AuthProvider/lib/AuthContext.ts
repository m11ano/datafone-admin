import { createContext } from 'react';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { ILoginRequest } from '../model/types/iLoginRequest';

export interface AuthContextProps {
    userData: null | IAuthUserData;
    isLoading: boolean;
    login: (data: ILoginRequest) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    userData: null,
    isLoading: false,
    login: () => {},
    logout: () => {},
});
