import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { ILoginRequest } from '../model/types/iLoginRequest';
import { loginRequest } from '../api/loginRequest';
import { logoutRequest } from '../api/logoutRequest';

interface IUseAuth {
    authUserData: null | IAuthUserData;
    isLoading: boolean;
    login: (data: ILoginRequest) => void;
    logout: () => void;
}

export function useAuth(): IUseAuth {
    // const { userData, isLoading, login, logout } = useContext(AuthContext);
    const { authUserData, setAuthUserData, isLoading, setIsLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = useCallback(
        (data: ILoginRequest): Promise<void> =>
            new Promise((resolve, reject) => {
                loginRequest(data)
                    .then((userData) => {
                        setAuthUserData?.(userData);
                        navigate('/');
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [navigate, setAuthUserData],
    );

    const logout = useCallback(
        (): Promise<void> =>
            new Promise((resolve, reject) => {
                setIsLoading?.(true);
                logoutRequest()
                    .then(() => {
                        setAuthUserData?.(null);
                        setIsLoading?.(false);
                        navigate('/');
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [navigate, setAuthUserData, setIsLoading],
    );

    return {
        authUserData,
        isLoading,
        login,
        logout,
    };
}
