import { useMediaQuery } from 'react-responsive';

const sizes = {
    xs: 575,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
};

export const useDocWidthSize = (size: keyof typeof sizes | number, mode: 'more' | 'less') => {
    const sizeValue = typeof size === 'number' ? size : sizes[size];
    return useMediaQuery(mode === 'more' ? { minWidth: sizeValue } : { maxWidth: sizeValue - 1 });
};
