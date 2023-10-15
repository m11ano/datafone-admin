import React, { useMemo, useState, ReactNode, useLayoutEffect } from 'react';
import { IAuthUser } from '../model/types/iAuthUser';
import { AuthContext } from '../lib/AuthContext';
import { $api } from '@/shared/api/api';

interface AuthProdiverProps {
    initialUser?: IAuthUser;
    children: ReactNode;
}

const AuthProvider = (props: AuthProdiverProps) => {
    const { initialUser, children } = props;

    const [authUser, setAuthUser] = useState<null | IAuthUser>(initialUser || null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const defaultProps = useMemo(
        () => ({
            user: authUser,
            isLoading,
            setUser: setAuthUser,
        }),
        [authUser, isLoading],
    );

    // setTimeout(() => {
    //     // setIsLoading(false);
    //     // setAuthUser({
    //     //     id: 1,
    //     //     email: '123',
    //     // });
    // }, 2000);

    useLayoutEffect(() => {
        // setIsLoading(false);
        // try {
        //     const initData = await $api.post('auth/admin/init');
        //     console.log(initData);
        // } catch (e) {
        //     console.log(e);
        // }
        $api.get<IAuthUser>('auth/admin/init')
            .then((initData) => {
                setAuthUser(initData.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                if (e.response && e.response.status === 401 && e.response.statusText === 'Unauthorized') {
                    setIsLoading(false);
                } else {
                    console.log(e);
                }
            });
    }, []);

    return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
