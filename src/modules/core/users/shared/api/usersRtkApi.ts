import { IUsersRight } from '../types/usersRightsTypes';
import { IUsersRole } from '../types/usersRolesTypes';
import { rtkApi } from '@/shared/api/rtkApi';

const usersRtkApi = rtkApi.enhanceEndpoints({ addTagTypes: ['Roles', 'Rights'] }).injectEndpoints({
    endpoints: (build) => ({
        getUsersRightsList: build.query<IUsersRight[], void>({
            query: () => ({
                url: '/users/admin/rights',
            }),
            providesTags: (result) => [
                { type: 'Rights', id: 'LIST' },
                ...([result ? result.map(({ id }) => ({ type: 'Rights', id })) : []] as unknown as {
                    type: 'Rights';
                    id: number;
                }[]),
            ],
        }),
        getUsersRolesList: build.query<IUsersRole[], void>({
            query: () => ({
                url: '/users/admin/roles',
            }),
            providesTags: (result) => [
                { type: 'Roles', id: 'LIST' },
                ...([result ? result.map(({ id }) => ({ type: 'Roles', id })) : []] as unknown as {
                    type: 'Roles';
                    id: number;
                }[]),
            ],
        }),
        addUsersRole: build.mutation<IUsersRole, Partial<IUsersRole>>({
            query(body) {
                return {
                    url: '/users/admin/roles/create',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
        }),
    }),
});

export const useGetUsersRightsList = usersRtkApi.useGetUsersRightsListQuery;
export const useAddUsersRole = usersRtkApi.useAddUsersRoleMutation;
export const useGetUsersRolesList = usersRtkApi.useGetUsersRolesListQuery;
