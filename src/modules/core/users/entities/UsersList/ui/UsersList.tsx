import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { useGetUsersList, useGetUsersRolesList } from '@core/users/shared/api/usersRtkApi';
import { Space, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { usersModuleConfig } from '@core/users/usersModuleConfig';
import { IUserList } from '@core/users/shared/types/usersTypes';
import cls from './UsersList.module.less';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';

interface UsersListProps {
    className?: string;
}

interface DataType extends IUserList {
    key: React.Key;
}
export const UsersList = memo((props: UsersListProps) => {
    const { className } = props;

    const usersList = useGetUsersList(1);
    const rolesList = useGetUsersRolesList();

    const dataSource = useMemo<DataType[]>(
        () => (usersList.data ? usersList.data.map((item) => ({ ...item, key: item.id })) : []),
        [usersList.data],
    );

    const columns = useMemo(
        () => [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                onCell: () => ({
                    style: {
                        width: '100px',
                    },
                }),
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
                onCell: () => ({
                    style: {
                        width: '200px',
                        wordBreak: 'break-word',
                    },
                }),
            },
            {
                title: 'Имя',
                dataIndex: 'firstName',
                key: 'firstName',
                onCell: () => ({
                    style: {
                        width: '200px',
                        wordBreak: 'break-word',
                    },
                }),
            },
            {
                title: 'Фамилия',
                dataIndex: 'lastName',
                key: 'lastName',
                onCell: () => ({
                    style: {
                        width: '200px',
                        wordBreak: 'break-word',
                    },
                }),
            },
            {
                title: 'Доп. роли',
                dataIndex: 'roles',
                key: 'roles',
                render: (roles: DataType['roles'], item: DataType) => (
                    <Space
                        size={[0, 8]}
                        wrap
                    >
                        {item.roles.map((roleId) => {
                            if (!rolesList.data) return null;
                            const roleItem = rolesList.data.find((item) => item.id === roleId);
                            if (!roleItem) return null;
                            if (roleItem.accessLevel === 'SYSTEM') return null;

                            return (
                                <Tag
                                    key={roleItem.id}
                                    color={roleItem.accessLevel === 'ROOT' ? 'red' : undefined}
                                >
                                    {roleItem.name}
                                </Tag>
                            );
                        })}
                    </Space>
                ),
            },
            {
                title: 'Действия',
                key: 'action',
                render: (_: any, item: DataType) => (
                    <ButtonLink
                        as="button"
                        icon={<EditOutlined />}
                        linkTo={`/${usersModuleConfig.name}/edit/${item.id}`}
                    >
                        Редактировать
                    </ButtonLink>
                ),
                onCell: () => ({
                    style: {
                        width: '180px',
                    },
                }),
            },
        ],
        [rolesList.data],
    );

    return (
        <div className={classNames(cls.usersList, [className])}>
            {rolesList.isFetching || usersList.isFetching ? (
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
