import classNames from 'classnames';
import { memo, useEffect, useMemo, useState } from 'react';
import { useGetUsersRightsList, useGetUsersRolesList } from '@core/users/shared/api/usersRtkApi';
import { Button, Dropdown, Table } from 'antd';
import { IUsersRole } from '@core/users/shared/types/usersRolesTypes';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import moduleConfig from '@core/users/Users';
import cls from './RolesList.module.less';
import { Loader } from '@/shared/ui/Loader/Loader';

interface RolesListProps {
    className?: string;
}

interface DataType extends IUsersRole {
    key: React.Key;
}
export const RolesList = memo((props: RolesListProps) => {
    const { className } = props;

    const [initFetch, setInitFetch] = useState(false);
    const { data: rightsData, ...rights } = useGetUsersRightsList();
    const { data: rolesData, isFetching: rolesIsFetching, refetch: rolesRefetch, ...roles } = useGetUsersRolesList();

    const dataSource = useMemo<DataType[]>(
        () => (rolesData ? rolesData.map((item) => ({ ...item, key: item.id })) : []),
        [rolesData],
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
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
        },
        {
            title: 'Действия',
            key: 'action',
            render: (_: any, item: DataType) =>
                item.accessLevel === 'MANUAL' ? (
                    <Dropdown.Button
                        menu={{}}
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            console.log(e);
                        }}
                    >
                        Редактировать
                    </Dropdown.Button>
                ) : (
                    <Link to={`/${moduleConfig.name}/roles/edit/${item.id}`}>
                        <Button icon={<EditOutlined />}>Редактировать</Button>
                    </Link>
                ),
        },
    ];

    useEffect(() => {
        setInitFetch(true);
        if (initFetch === false && rolesIsFetching === false) {
            // rolesRefetch();
        }
    }, [initFetch, rolesIsFetching, rolesRefetch]);

    return (
        <div className={classNames(cls.rolesList, [className])}>
            {rights.isLoading || roles.isLoading ? (
                <Loader position="center" />
            ) : (
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{ x: true }}
                />
            )}
        </div>
    );
});
