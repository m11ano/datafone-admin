import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import cls from './FixedOnScroll.module.less';

interface FixedOnScrollProps {
    className?: string;
    classNameWrapper?: string;
    classNameOnFixed?: string;
    children?: React.ReactNode;
    saveMaxWidthOnScroll?: boolean;
}

export const FixedOnScroll = (props: FixedOnScrollProps) => {
    const { className, children, classNameWrapper, classNameOnFixed, saveMaxWidthOnScroll = false } = props;
    const wrapper = useRef<HTMLDivElement>(null);
    const block = useRef<HTMLDivElement>(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (wrapper.current && block.current) {
                wrapper.current.getBoundingClientRect();
                if (window.scrollY > wrapper.current.getBoundingClientRect().top + window.scrollY) {
                    setIsFixed(true);
                    wrapper.current.style.height = `${block.current.getBoundingClientRect().height}px`;

                    if (saveMaxWidthOnScroll) {
                        block.current.style.maxWidth = `${block.current.getBoundingClientRect().width}px`;
                    }
                } else {
                    setIsFixed(false);
                    wrapper.current.style.height = 'auto';

                    if (saveMaxWidthOnScroll) {
                        block.current.style.maxWidth = 'none';
                    }
                }
            }
        };

        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [saveMaxWidthOnScroll]);

    return (
        <div
            className={classNames(cls.fixedOnScroll)}
            ref={wrapper}
        >
            <div className={classNameWrapper}>
                <div
                    className={classNames(
                        cls.block,
                        className,
                        { [cls.isFixed]: isFixed },
                        classNameOnFixed && { [classNameOnFixed]: isFixed },
                    )}
                    ref={block}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
