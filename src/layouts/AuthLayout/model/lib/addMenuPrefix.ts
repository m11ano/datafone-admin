import { MenuItem } from '@/shared/config/modules/types';

const addMenuPrefixDo = (menu: MenuItem[], prefix: string) => {
    menu = menu.map((item) => ({
        ...item,
        key: `${prefix}${item!.key}`,
    }));

    menu.forEach((item, index) => {
        menu[index].children = item.children && addMenuPrefixDo(item.children, prefix);
    });
    // for (const i in menu) {
    //     if (item.children) {
    //         item.children = addMenuPrefixDo(item.children, prefix);
    //     }
    // }

    return menu;
};

export const addMenuPrefix = (menu: MenuItem[], prefix: string) => addMenuPrefixDo(menu, prefix);
