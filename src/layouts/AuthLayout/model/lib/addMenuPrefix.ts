import { MenuItem } from '@/shared/config/modules/types';

const addMenuPrefixDo = (menu: MenuItem[], prefix: string, postPrefix: string = '') => {
    menu.forEach((item, index) => {
        const postPrefixNext = `${item!.key}_`;
        menu[index].key = `${prefix}${postPrefix}${item!.key}`;
        menu[index].children = item.children && addMenuPrefixDo(item.children, prefix, postPrefixNext);
    });

    return menu;
};

export const addMenuPrefix = (menu: MenuItem[], prefix: string) => addMenuPrefixDo(menu, prefix);
