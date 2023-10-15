import { createContext } from 'react';
import { IAuthUser } from '../model/types/iAuthUser';

export interface AuthContextProps {
    user: null | IAuthUser;
    isLoading: boolean;
    setUser: (data: IAuthUser) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    isLoading: false,
    setUser: () => {},
});
