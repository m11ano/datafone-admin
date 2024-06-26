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
    const blockWrapper = useRef<HTMLDivElement>(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (wrapper.current && block.current && blockWrapper.current) {
                wrapper.current.getBoundingClientRect();
                if (window.scrollY > wrapper.current.getBoundingClientRect().top + window.scrollY) {
                    wrapper.current.style.height = `${wrapper.current.getBoundingClientRect().height}px`;

                    if (saveMaxWidthOnScroll) {
                        block.current.style.maxWidth = `${block.current.getBoundingClientRect().width}px`;
                    }

                    block.current.classList.add(cls.isFixed);
                    if (classNameOnFixed) {
                        block.current.classList.add(classNameOnFixed);
                    }
                    setIsFixed(true);
                } else {
                    wrapper.current.style.height = 'auto';

                    if (saveMaxWidthOnScroll) {
                        block.current.style.maxWidth = 'none';
                    }
                    block.current.classList.remove(cls.isFixed);
                    if (classNameOnFixed) {
                        block.current.classList.remove(classNameOnFixed);
                    }
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [saveMaxWidthOnScroll, classNameOnFixed]);

    return (
        <div
            className={classNames(cls.fixedOnScroll)}
            ref={wrapper}
        >
            <div
                className={classNameWrapper}
                ref={blockWrapper}
            >
                <div
                    className={classNames(cls.block, className)}
                    ref={block}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
