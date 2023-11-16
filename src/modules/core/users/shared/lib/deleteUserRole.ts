import { useDeleteUsersRole } from '../api/usersRtkApi';

export const useDeleteUserRoleAction = () => {
    const [deleteUserRole, { isLoading: isDeleteLoading }] = useDeleteUsersRole();

    return async (id: number) => {
        try {
            await deleteUserRole({ id }).unwrap();
        } catch (e: any) {
            throw e;
        }
    };
};
