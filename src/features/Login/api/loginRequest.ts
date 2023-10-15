import { $api } from '@/shared/api/api';
import { ILoginRequest } from '../model/types/iLoginRequest';
import { IAuthUser } from '@/app/providers/AuthProvider/model/types/iAuthUser';

export const loginRequest = async (data: ILoginRequest): Promise<any> => {
    try {
        const result = await $api.post<IAuthUser>('auth/admin/login', data);

        return result.data;
    } catch (e: unknown) {
        throw e;
    }
};
