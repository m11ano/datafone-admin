import classNames from 'classnames';
import { ReactNode, useEffect } from 'react';

interface NotAuthLayoutProps {
    className?: string;
    children: ReactNode;
    title?: string;
}

export const NotAuthLayout = (props: NotAuthLayoutProps) => {
    const { className, children, title } = props;

    const mainTitle = 'Панель управления';

    useEffect(() => {
        document.title = `${title ? `${title} / ` : ''} ${mainTitle}`;
    }, [title]);

    return <div className={classNames('notAuthLayout', [className])}>{children}</div>;
};
