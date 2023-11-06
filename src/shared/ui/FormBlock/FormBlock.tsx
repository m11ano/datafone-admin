import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row, Space } from 'antd';
import { FormInstance } from 'antd/lib';
import { Link } from 'react-router-dom';
import cls from './FormBlock.module.less';
import { FixedOnScroll } from '../FixedOnScroll/FixedOnScroll';
import { RequestError } from '@/shared/lib/errors/RequestError';

interface FormBlockProps<T = any> extends React.ComponentProps<typeof Form> {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    formClassName?: string;
    formStyle?: React.CSSProperties;
    buttonSave?: false | string;
    onSave?: (data: T) => void;
    buttonReturnToList?: false | string;
    returnToListUrl?: string;
    buttonDelete?: false | string;
    onDelete?: () => void;
}

export const FormBlock = <T,>(props: FormBlockProps<T>) => {
    const {
        className,
        style,
        children,
        formClassName,
        formStyle,
        buttonSave = 'Сохранить',
        onSave,
        buttonReturnToList = 'Вернуться к списку',
        returnToListUrl = '',
        buttonDelete = 'Удалить',
        onDelete,
        ...extra
    } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [modal, contextHolder] = Modal.useModal();

    const onFinish = async (data: T) => {
        if (isLoading) {
            return;
        }

        setErrors([]);
        setIsLoading(true);
        try {
            await onSave?.(data);
        } catch (e: unknown) {
            if (e instanceof RequestError) {
                setErrors(e.errors);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                setErrors([(e as Error).message]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = () => {
        setErrors([]);
    };

    const form = useRef<FormInstance>(null);

    return (
        <div
            className={classNames(cls.formBlock, className)}
            style={style}
        >
            <FixedOnScroll
                classNameWrapper={cls.buttonsWrapper}
                classNameOnFixed={cls.buttonsOnFixed}
                className={cls.buttonsFixed}
                saveMaxWidthOnScroll
            >
                <div className={cls.buttons}>
                    {(buttonSave || buttonReturnToList) && (
                        <div className={cls.buttonsLeft}>
                            <Space
                                wrap
                                size={15}
                            >
                                {buttonSave && (
                                    <Button
                                        type="primary"
                                        size="large"
                                        className={cls.buttonSave}
                                        loading={isLoading}
                                        onClick={() => {
                                            form.current?.submit();
                                        }}
                                    >
                                        {buttonSave}
                                    </Button>
                                )}
                                {buttonReturnToList && (
                                    <Link
                                        to={returnToListUrl}
                                        className={cls.buttonReturnToList}
                                    >
                                        {buttonReturnToList}
                                    </Link>
                                )}
                            </Space>
                        </div>
                    )}
                    {buttonDelete && (
                        <div className={cls.buttonsRight}>
                            <Space
                                wrap
                                size={15}
                            >
                                {buttonDelete && (
                                    <Button
                                        type="dashed"
                                        style={{ marginLeft: 'auto' }}
                                        size="middle"
                                        danger
                                        className={cls.buttonDelete}
                                        onClick={async () => {
                                            const confirmed = await modal.confirm({
                                                title: 'Внимание',
                                                content: 'Вы действительно хотите удалить?',
                                            });
                                            if (confirmed) {
                                                onDelete?.();
                                            }
                                        }}
                                    >
                                        {buttonDelete}
                                    </Button>
                                )}
                            </Space>
                        </div>
                    )}
                </div>
            </FixedOnScroll>
            <Form
                ref={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                className={classNames(formClassName)}
                size="large"
                style={formStyle}
                disabled={isLoading}
                {...extra}
            >
                {errors.length > 0 && (
                    <Alert
                        message={errors.map((err) => (
                            <div key={err}>{err}</div>
                        ))}
                        type="error"
                        showIcon
                        className={cls.error}
                    />
                )}
                <div className={cls.content}>{children}</div>
            </Form>
            {contextHolder}
        </div>
    );
};

interface FormBlockItemProps extends React.ComponentProps<typeof Form.Item> {
    type?: 'default' | 'fileList';
    className?: string;
    style?: React.CSSProperties;
    formClassName?: string;
    formStyle?: React.CSSProperties;
    children: React.ReactNode;
    label?: React.ReactNode;
    example?: React.ReactNode;
    after?: React.ReactNode;
}

export const FormBlockItem = (props: FormBlockItemProps) => {
    const {
        type = 'default',
        className,
        children,
        style,
        formClassName,
        formStyle,
        label,
        example,
        after,
        ...extra
    } = props;

    return (
        <div
            className={classNames(cls.formBlockItem, className)}
            style={style}
        >
            <Form.Item
                className={classNames(cls.formBlockItemSub, formClassName)}
                style={formStyle}
                label={label}
                wrapperCol={label === undefined ? { offset: 0, span: 24 } : undefined}
                tooltip={example && <>Например: {example}</>}
                valuePropName={type === 'fileList' ? 'fileList' : undefined}
                getValueFromEvent={
                    type === 'fileList'
                        ? (e: any) => {
                              if (Array.isArray(e)) {
                                  return e;
                              }
                              return e?.fileList;
                          }
                        : undefined
                }
                {...extra}
            >
                {children}
            </Form.Item>
            {after && (
                <Row className={classNames(cls.formBlockItemAfter)}>
                    <Col
                        span={0}
                        sm={8}
                    />
                    <Col
                        span={24}
                        sm={16}
                    >
                        {after}!
                    </Col>
                </Row>
            )}
        </div>
    );
};
