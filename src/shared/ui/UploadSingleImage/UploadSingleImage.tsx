import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';

interface UploadSingleImageProps extends React.ComponentProps<typeof Upload> {
    className?: string;
}

export const UploadSingleImage = (props: UploadSingleImageProps) => {
    const { className, ...extra } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleCancel = () => setPreviewOpen(false);

    return (
        <>
            <Upload
                accept="image/*"
                beforeUpload={() => false}
                multiple={false}
                maxCount={1}
                listType="picture-card"
                onPreview={handlePreview}
                {...extra}
            >
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Выбрать</div>
                </div>
            </Upload>
            <Modal
                width={1000}
                // bodyStyle={{ width: '80%' }}
                open={previewOpen}
                footer={null}
                onCancel={handleCancel}
                bodyStyle={{ textAlign: 'center' }}
            >
                <img
                    alt=""
                    style={{ maxWidth: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
