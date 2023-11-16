import { useContext } from 'react';
import { LayoutContext, LayoutContextProps } from './LayoutContext';

interface IUseLayout extends LayoutContextProps {}

export function useLayout(): IUseLayout {
    const { antdHookApi } = useContext(LayoutContext);

    return {
        antdHookApi,
    };
}
