import { useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { ILoginRequest } from '../model/types/iLoginRequest';
import { loginRequest } from '../api/loginRequest';
import { logoutRequest } from '../api/logoutRequest';
import { initAuthRequest } from '../api/initAuthRequest';

interface IUseAuth {
    authUserData: null | IAuthUserData;
    isLoading: boolean;
    login: (data: ILoginRequest) => void;
    logout: () => void;
    updateAuthData: () => Promise<null | IAuthUserData>;
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

    const updateAuthData = useCallback(
        (): Promise<IAuthUserData | null> =>
            new Promise((resolve, reject) => {
                initAuthRequest()
                    .then((data) => {
                        setAuthUserData?.(data);
                        resolve(data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [setAuthUserData],
    );

    return {
        authUserData,
        isLoading,
        login,
        logout,
        updateAuthData,
    };
}
