import { $api } from '@/shared/api/api';
import { IAuthUserData } from '../model/types/iAuthUserData';

export const initAuthRequest = (): Promise<IAuthUserData | null> =>
    new Promise((resolve, err) => {
        $api.get<IAuthUserData>('auth/admin/init')
            .then((initData) => {
                resolve(initData.data);
            })
            .catch((e) => {
                if (e.response && e.response.status === 401 && e.response.statusText === 'Unauthorized') {
                    resolve(null);
                } else {
                    err(e);
                }
            });
    });
