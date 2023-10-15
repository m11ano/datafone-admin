import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { IAuthUser } from '../model/types/iAuthUser';

interface IUseAuth {
    user: null | IAuthUser;
    isLoading: boolean;
    setUser: (data: IAuthUser) => void;
}

export function useAuth(): IUseAuth {
    const { user, isLoading, setUser } = useContext(AuthContext);

    return {
        user,
        isLoading,
        setUser,
    };
}
