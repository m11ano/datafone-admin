import { useMemo, useState, ReactNode, useLayoutEffect, useCallback } from 'react';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { AuthContext } from '../lib/AuthContext';
import { initAuthRequest } from '../api/initAuthRequest';
import { logoutRequest } from '../api/logoutRequest';

interface AuthProdiverProps {
    initialUserData?: IAuthUserData;
    children: ReactNode;
}

const AuthProvider = (props: AuthProdiverProps) => {
    const { initialUserData, children } = props;

    const [authUserData, setAuthUserData] = useState<null | IAuthUserData>(initialUserData || null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const logout = useCallback(() => {
        setIsLoading(true);
        logoutRequest().then(() => {
            setAuthUserData(null);
            setIsLoading(false);
        });
    }, []);

    const defaultProps = useMemo(
        () => ({
            userData: authUserData,
            isLoading,
            setUserData: setAuthUserData,
            logout,
        }),
        [authUserData, isLoading, logout],
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
