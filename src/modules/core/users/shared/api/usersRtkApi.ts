import { rtkApi } from '@/shared/api/rtkApi';
import { IUsersRight } from '../types/usersRightsTypes';
import { IUsersRole } from '../types/usersRolesTypes';

const usersRtkApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsersRightsList: build.query<IUsersRight[], void>({
            query: () => ({
                url: '/users/admin/rights',
            }),
        }),
        getUsersRolesList: build.query<IUsersRole[], void>({
            query: () => ({
                url: '/users/admin/roles',
            }),
        }),
    }),
});

export const useGetUsersRightsList = usersRtkApi.useGetUsersRightsListQuery;
export const useGetUsersRolesList = usersRtkApi.useGetUsersRolesListQuery;
