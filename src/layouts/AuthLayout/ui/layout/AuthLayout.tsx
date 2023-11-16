import classNames from 'classnames';
import { ReactNode, useEffect, useMemo } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Breadcrumb, Modal, message } from 'antd';
import { AuthLayoutHeader } from '../header/AuthLayoutHeader';
import { AuthLayoutAside } from '../aside/AuthLayoutAside';
import { useDocWidthSize } from '@/shared/lib/hooks/useDocWidthSize/useDocWidthSize';
import { BreadcrumbItem } from '@/shared/config/router/types';
import clientModules from '@/shared/config/modules/clientModules';
import coreModules from '@/shared/config/modules/coreModules';
import { checkModuleUserRights } from '@/shared/config/modules/lib/checkModuleUserRights';
import { useAuth } from '@/app/providers/AuthProvider';
import { addMenuPrefix } from '../../model/lib/addMenuPrefix';
import { MenuItem } from '@/shared/config/modules/types';
import { LayoutContext, LayoutContextProps } from '../../lib/LayoutContext';

interface AuthLayoutProps {
    className?: string;
    children: ReactNode;
    breadcrumb?: BreadcrumbItem[] | false;
    title?: string | false;
    selectedMenu?: string;
}

export const AuthLayout = (props: AuthLayoutProps) => {
    const { className, children, breadcrumb, title, selectedMenu } = props;
    const { authUserData } = useAuth();

    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();
    const docWidthXlMore = useDocWidthSize('xl', 'more');

    const menuItems = useMemo(() => {
        let menu: MenuItem[] = [];

        const coreModulesMenu: MenuItem[] = [];
        Object.values(coreModules).forEach((module) => {
            if (module.params.menu && authUserData !== null) {
                const rightsCheck = checkModuleUserRights(authUserData, module);
                if (rightsCheck === false) {
                    return;
                }
                coreModulesMenu.push(...addMenuPrefix(module.params.menu, `core_${module.params.name}_`));
            }
        });

        if (coreModulesMenu.length > 0) {
            menu = [
                ...menu,
                {
                    label: 'Система',
                    key: 'system',
                    children: [...coreModulesMenu],
                    type: 'group',
                },
                {
                    label: '',
                    key: '',
                    type: 'divider',
                },
            ];
        }

        const clientModulesMenu: MenuItem[] = [];
        Object.values(clientModules).forEach((module) => {
            if (module.params.menu && authUserData !== null) {
                const rightsCheck = checkModuleUserRights(authUserData, module);
                if (rightsCheck === false) {
                    return;
                }
                clientModulesMenu.push(...addMenuPrefix(module.params.menu, `client_${module.params.name}_`));
            }
        });

        if (clientModulesMenu.length > 0) {
            menu = [
                ...menu,
                {
                    label: 'Модули',
                    key: 'modules',
                    children: [...clientModulesMenu],
                    type: 'group',
                },
            ];
        }

        return menu;
    }, [authUserData]);

    const mainTitle = 'Панель управления';

    useEffect(() => {
        const titles: string[] = [];
        if (title) {
            titles.push(title);
        } else if (title !== false && breadcrumb) {
            const breadcrumbReversed = [...breadcrumb].reverse();
            breadcrumbReversed.forEach((item) => {
                titles.push(item.title);
            });
        }
        titles.push(mainTitle);
        document.title = titles.join(' / ');
    }, [breadcrumb, title]);

    const defaultLayoutContextProps = useMemo<LayoutContextProps>(
        () => ({
            antdHookApi: {
                modal,
                message: messageApi,
            },
        }),
        [modal, messageApi],
    );

    return (
        <LayoutContext.Provider value={defaultLayoutContextProps}>
            <div className={classNames('authLayout', [className])}>
                <AuthLayoutHeader
                    menuItems={menuItems}
                    selectedMenu={selectedMenu}
                />
                <div className="content">
                    {docWidthXlMore && (
                        <AuthLayoutAside
                            menuItems={menuItems}
                            selectedMenu={selectedMenu}
                        />
                    )}
                    <main>
                        <div>
                            {breadcrumb !== false && (
                                <Breadcrumb
                                    className="breadcrumb"
                                    items={[
                                        {
                                            title: (
                                                <Link to="/">
                                                    <HomeOutlined />
                                                </Link>
                                            ),
                                        },
                                        ...(breadcrumb
                                            ? [
                                                  ...breadcrumb.map((item, index) => ({
                                                      title:
                                                          index < breadcrumb.length - 1 && item.link ? (
                                                              <Link to={item.link}>{item.title}</Link>
                                                          ) : (
                                                              item.title
                                                          ),
                                                  })),
                                              ]
                                            : []),
                                    ]}
                                />
                            )}
                            <div className="mainContent">{children}</div>
                        </div>
                    </main>
                </div>
                {contextHolderModal}
                {contextHolderMessage}
            </div>
        </LayoutContext.Provider>
    );
};
