import { $api } from '@/shared/api/api';
import { IResetPasswordRequest } from '../model/types/iResetPasswordRequest';

export const recoverPasswordRequest = async (data: IResetPasswordRequest): Promise<true> => {
    try {
        const result = await $api.post<true>('auth/admin/recover-password', data);

        return result.data;
    } catch (e: unknown) {
        throw e;
    }
};
