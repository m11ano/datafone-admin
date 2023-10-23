import classNames from 'classnames';
import { memo, useState } from 'react';
import { Alert, Button, Card, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import cls from './Login.module.less';
import { ILoginRequest } from '../model/types/iLoginRequest';
import { loginRequest } from '../api/loginRequest';
import { RequestError } from '@/shared/lib/errors/RequestError';
import { useAuth } from '@/app/providers/AuthProvider';

interface LoginProps {
    className?: string;
}

type FieldType = {
    email?: string;
    password?: string;
};

export const Login = memo((props: LoginProps) => {
    const { className } = props;

    const [errors, setErrors] = useState<string[]>([]);
    const { setUser } = useAuth();

    const onFinish = async (data: ILoginRequest) => {
        setErrors([]);
        try {
            const result = await loginRequest(data);
            setUser(result);
            console.log(result);
        } catch (e: unknown) {
            if (e instanceof RequestError) {
                setErrors(e.errors);
            } else {
                console.log(e);
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        setErrors([]);
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={classNames(cls.login, [className])}>
            <Card
                title="Вход в панель управления"
                bordered={false}
                style={{ maxWidth: 500 }}
            >
                {errors.length > 0 && (
                    <Alert
                        message={errors.map((err) => (
                            <div>{err}</div>
                        ))}
                        type="error"
                        showIcon
                        className={cls.error}
                    />
                )}
                <Form
                    name="login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 460, minWidth: 240, width: '100%' }}
                    size="large"
                    initialValues={{ email: 'edkirill@yandex.ru', password: '123456' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Введите e-mail!' }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 0, span: 24, sm: { offset: 8, span: 16 } }}
                        className={cls.submit}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 0, span: 24, sm: { offset: 8, span: 16 } }}
                        className={cls.forgetPass}
                    >
                        <Link to="/">Забыли пароль?</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
});