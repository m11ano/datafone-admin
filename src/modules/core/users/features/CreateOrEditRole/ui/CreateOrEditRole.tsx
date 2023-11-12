import classNames from 'classnames';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Input, InputNumber, Switch } from 'antd';
import { FormInstance } from 'antd/lib';
import { IUsersRole, IUsersRoleItemData } from '@core/users/shared/types/usersRolesTypes';
import { useAddUsersRole, useGetUsersRightsList, useGetUsersRolesList } from '@core/users/shared/api/usersRtkApi';
import moduleConfig from '@core/users/Users';
import { useNavigate, Link } from 'react-router-dom';
import cls from './CreateOrEditRole.module.less';
import { FormBlock, FormBlockContent, FormBlockItem, FormBlockProps } from '@/shared/ui/FormBlock/FormBlock';
import { RequestError } from '@/shared/lib/errors/RequestError';

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

    const { data: rolesData, isFetching: rolesIsFetching, ...roles } = useGetUsersRolesList();

    useEffect(() => {
        setFormStatus('hide');
    }, [id]);

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
                const role = rolesData?.find((item) => item.id === id);
                if (role) {
                    setRole(role);
                    initData = {
                        name: role.name,
                        rights: {
                            ...initData.rights,
                            ...role.rights,
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
                    navigate(`/${moduleConfig.name}/roles/edit/${newRole.id}`);
                } catch (e: any) {
                    throw new RequestError([e.data.message || 'Unknown error']);
                }
            }
        },
        [id, addUserRole, navigate],
    );

    return (
        <div className={classNames(cls.createOrEditRole, [className])}>
            <Link to={`/${moduleConfig.name}/roles/edit/1`}>ГО</Link>
            {id && <>Гарик лох</>}
            <FormBlock
                initialValues={{}}
                onSave={onSave}
                buttonSave={!id ? 'Создать' : undefined}
                buttonDelete={role?.accessLevel === 'MANUAL' ? undefined : false}
                onDelete={role?.accessLevel === 'MANUAL' ? () => {} : undefined}
                returnToListUrl={`/${moduleConfig.name}/roles`}
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
