import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { Input } from 'antd';

import { FormInstance } from 'antd/lib';
import cls from './EditUserAccess.module.less';
import { FormBlock, FormBlockItem } from '@/shared/ui/FormBlock/FormBlock';
import { ISaveAccessRequest } from '../model/types/iSaveAccessRequest';
import { saveAccessRequest } from '../api/saveAccessRequest';
import { RequestError } from '@/shared/lib/errors/RequestError';

interface EditUserAccessProps {
    className?: string;
}

interface SaveAccess {
    oldPassword?: string;
    newPassword?: string;
    newPassword2?: string;
}

export const EditUserAccess = memo((props: EditUserAccessProps) => {
    const { className } = props;

    const [formRef, setFormRef] = useState<FormInstance | null>(null);

    const initData = {};

    const onSave = useCallback(
        async (data: SaveAccess): Promise<void> => {
            if (data.newPassword !== data.newPassword2) {
                throw new RequestError(['Пароли не совпадают!']);
            }
            const saveData: ISaveAccessRequest = {
                oldPassword: data.oldPassword || '',
                newPassword: data.newPassword || '',
            };

            await saveAccessRequest(saveData);

            formRef?.resetFields();
        },
        [formRef],
    );

    return (
        <div className={classNames(cls.editUserAccess, [className])}>
            <FormBlock
                initialValues={initData}
                onSave={onSave}
                buttonDelete={false}
                buttonReturnToList={false}
                formRef={setFormRef}
            >
                <FormBlockItem
                    label="Текущий пароль"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Введите текущий пароль!' }]}
                >
                    <Input.Password />
                </FormBlockItem>
                <FormBlockItem
                    label="Новый пароль"
                    name="newPassword"
                    tooltip="Минимальная длинна — 8 символов"
                    rules={[{ required: true, message: 'Введите новый пароль!' }]}
                >
                    <Input.Password />
                </FormBlockItem>
                <FormBlockItem
                    label="Повторите новый пароль"
                    name="newPassword2"
                    rules={[{ required: true, message: 'Повторите новый пароль!' }]}
                >
                    <Input.Password />
                </FormBlockItem>
            </FormBlock>
        </div>
    );
});
