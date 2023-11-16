import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { createContext } from 'react';

export interface LayoutContextProps {
    antdHookApi: {
        modal?: HookAPI;
        message?: MessageInstance;
    };
}

export const LayoutContext = createContext<LayoutContextProps>({
    antdHookApi: {},
});
