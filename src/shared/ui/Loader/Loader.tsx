import classNames from 'classnames';
import { Spin } from 'antd';
import cls from './Loader.module.less';

interface LoaderProps {
    className?: string;
}

export const Loader = (props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loader, [className])}>
            <div className={cls.spinWrap}>
                <Spin
                    size="large"
                    className={cls.spin}
                />
                <div className={cls.tip}>Загрузка...</div>
            </div>
        </div>
    );
};
