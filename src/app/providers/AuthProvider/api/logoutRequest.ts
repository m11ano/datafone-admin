import { $api } from '@/shared/api/api';

export const logoutRequest = (): Promise<true> =>
    new Promise((resolve, err) => {
        $api.get<boolean>('auth/admin/logout')
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                err(e);
            });
    });
