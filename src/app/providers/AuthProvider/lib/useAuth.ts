import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { IAuthUserData } from '../model/types/iAuthUserData';

interface IUseAuth {
    userData: null | IAuthUserData;
    isLoading: boolean;
    setUserData: (data: IAuthUserData) => void;
    logout: () => void;
}

export function useAuth(): IUseAuth {
    const { userData, isLoading, setUserData, logout } = useContext(AuthContext);

    return {
        userData,
        isLoading,
        setUserData,
        logout,
    };
}
