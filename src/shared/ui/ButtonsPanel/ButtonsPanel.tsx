import { Space } from 'antd';
import { memo } from 'react';
import classNames from 'classnames';
import cls from './ButtonsPanel.module.less';
import { FixedOnScroll } from '../FixedOnScroll/FixedOnScroll';

interface ButtonsPanelProps {
    classNameWrapper?: string;
    classNameOnFixed?: string;
    className?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
}

export const ButtonsPanel = memo((props: ButtonsPanelProps) => {
    const { classNameWrapper, classNameOnFixed, className, left, right } = props;

    return (
        <FixedOnScroll
            classNameWrapper={classNames(cls.classNameWrapper, classNameWrapper)}
            classNameOnFixed={classNames(cls.classNameOnFixedclassNames, classNameOnFixed)}
            className={classNames(cls.fixedOnScroll, className)}
            saveMaxWidthOnScroll
        >
            <div className={cls.items}>
                {left && (
                    <div className={cls.buttonsLeft}>
                        <Space
                            wrap
                            size={15}
                        >
                            {left}
                        </Space>
                    </div>
                )}
                {right && (
                    <div className={cls.buttonsRight}>
                        <Space
                            wrap
                            size={15}
                        >
                            {right}
                        </Space>
                    </div>
                )}
            </div>
        </FixedOnScroll>
    );
});
