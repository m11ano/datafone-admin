import classNames from 'classnames';
import { memo } from 'react';
import cls from './[FTName].module.less';

interface [FTName]Props {
    className?: string;
}

export const [FTName] = memo((props: [FTName]Props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.[FTName | camelcase], [className])}>
            ...
        </div>
    );
});
