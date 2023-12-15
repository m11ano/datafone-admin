import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { useGetUsersRightsList, useGetUsersRolesList } from '@core/users/shared/api/usersRtkApi';
import { Table } from 'antd';
import { IUsersRole } from '@core/users/shared/types/usersRolesTypes';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { usersModuleConfig } from '@core/users/usersModuleConfig';
import { useDeleteUserRoleAction } from '@core/users/shared/lib/deleteUserRole';
import cls from './RolesList.module.less';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ButtonLink, ButtonLinkMenuProps } from '@/shared/ui/ButtonLink/ButtonLink';
import { useDeleteWithConfirm } from '@/shared/lib/hooks/useDeleteWithConfirm/useDeleteWithConfirm';

interface RolesListProps {
    className?: string;
}

interface DataType extends IUsersRole {
    key: React.Key;
}
export const RolesList = memo((props: RolesListProps) => {
    const { className } = props;

    const { data: rightsData, ...rights } = useGetUsersRightsList();
    const { data: rolesData, isFetching: rolesIsFetching, refetch: rolesRefetch, ...roles } = useGetUsersRolesList();
    const deleteWithConfirm = useDeleteWithConfirm();
    const deleteUserRoleAction = useDeleteUserRoleAction();

    const dataSource = useMemo<DataType[]>(
        () => (rolesData ? rolesData.map((item) => ({ ...item, key: item.id })) : []),
        [rolesData],
    );

    const menu = useMemo(
        () =>
            (item: DataType): ButtonLinkMenuProps[] => [
                {
                    label: 'Удалить',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: (e) => {
                        deleteWithConfirm(async () => {
                            await deleteUserRoleAction(item.id);
                        }, `роль "${item.name}"`);
                    },
                },
            ],
        [deleteWithConfirm, deleteUserRoleAction],
    );

    const columns = useMemo(
        () => [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '100px',
            },
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Тип',
                dataIndex: 'accessLevel',
                key: 'accessLevel',
                render: (accessLevel: DataType['accessLevel']) => (
                    <>
                        {accessLevel === 'ROOT' && (
                            <>
                                <span className={cls.roleTypeRoot}>Root</span>{' '}
                                <span className={cls.roleTypeMore}>(суперпользователь)</span>
                            </>
                        )}
                        {accessLevel === 'SYSTEM' && (
                            <>
                                <span className={cls.roleTypeSystem}>Пользователь</span>{' '}
                                <span className={cls.roleTypeMore}>(роль по умолчанию для всех пользователей)</span>
                            </>
                        )}
                        {accessLevel === 'MANUAL' && <>Создано вручную</>}
                    </>
                ),
                // width: '50%',
            },
            {
                title: 'Действия',
                key: 'action',
                render: (_: any, item: DataType) =>
                    item.accessLevel === 'MANUAL' ? (
                        <ButtonLink
                            as="dropdown"
                            linkTo={`/${usersModuleConfig.name}/roles/edit/${item.id}`}
                            menu={menu(item)}
                        >
                            <EditOutlined /> Редактировать
                        </ButtonLink>
                    ) : (
                        <ButtonLink
                            as="button"
                            icon={<EditOutlined />}
                            linkTo={`/${usersModuleConfig.name}/roles/edit/${item.id}`}
                        >
                            Редактировать
                        </ButtonLink>
                    ),
                width: '211px',
            },
        ],
        [menu],
    );

    return (
        <div className={classNames(cls.rolesList, [className])}>
            {rights.isLoading || roles.isLoading || rolesIsFetching ? (
                <Loader position="center" />
            ) : (
                <Table
                    tableLayout="fixed"
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ x: true }}
                    rowKey="id"
                />
            )}
        </div>
    );
});
