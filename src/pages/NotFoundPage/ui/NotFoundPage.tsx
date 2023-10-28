import { Button, Result } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props;

    return (
        <div className={classNames([className])}>
            <Result
                status="404"
                title="404"
                subTitle="Страница не найдена"
                extra={
                    <Link to="/">
                        <Button type="primary">На главную</Button>
                    </Link>
                }
            />
        </div>
    );
};
