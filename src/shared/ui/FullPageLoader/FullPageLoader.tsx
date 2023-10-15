import classNames from 'classnames';
import { Spin } from 'antd';
import cls from './FullPageLoader.module.less';

interface FullPageLoaderProps {
    className?: string;
}

export const FullPageLoader = (props: FullPageLoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.fullPageLoader, [className])}>
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
