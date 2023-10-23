import { createContext } from 'react';
import { IAuthUserData } from '../model/types/iAuthUserData';

export interface AuthContextProps {
    userData: null | IAuthUserData;
    isLoading: boolean;
    setUserData: (data: IAuthUserData) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    userData: null,
    isLoading: false,
    setUserData: () => {},
    logout: () => {},
});
