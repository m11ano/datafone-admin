import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Alert, Button, Col, Form, Row, UploadFile } from 'antd';
import { FormInstance } from 'antd/lib';
import { Link } from 'react-router-dom';
import { Rule } from 'antd/es/form';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import cls from './FormBlock.module.less';
import { RequestError } from '@/shared/lib/errors/RequestError';
import { ButtonsPanel } from '../ButtonsPanel/ButtonsPanel';
import { Loader } from '../Loader/Loader';
import { useDeleteWithConfirm } from '@/shared/lib/hooks/useDeleteWithConfirm/useDeleteWithConfirm';
import { useLayout } from '@/layouts/AuthLayout/lib/useLayout';

export interface FormBlockProps<T = any> extends React.ComponentProps<typeof Form> {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    formClassName?: string;
    formStyle?: React.CSSProperties;
    buttonSave?: false | string;
    onSave?: (values: T) => void;
    buttonReturnToList?: false | string;
    returnToListUrl?: string;
    buttonDelete?: false | string;
    onDelete?: string | (() => void);
    onDeleteTitle?: string;
    status?: 'show' | 'loading' | 'hide';
    formRef?: React.RefObject<FormInstance<any>>;
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
        onDeleteTitle,
        status = 'show',
        formRef,
        ...extra
    } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [showSaved, setShowSaved] = useState(false);
    const { antdHookApi } = useLayout();

    const deleteWithConfirm = useDeleteWithConfirm();
    // const [modal, contextHolder] = Modal.useModal();

    const form = useRef<FormInstance>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const onFinish = async (data: T) => {
        if (isLoading) {
            return;
        }

        setErrors([]);
        setIsLoading(true);
        try {
            await onSave?.(data);
            antdHookApi.message?.success({ content: 'Сохранено', duration: 3 });
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

    const onFinishFailed = (errors: any) => {
        if (contentRef.current) {
            const field = contentRef.current.querySelector(`#${errors.errorFields[0].name[0]}`);
            if (field) {
                const fieldBlock = field.closest('.formBlockItem');
                if (fieldBlock) {
                    window.scrollTo({
                        top: fieldBlock.getBoundingClientRect().top + document.documentElement.scrollTop - 100,
                        left: 0,
                        behavior: 'smooth',
                    });
                }
            }
        }
        setErrors([]);
    };

    return (
        <div
            className={classNames(cls.formBlock, className)}
            style={style}
        >
            <ButtonsPanel
                classNameWrapper={cls.buttonsWrapper}
                classNameOnFixed={cls.buttonsOnFixed}
                className={cls.buttonsFixed}
                left={
                    buttonSave || buttonReturnToList ? (
                        <>
                            {buttonSave && (
                                <Button
                                    type="primary"
                                    size="large"
                                    className={cls.buttonSave}
                                    loading={isLoading}
                                    icon={<SaveOutlined />}
                                    onClick={() => {
                                        formRef?.current?.submit();
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
                        </>
                    ) : null
                }
                right={
                    buttonDelete ? (
                        <Button
                            type="dashed"
                            style={{ marginLeft: 'auto' }}
                            size="middle"
                            danger
                            icon={<DeleteOutlined />}
                            className={cls.buttonDelete}
                            onClick={async () => {
                                // const confirmed = await antdHookApi.modal.confirm({
                                //     title: 'Внимание',
                                //     content: 'Вы действительно хотите удалить?',
                                // });
                                // if (confirmed) {
                                //     onDelete?.();
                                // }
                                if (onDelete) {
                                    await deleteWithConfirm(onDelete, onDeleteTitle);
                                }
                            }}
                        >
                            {buttonDelete}
                        </Button>
                    ) : null
                }
            />
            <Form
                // ref={form}
                ref={formRef}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                className={classNames(formClassName)}
                size="large"
                style={formStyle}
                disabled={isLoading}
                labelWrap
                {...extra}
            >
                {status === 'show' && (
                    <>
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
                        <div
                            className={cls.content}
                            ref={contentRef}
                        >
                            {children}
                        </div>
                    </>
                )}
                {status === 'loading' && <Loader position="center" />}
            </Form>
        </div>
    );
};

interface FormBlockItemProps extends React.ComponentProps<typeof Form.Item> {
    type?: 'default' | 'fileList';
    className?: string;
    rules?: Rule[];
    style?: React.CSSProperties;
    formClassName?: string;
    formStyle?: React.CSSProperties;
    children: React.ReactNode;
    label?: React.ReactNode;
    example?: React.ReactNode;
    after?: React.ReactNode;
    maxOneFileSizeMb?: number | null;
}

export const FormBlockItem = (props: FormBlockItemProps) => {
    const {
        type = 'default',
        className,
        children,
        rules = [],
        style,
        formClassName,
        formStyle,
        label,
        example,
        after,
        maxOneFileSizeMb = Number(__LIMIT_FILESIZE_MB__),
        ...extra
    } = props;

    return (
        <div
            className={classNames(cls.formBlockItem, className, 'formBlockItem')}
            style={style}
        >
            <Form.Item
                className={classNames(cls.formBlockItemSub, formClassName)}
                style={formStyle}
                label={label}
                wrapperCol={label === undefined ? { offset: 0, span: 24 } : undefined}
                tooltip={example && <>Например: {example}</>}
                valuePropName={type === 'fileList' ? 'fileList' : undefined}
                rules={[
                    ...rules,
                    ...(type === 'fileList' && maxOneFileSizeMb !== null
                        ? [
                              {
                                  validator: (_: any, value: UploadFile[]) => {
                                      let error = false;
                                      value.every((f: UploadFile) => {
                                          if (f.originFileObj) {
                                              if (f.originFileObj.size > maxOneFileSizeMb * 1024 * 1024) {
                                                  error = true;
                                                  return false;
                                              }
                                          }
                                          return true;
                                      });
                                      return error
                                          ? Promise.reject(
                                                new Error(`Файл превышает максимальный размер ${maxOneFileSizeMb}Mb`),
                                            )
                                          : Promise.resolve();
                                  },
                              },
                          ]
                        : []),
                ]}
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

interface FormBlockContentProps {
    label?: null | React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

export const FormBlockContent = (props: FormBlockContentProps) => {
    const { label, className, children } = props;

    return (
        <div className={classNames(cls.formBlockContent, className, 'formBlockContent')}>
            <Row className={classNames(cls.formBlockContentRow)}>
                {label !== undefined && (
                    <Col
                        span={0}
                        sm={8}
                    >
                        {label}
                    </Col>
                )}
                <Col
                    span={24}
                    sm={label !== undefined ? 16 : 24}
                >
                    {children}
                </Col>
            </Row>
        </div>
    );
};
