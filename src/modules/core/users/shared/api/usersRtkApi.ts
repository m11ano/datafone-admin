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
                ...(result
                    ? (result.map(({ id }) => ({ type: 'Rights', id })) as {
                          type: 'Rights';
                          id: number;
                      }[])
                    : []),
            ],
        }),
        getUsersRolesList: build.query<IUsersRole[], void>({
            query: () => ({
                url: '/users/admin/roles',
            }),
            providesTags: (result) => [
                { type: 'Roles', id: 'LIST' },
                ...(result
                    ? (result.map(({ id }) => ({ type: 'Roles', id })) as {
                          type: 'Roles';
                          id: number;
                      }[])
                    : []),
            ],
        }),
        addUsersRole: build.mutation<IUsersRole, Partial<IUsersRole>>({
            query(body) {
                return {
                    url: '/users/admin/roles/new',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
        }),
        updateUsersRole: build.mutation<IUsersRole, { id: number; data: Partial<IUsersRole> }>({
            query({ id, data }) {
                return {
                    url: `/users/admin/roles/${id}`,
                    method: 'PUT',
                    body: data,
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Roles', id: arg.id }],
        }),
        deleteUsersRole: build.mutation<null, { id: number }>({
            query({ id }) {
                return {
                    url: `/users/admin/roles/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Roles', id: arg.id }],
        }),
    }),
});

export const useGetUsersRightsList = usersRtkApi.useGetUsersRightsListQuery;
export const useGetUsersRolesList = usersRtkApi.useGetUsersRolesListQuery;
export const useAddUsersRole = usersRtkApi.useAddUsersRoleMutation;
export const useUpdateUsersRole = usersRtkApi.useUpdateUsersRoleMutation;
export const useDeleteUsersRole = usersRtkApi.useDeleteUsersRoleMutation;
