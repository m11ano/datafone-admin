import classNames from 'classnames';
import cls from './[FTName].module.less';

interface [FTName]Props {
    className?: string;
}

export const [FTName] = (props: [FTName]Props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.[FTName | camelcase], [className])}>
            ...
        </div>
    );
};
