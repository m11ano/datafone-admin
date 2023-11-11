import classNames from 'classnames';
import { Spin } from 'antd';
import cls from './Loader.module.less';

interface LoaderProps {
    className?: string;
    position?: 'left' | 'center' | 'right';
}

export const Loader = (props: LoaderProps) => {
    const { className, position } = props;

    return (
        <div
            className={classNames(cls.loader, { [cls.block]: position, [cls[`block_${position}`]]: position }, [
                className,
            ])}
        >
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
