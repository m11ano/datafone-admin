import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { ILoginRequest } from '../model/types/iLoginRequest';

interface IUseAuth {
    userData: null | IAuthUserData;
    isLoading: boolean;
    login: (data: ILoginRequest) => void;
    logout: () => void;
}

export function useAuth(): IUseAuth {
    const { userData, isLoading, login, logout } = useContext(AuthContext);

    return {
        userData,
        isLoading,
        login,
        logout,
    };
}
