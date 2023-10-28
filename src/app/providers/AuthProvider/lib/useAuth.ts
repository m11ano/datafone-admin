import { useCallback, useContext } from 'react';
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
    const { authUserData, setAuthUserData, isLoading, setIsLoading } = useContext(AuthContext);

    const login = useCallback(
        (data: ILoginRequest): Promise<void> =>
            new Promise((resolve, reject) => {
                loginRequest(data)
                    .then((userData) => {
                        setAuthUserData?.(userData);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [setAuthUserData],
    );

    const logout = useCallback(
        (): Promise<void> =>
            new Promise((resolve, reject) => {
                setIsLoading?.(true);
                logoutRequest()
                    .then(() => {
                        setAuthUserData?.(null);
                        setIsLoading?.(false);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [setAuthUserData, setIsLoading],
    );

    return {
        authUserData,
        isLoading,
        login,
        logout,
    };
}
