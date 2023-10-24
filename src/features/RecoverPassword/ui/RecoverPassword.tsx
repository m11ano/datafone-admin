import classNames from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd/lib';
import cls from './RecoverPassword.module.less';
import { GoogleRecaptchaV2 } from '@/shared/ui/GoogleRecaptchaV2/googleRecaptchaV2';
import { IResetPasswordRequest } from '../model/types/iResetPasswordRequest';
import { recoverPasswordRequest } from '../api/recoverPasswordRequest';
import { RequestError } from '@/shared/lib/errors/RequestError';

interface RecoverPasswordProps {
    className?: string;
}

type FieldType = {
    email: string;
};

export const RecoverPassword = memo((props: RecoverPasswordProps) => {
    const { className } = props;
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const captchaReset = useRef<Function>();

    const setCaptchaReset = useCallback((f: Function) => {
        captchaReset.current = f;
    }, []);

    const onCaptchaValue = useCallback((v: string | null) => {
        setCaptchaValue(v);
        setErrors([]);
    }, []);

    const onFinish = async (data: IResetPasswordRequest) => {
        if (isLoading) {
            return;
        }

        const errors = [];

        if (captchaValue === null) {
            errors.push('Подтвердите, что Вы — не робот');
        }
        setErrors(errors);

        if (errors.length === 0) {
            setIsLoading(true);
            try {
                const result = await recoverPasswordRequest({ ...data, recaptcha: captchaValue! });
                setStep(2);
            } catch (e: unknown) {
                if (e instanceof RequestError) {
                    setErrors(e.errors);
                } else {
                    console.log(e);
                }
            } finally {
                captchaReset.current?.();
                setIsLoading(false);
            }
        }
    };

    const onFinishFailed = () => {
        setErrors([]);
    };

    return (
        <div className={classNames(cls.recoverPassword, [className])}>
            <Card
                title={
                    <div>
                        <Link to="/">← Вход</Link> | Восстановление пароля
                    </div>
                }
                bordered={false}
                style={{ maxWidth: 500 }}
            >
                {step === 1 && (
                    <>
                        {errors.length > 0 && (
                            <Alert
                                message={errors.map((err, i) => (
                                    <div key={err}>{err}</div>
                                ))}
                                type="error"
                                showIcon
                                className={cls.error}
                            />
                        )}
                        <Form
                            name="reset_password"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 460, minWidth: 240, width: '100%' }}
                            size="large"
                            initialValues={{}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="E-mail"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Введите e-mail!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    disabled={isLoading}
                                />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ offset: 0, span: 24, sm: { offset: 8, span: 16 } }}
                                className={cls.captchaWrapper}
                            >
                                <GoogleRecaptchaV2
                                    className={cls.captcha}
                                    onChange={onCaptchaValue}
                                    size="compact"
                                    setReset={setCaptchaReset}
                                />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ offset: 0, span: 24, sm: { offset: 8, span: 16 } }}
                                className={cls.submit}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                >
                                    Восстановить
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                {step === 2 && (
                    <div>
                        Уважаемый пользователь! На вашу почту отправлена ссылка для генерации нового пароля. Если письма
                        нет, не забудьте проверить папку &laquo;спам&raquo;.
                    </div>
                )}
            </Card>
        </div>
    );
});
