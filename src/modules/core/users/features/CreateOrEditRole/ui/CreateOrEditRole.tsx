import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Input, InputNumber, Switch } from 'antd';
import { FormInstance } from 'antd/lib';
import {
    useAddUsersRole,
    useGetUsersRightsList,
    useGetUsersRolesList,
    useUpdateUsersRole,
} from '@core/users/shared/api/usersRtkApi';
import { usersModuleConfig } from '@core/users/users';
import { useNavigate } from 'react-router-dom';
import { IUsersRole, IUsersRoleItemData } from '../../../shared/types/usersRolesTypes';
import cls from './CreateOrEditRole.module.less';
import { FormBlock, FormBlockContent, FormBlockItem, FormBlockProps } from '@/shared/ui/FormBlock/FormBlock';
import { RequestError } from '@/shared/lib/errors/RequestError';
import { useDeleteUserRoleAction } from '../../../shared/lib/deleteUserRole';

interface CreateOrEditRoleProps {
    id?: number;
    className?: string;
}

export const CreateOrEditRole = memo((props: CreateOrEditRoleProps) => {
    const { id, className } = props;

    const navigate = useNavigate();
    const [formStatus, setFormStatus] = useState<FormBlockProps['status']>('hide');
    const formRef = useRef<FormInstance>(null);
    const { data: rightsData, ...rights } = useGetUsersRightsList();
    const [role, setRole] = useState<IUsersRole | null>(null);

    const [addUserRole, { isLoading: isAddLoading }] = useAddUsersRole();
    const [updateUserRole, { isLoading: isUpdateLoading }] = useUpdateUsersRole();
    const deleteUserRoleAction = useDeleteUserRoleAction();
    const { data: rolesData, isFetching: rolesIsFetching, refetch: rolesRefetch, ...roles } = useGetUsersRolesList();

    useEffect(() => {
        setFormStatus('loading');
        if (id) {
            rolesRefetch();
        }
    }, [id, rolesRefetch]);

    useEffect(() => {
        if (rolesIsFetching) {
            setFormStatus('loading');
        }
    }, [rolesIsFetching]);

    useEffect(() => {
        if (formRef.current && formStatus !== 'show' && rightsData && (!id || (id && rolesData && !rolesIsFetching))) {
            let initData: IUsersRoleItemData = {
                name: '',
                rights: {},
            };

            rightsData.forEach((right) => {
                initData.rights[right.id] =
                    right.type === 'NEGATIVE_BOOLEAN' || right.type === 'POSITIVE_BOOLEAN'
                        ? right.defaultValue === 'true'
                        : Number(right.defaultValue);
            });

            if (id) {
                const roleItem = rolesData?.find((item) => item.id === id);
                if (roleItem) {
                    setRole(roleItem);
                    initData = {
                        name: roleItem.name,
                        rights: {
                            ...initData.rights,
                            ...roleItem.rights,
                        },
                    };
                }
            }

            formRef.current?.setFieldsValue(initData);

            setFormStatus('show');
        }
    }, [formRef, rightsData, formStatus, id, rolesData, rolesIsFetching]);

    const onSave = useCallback(
        async (data: IUsersRoleItemData): Promise<void> => {
            if (!id) {
                try {
                    const newRole = await addUserRole(data).unwrap();
                    navigate(`/${usersModuleConfig.name}/roles/edit/${newRole.id}`);
                } catch (e: any) {
                    throw new RequestError([e.data.message || 'Unknown error']);
                }
            } else {
                try {
                    await updateUserRole({ id, data }).unwrap();
                    rolesRefetch();
                } catch (e: any) {
                    throw new RequestError([e.data.message || 'Unknown error']);
                }
            }
        },
        [id, addUserRole, updateUserRole, navigate, rolesRefetch],
    );

    return (
        <div className={classNames(cls.createOrEditRole, [className])}>
            <FormBlock
                initialValues={{}}
                onSave={onSave}
                buttonSave={!id ? 'Создать' : undefined}
                buttonDelete={role?.accessLevel === 'MANUAL' ? undefined : false}
                onDeleteTitle={`роль "${role?.name}"`}
                onDelete={
                    role?.accessLevel === 'MANUAL'
                        ? async () => {
                              if (id) {
                                  try {
                                      await deleteUserRoleAction(id);
                                      navigate(`/${usersModuleConfig.name}/roles`);
                                  } catch (e: any) {
                                      throw e;
                                  }
                              }
                          }
                        : undefined
                }
                returnToListUrl={`/${usersModuleConfig.name}/roles`}
                formRef={formRef}
                status={formStatus}
            >
                <FormBlockItem
                    label="Название"
                    example="manager"
                    name="name"
                    rules={[{ required: true, message: 'Введите название!' }]}
                >
                    <Input />
                </FormBlockItem>
                <div>
                    <FormBlockContent label={null}>
                        <div className={cls.rightsBlockTitle}>Права для роли:</div>
                    </FormBlockContent>
                    {rightsData?.map((right) => (
                        <FormBlockItem
                            key={right.id}
                            label={right.title}
                            name={['rights', `${right.id}`]}
                            rules={[{ required: true, message: `Значение не указано!` }]}
                            valuePropName={
                                right.type === 'NEGATIVE_BOOLEAN' || right.type === 'POSITIVE_BOOLEAN'
                                    ? 'checked'
                                    : undefined
                            }
                        >
                            {right.type === 'NEGATIVE_BOOLEAN' ||
                                (right.type === 'POSITIVE_BOOLEAN' && (
                                    <Switch
                                        checkedChildren="Да"
                                        unCheckedChildren="Нет"
                                    />
                                ))}
                            {right.type === 'NEGATIVE_NUMBER' || (right.type === 'POSITIVE_NUMBER' && <InputNumber />)}
                        </FormBlockItem>
                    ))}
                </div>
            </FormBlock>
        </div>
    );
});
