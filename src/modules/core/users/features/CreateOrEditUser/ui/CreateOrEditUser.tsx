import classNames from 'classnames';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, Select, SelectProps, UploadFile } from 'antd';
import { FormInstance } from 'antd/lib';
import { usersModuleConfig } from '@core/users/usersModuleConfig';
import { useNavigate } from 'react-router-dom';
import { IUserItem } from '@core/users/shared/types/usersTypes';
import { getUserQuery } from '@core/users/shared/api/getUserQuery';
import { IUsersRight } from '@core/users/shared/types/usersRightsTypes';
import { useGetUsersRightsList, useGetUsersRolesList } from '../../../shared/api/usersRtkApi';
import cls from './CreateOrEditUser.module.less';
import { FormBlock, FormBlockContent, FormBlockItem, FormBlockProps } from '@/shared/ui/FormBlock/FormBlock';
import { useAuth } from '../../../../../../app/providers/AuthProvider/lib/useAuth';
import { UploadSingleImage } from '@/shared/ui/UploadSingleImage/UploadSingleImage';

interface CreateOrEditUserProps {
    id?: number;
    className?: string;
}

interface RightsMapItem {
    right: IUsersRight;
    value: boolean | number;
}

const makeAvatarUploadObject = (user: IUserItem): UploadFile | null =>
    user.avatarOriginal
        ? {
              uid: user.avatarOriginal.id!.toString(),
              name: user.avatarOriginal.originalFilename!,
              status: 'done',
              url: user.avatarOriginal.way!,
              thumbUrl: user.avatarThumb100!.way,
          }
        : null;

export const CreateOrEditUser = memo((props: CreateOrEditUserProps) => {
    const { id, className } = props;

    const navigate = useNavigate();

    const { authUserData } = useAuth();

    const [formStatus, setFormStatus] = useState<FormBlockProps['status']>('hide');

    const formRef = useRef<FormInstance>(null);
    const rights = useGetUsersRightsList();
    const roles = useGetUsersRolesList();
    const [user, setUser] = useState<IUserItem | null>(null);
    const [userIsLoading, setUserIsLoading] = useState<boolean>(false);

    const [systemRoles, setSystemRoles] = useState<number[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    useEffect(() => {
        if (!id) {
            setUser(null);

            setUserIsLoading(false);
        } else {
            setUserIsLoading(true);
            getUserQuery(id)
                .then((user) => {
                    setUser(user);
                    setUserIsLoading(false);
                })
                .catch(() => {
                    navigate(`/${usersModuleConfig.name}`);
                });
        }
    }, [id, navigate]);

    const isLoading = useMemo<boolean>(
        () => userIsLoading || rights.isFetching || roles.isFetching,
        [userIsLoading, rights, roles],
    );

    useEffect(() => {
        setFormStatus(isLoading ? 'loading' : 'show');
    }, [isLoading]);

    const rolesOptions = useMemo<SelectProps['options']>(() => {
        const result: SelectProps['options'] = [];
        if (roles.data) {
            roles.data.forEach((role) => {
                if (role.accessLevel !== 'SYSTEM') {
                    result.push({
                        label: role.name,
                        value: role.id,
                    });
                }
            });
        }
        return result;
    }, [roles]);

    useEffect(() => {
        if (roles.data) {
            const systemRoles = roles.data.filter((role) => role.accessLevel === 'SYSTEM').map((role) => role.id);
            setSystemRoles(systemRoles);

            if (!id) {
                setSelectedRoles(systemRoles);
            } else if (user) {
                setSelectedRoles([...systemRoles, ...user.roles].filter((v, i, a) => a.indexOf(v) === i));
            }
        }
    }, [id, user, roles]);

    const formValuesChange = useCallback(
        (changed: any) => {
            if (changed.roles !== undefined) {
                setSelectedRoles([...systemRoles, ...changed.roles]);
            }
        },
        [systemRoles],
    );

    const rightsMapDefault = useMemo<RightsMapItem[]>(() => {
        const map: RightsMapItem[] = [];

        if (rights.data) {
            rights.data.forEach((right) => {
                let value;
                switch (right.type) {
                    case 'POSITIVE_NUMBER':
                    case 'NEGATIVE_NUMBER':
                        value = Number(right.defaultValue);
                        break;
                    default:
                        value = right.defaultValue === 'true';
                }
                map.push({
                    right,
                    value,
                });
            });
        }

        return map;
    }, [rights]);

    const rightsMap = useMemo(() => {
        const result: RightsMapItem[] = [];

        if (selectedRoles.length > 0 && roles.data && rightsMapDefault.length > 0) {
            result.push(...rightsMapDefault.map((i) => ({ ...i })));

            selectedRoles.forEach((roleId) => {
                const role = roles.data?.find((i) => i.id === roleId);
                if (role) {
                    Object.entries(role.rights).forEach(([rightId, rightValue]) => {
                        const rightResultIndex = result.findIndex((i) => i.right.id === Number(rightId));
                        if (rightResultIndex >= 0) {
                            if (result[rightResultIndex].right.type === 'POSITIVE_NUMBER') {
                                result[rightResultIndex].value =
                                    rightValue > result[rightResultIndex].value
                                        ? rightValue
                                        : result[rightResultIndex].value;
                            } else if (result[rightResultIndex].right.type === 'NEGATIVE_NUMBER') {
                                result[rightResultIndex].value =
                                    rightValue < result[rightResultIndex].value
                                        ? rightValue
                                        : result[rightResultIndex].value;
                            } else if (result[rightResultIndex].right.type === 'POSITIVE_BOOLEAN') {
                                result[rightResultIndex].value = rightValue || result[rightResultIndex].value;
                            } else if (result[rightResultIndex].right.type === 'NEGATIVE_BOOLEAN') {
                                result[rightResultIndex].value =
                                    rightValue === false ? rightValue : result[rightResultIndex].value;
                            }
                        }
                    });
                }
            });
        }

        return result;
    }, [selectedRoles, roles, rightsMapDefault]);

    useEffect(() => {
        if (user) {
            const avatar: UploadFile | null = makeAvatarUploadObject(user);
            formRef.current?.setFieldsValue({
                ...user,
                avatar: avatar ? [avatar] : [],
            });
        } else {
            formRef.current?.setFieldsValue({ avatar: [] });
        }
    }, [user]);

    const onSave = useCallback(async (data: any): Promise<void> => {
        console.log(data);
        // if (!id) {
        //     try {
        //         const newRole = await addUserRole(data).unwrap();
        //         navigate(`/${usersModuleConfig.name}/roles/edit/${newRole.id}`);
        //     } catch (e: any) {
        //         throw new RequestError([e.data.message || 'Unknown error']);
        //     }
        // } else {
        //     try {
        //         await updateUserRole({ id, data }).unwrap();
        //         rolesRefetch();
        //     } catch (e: any) {
        //         throw new RequestError([e.data.message || 'Unknown error']);
        //     }
        // }
    }, []);

    return (
        <div className={classNames(cls.createOrEditUser, [className])}>
            <FormBlock
                initialValues={{}}
                onSave={onSave}
                buttonSave={!id ? 'Создать' : undefined}
                buttonDelete={!id || (id && authUserData?.user.id === id) ? false : undefined}
                onDeleteTitle={`пользователь #${user?.id}`}
                onDelete={
                    id && authUserData?.user.id !== id
                        ? async () => {
                              if (id) {
                                  try {
                                      // await deleteUserRoleAction(id);
                                      navigate(`/${usersModuleConfig.name}`);
                                  } catch (e: any) {
                                      throw e;
                                  }
                              }
                          }
                        : undefined
                }
                returnToListUrl={`/${usersModuleConfig.name}`}
                onValuesChange={formValuesChange}
                formRef={formRef}
                status={formStatus}
            >
                <FormBlockItem
                    label="Имя"
                    example="Иван"
                    name="firstName"
                    rules={[{ required: true, message: 'Введите имя!' }]}
                >
                    <Input />
                </FormBlockItem>
                <FormBlockItem
                    label="Фамилия"
                    example="Иванов"
                    name="lastName"
                    rules={[{ required: true, message: 'Введите фамилию!' }]}
                >
                    <Input />
                </FormBlockItem>
                <FormBlockItem
                    label="E-mail"
                    example="user@gmail.com"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Введите e-mail!' }]}
                >
                    <Input />
                </FormBlockItem>
                {!id && (
                    <FormBlockItem
                        label="Пароль"
                        tooltip="Минимальная длинна — 8 символов"
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input />
                    </FormBlockItem>
                )}
                <FormBlockItem
                    label="Аватар"
                    type="fileList"
                    name="avatar"
                    tooltip="Минимальный размер: 100x100"
                >
                    <UploadSingleImage />
                </FormBlockItem>
                <FormBlockItem
                    label="Доп. роли"
                    name="roles"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Выберите доп.роли"
                        options={rolesOptions}
                    />
                </FormBlockItem>
                <div className={cls.rightsMap}>
                    <FormBlockContent label={null}>
                        <div className={cls.rightsMapTitle}>Карта прав пользователя:</div>
                    </FormBlockContent>
                    {rightsMap.map((rightItem) => (
                        <div
                            className={cls.rightsMapItem}
                            key={rightItem.right.id}
                        >
                            <FormBlockContent label={`${rightItem.right.title}:`}>
                                <div className={cls.rightsMapItemValue}>
                                    {rightItem.value === true && 'Да'}
                                    {rightItem.value === false && 'Нет'}
                                    {typeof rightItem.value === 'number' && rightItem.value}
                                </div>
                            </FormBlockContent>
                        </div>
                    ))}
                </div>
            </FormBlock>
        </div>
    );
});
