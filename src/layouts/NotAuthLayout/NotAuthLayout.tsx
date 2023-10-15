import classNames from 'classnames';
import { ReactNode } from 'react';
import cls from './NotAuthLayout.module.less';

interface NotAuthLayoutProps {
    className?: string;
    children: ReactNode;
}

export const NotAuthLayout = (props: NotAuthLayoutProps) => {
    const { className, children } = props;

    return <div className={classNames(cls.notAuthLayout, [className])}>{children}</div>;
};
