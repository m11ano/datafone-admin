import { $api } from '@/shared/api/api';
import { ISaveDataRequest } from '../model/types/iSaveDataRequest';

export const saveDataRequest = async (data: ISaveDataRequest): Promise<null> => {
    try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const result = await $api.post<null>('myProfile/admin/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return result.data;
    } catch (e: unknown) {
        throw e;
    }
};
