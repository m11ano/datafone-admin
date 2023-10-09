import classNames from 'classnames';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props;

    return <div className={classNames([className])}>Страница не найдена</div>;
};
