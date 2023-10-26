import classNames from 'classnames';
import { ReactNode } from 'react';

interface NotAuthLayoutProps {
    className?: string;
    children: ReactNode;
}

export const NotAuthLayout = (props: NotAuthLayoutProps) => {
    const { className, children } = props;

    return <div className={classNames('notAuthLayout', [className])}>{children}</div>;
};
