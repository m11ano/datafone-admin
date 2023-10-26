import { useMemo, useState, ReactNode, useLayoutEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { AuthContext } from '../lib/AuthContext';
import { initAuthRequest } from '../api/initAuthRequest';
import { logoutRequest } from '../api/logoutRequest';
import { ILoginRequest } from '../model/types/iLoginRequest';
import { loginRequest } from '../api/loginRequest';

interface AuthProdiverProps {
    initialUserData?: IAuthUserData;
    children: ReactNode;
}

const AuthProvider = (props: AuthProdiverProps) => {
    const { initialUserData, children } = props;

    const navigate = useNavigate();
    const [authUserData, setAuthUserData] = useState<null | IAuthUserData>(initialUserData || null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = useCallback(
        (data: ILoginRequest): Promise<void> =>
            new Promise((resolve, reject) => {
                loginRequest(data)
                    .then((userData) => {
                        setAuthUserData(userData);
                        navigate('/');
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [navigate],
    );

    const logout = useCallback(
        (): Promise<void> =>
            new Promise((resolve, reject) => {
                setIsLoading(true);
                logoutRequest()
                    .then(() => {
                        setAuthUserData(null);
                        setIsLoading(false);
                        navigate('/');
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }),
        [navigate],
    );

    const defaultProps = useMemo(
        () => ({
            userData: authUserData,
            isLoading,
            login,
            logout,
        }),
        [authUserData, isLoading, login, logout],
    );

    useLayoutEffect(() => {
        setIsLoading(true);
        initAuthRequest()
            .then((data) => {
                setAuthUserData(data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
