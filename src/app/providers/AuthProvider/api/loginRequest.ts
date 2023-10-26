import { $api } from '@/shared/api/api';
import { ILoginRequest } from '../model/types/iLoginRequest';
import { IAuthUserData } from '@/app/providers/AuthProvider/model/types/iAuthUserData';

export const loginRequest = async (data: ILoginRequest): Promise<IAuthUserData> => {
    try {
        const result = await $api.post<IAuthUserData>('auth/admin/login', data);

        return result.data;
    } catch (e: unknown) {
        throw e;
    }
};
