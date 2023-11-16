import { Button, Dropdown } from 'antd';
import { memo, useMemo } from 'react';
import { DropdownButtonProps } from 'antd/es/dropdown';
import { ButtonProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import { urlResolve } from '@/shared/lib/helpers/urlResolve';

export interface ButtonLinkMenuProps {
    label: React.ReactNode;
    linkTo?: string;
    danger?: boolean;
    icon?: React.ReactNode;
    onClick?: (e: any) => void;
}

interface ButtonLinkButtonProps extends ButtonProps {
    as: 'button';
    linkTo?: string;
    onClick?: ButtonProps['onClick'];
    menu?: ButtonLinkMenuProps[];
}

interface ButtonLinkDropdownProps extends Omit<DropdownButtonProps, 'menu'> {
    as: 'dropdown';
    linkTo?: string;
    onClick?: ButtonProps['onClick'];
    menu: ButtonLinkMenuProps[];
}

type ButtonLinkProps = ButtonLinkButtonProps | ButtonLinkDropdownProps;

export const ButtonLink = memo((props: ButtonLinkProps) => {
    const { as, children, linkTo, onClick, menu = [], ...otherProps } = props;
    const navigate = useNavigate();

    const menuProp = useMemo<DropdownButtonProps['menu'] | undefined>(() => {
        if (as === 'dropdown') {
            //
            return {
                items: [
                    ...menu.map((menuItem, index) => ({
                        label: menuItem.linkTo ? (
                            <a href={urlResolve(__APP_URL_PREFIX__, menuItem.linkTo)}>{menuItem.label}</a>
                        ) : (
                            menuItem.label
                        ),
                        danger: menuItem.danger,
                        icon: menuItem.icon,
                        key: index,
                    })),
                ],
                onClick: (e) => {
                    e.domEvent.preventDefault();
                    e.domEvent.stopPropagation();
                    const menuItem = menu[Number(e.key)];
                    if (menuItem.onClick) menuItem.onClick(e);
                    if (menuItem.linkTo) navigate(menuItem.linkTo);
                },
            } as DropdownButtonProps['menu'];
        }
        return undefined;
    }, [as, menu, navigate]);

    return as === 'button' ? (
        <Button
            href={linkTo && urlResolve(__APP_URL_PREFIX__, linkTo)}
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
                if (linkTo) navigate(linkTo);
            }}
            {...otherProps}
        >
            {children}
        </Button>
    ) : (
        <Dropdown.Button
            href={linkTo && urlResolve(__APP_URL_PREFIX__, linkTo)}
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
                if (linkTo) navigate(linkTo);
            }}
            menu={menuProp}
            {...otherProps}
        >
            {children}
        </Dropdown.Button>
    );
});
