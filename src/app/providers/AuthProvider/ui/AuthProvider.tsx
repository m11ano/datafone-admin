import { useMemo, useState, ReactNode, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthUserData } from '../model/types/iAuthUserData';
import { AuthContext } from '../lib/AuthContext';
import { initAuthRequest } from '../api/initAuthRequest';

interface AuthProdiverProps {
    initialUserData?: IAuthUserData;
    children: ReactNode;
}

const AuthProvider = (props: AuthProdiverProps) => {
    const { initialUserData, children } = props;

    const navigate = useNavigate();
    const [authUserData, setAuthUserData] = useState<null | IAuthUserData>(initialUserData || null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const defaultProps = useMemo(
        () => ({
            authUserData,
            setAuthUserData,
            isLoading,
            setIsLoading,
        }),
        [authUserData, setAuthUserData, isLoading, setIsLoading],
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
