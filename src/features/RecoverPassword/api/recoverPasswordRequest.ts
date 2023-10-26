import { $api } from '@/shared/api/api';
import { IResetPasswordRequest } from '../model/types/iResetPasswordRequest';

export const recoverPasswordRequest = async (data: IResetPasswordRequest, recaptcha: string): Promise<null> => {
    try {
        const result = await $api.post<null>('auth/admin/recover-password', data, {
            headers: {
                recaptcha,
            },
        });

        return result.data;
    } catch (e: unknown) {
        throw e;
    }
};
