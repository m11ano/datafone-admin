import { createContext } from 'react';
import { IAuthUserData } from '../model/types/iAuthUserData';

export interface AuthContextProps {
    authUserData: null | IAuthUserData;
    setAuthUserData?: (data: null | IAuthUserData) => void;
    isLoading: boolean;
    setIsLoading?: (v: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    authUserData: null,
    isLoading: false,
});
