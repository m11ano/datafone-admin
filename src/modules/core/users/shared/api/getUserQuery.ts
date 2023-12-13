import { $api } from '@/shared/api/api';
import { IUserItem } from '../types/usersTypes';

export const getUserQuery = async (id: number): Promise<IUserItem> => {
    const user = await $api.get<IUserItem>(`/users/admin/${id}`);
    return user.data;
};
