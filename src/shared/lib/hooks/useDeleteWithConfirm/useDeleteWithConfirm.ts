import { useLayout } from '@/layouts/AuthLayout/lib/useLayout';

export const useDeleteWithConfirm = () => {
    const { antdHookApi } = useLayout();
    return async (action: string | (() => void), itemTitle: string = '', successText: string = 'Удалено') => {
        if (antdHookApi.modal) {
            const confirmed = await antdHookApi.modal.confirm({
                title: 'Внимание',
                content: `Вы действительно хотите удалить${itemTitle ? ` ${itemTitle}` : ``}?`,
            });
            if (confirmed) {
                try {
                    antdHookApi.message?.loading({ content: 'Загрузка...' });
                    if (typeof action === 'function') {
                        await action();
                        antdHookApi.message?.destroy();
                        antdHookApi.message?.success({ content: successText, duration: 2 });
                    } else {
                        console.log(action);
                    }
                } catch (e: any) {
                    antdHookApi.message?.destroy();
                    antdHookApi.message?.error({ content: e.data.message || 'unknown error', duration: 2 });
                }
            }
        }
    };
};
