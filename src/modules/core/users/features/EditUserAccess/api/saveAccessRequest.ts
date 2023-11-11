import { $api } from '@/shared/api/api';
import { ISaveAccessRequest } from '../model/types/iSaveAccessRequest';

export const saveAccessRequest = async (data: ISaveAccessRequest): Promise<null> => {
    try {
        const result = await $api.post<null>('myProfile/admin/updateAccess', data);

        return result.data;
    } catch (e: unknown) {
        throw e;
    }
};
