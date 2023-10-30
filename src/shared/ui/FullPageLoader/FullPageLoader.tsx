import classNames from 'classnames';
import cls from './FullPageLoader.module.less';
import { Loader } from '../Loader/Loader';

interface FullPageLoaderProps {
    className?: string;
}

export const FullPageLoader = (props: FullPageLoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.fullPageLoader, [className])}>
            <Loader />
        </div>
    );
};
