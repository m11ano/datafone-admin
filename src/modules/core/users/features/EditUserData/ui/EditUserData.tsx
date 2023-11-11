import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { FormInstance, Input } from 'antd';
import { UploadFile } from 'antd/lib';

import cls from './EditUserData.module.less';
import { FormBlock, FormBlockItem } from '@/shared/ui/FormBlock/FormBlock';
import { UploadSingleImage } from '@/shared/ui/UploadSingleImage/UploadSingleImage';
import { useAuth } from '@/app/providers/AuthProvider';
import { ISaveDataRequest } from '../model/types/iSaveDataRequest';
import { saveDataRequest } from '../api/saveDataRequest';

interface EditUserDataProps {
    className?: string;
}

interface SaveData {
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar: UploadFile[];
}

const makeAvatarUploadObject = (authUserData: any): UploadFile | null =>
    authUserData?.user.avatarOriginal?.id
        ? {
              uid: authUserData?.user.avatarOriginal?.id.toString(),
              name: authUserData?.user.avatarOriginal.originalFilename!,
              status: 'done',
              url: authUserData?.user.avatarOriginal.way,
              thumbUrl: authUserData?.user.avatarThumb100?.way,
          }
        : null;

export const EditUserData = memo((props: EditUserDataProps) => {
    const { className } = props;

    const { authUserData, updateAuthData } = useAuth();

    const [formRef, setFormRef] = useState<FormInstance | null>(null);

    const avatar: UploadFile | null = makeAvatarUploadObject(authUserData);

    const initData = {
        firstName: authUserData!.user.firstName,
        lastName: authUserData!.user.lastName,
        email: authUserData!.user.email,
        avatar: avatar ? [avatar] : [],
    };

    const onSave = useCallback(
        async (data: SaveData): Promise<void> => {
            const saveData: ISaveDataRequest = {
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                avatar: 'none',
            };

            if (data.avatar.length === 0) {
                saveData.avatar = 'null';
            } else if (data.avatar[0].originFileObj) {
                delete saveData.avatar;
                saveData.avatarFile = data.avatar[0].originFileObj;
            }

            await saveDataRequest(saveData);
            const newUserData = await updateAuthData();

            if (formRef && newUserData) {
                const avatar: UploadFile | null = makeAvatarUploadObject(newUserData);

                formRef.setFieldValue('avatar', avatar ? [avatar] : []);
            }
        },
        [updateAuthData, formRef],
    );

    return (
        <div className={classNames(cls.editUserData, [className])}>
            <FormBlock
                initialValues={initData}
                onSave={onSave}
                buttonDelete={false}
                buttonReturnToList={false}
                formRef={setFormRef}
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
                <FormBlockItem
                    label="Аватар"
                    type="fileList"
                    name="avatar"
                    tooltip="Минимальный размер: 100x100"
                >
                    <UploadSingleImage />
                </FormBlockItem>
            </FormBlock>
        </div>
    );
});
