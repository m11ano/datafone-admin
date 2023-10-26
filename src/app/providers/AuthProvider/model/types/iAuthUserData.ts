export interface IAuthUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: number[];
}

export interface IAuthUserRights {
    'core::access_to_admin': boolean;
    'core::access_to_admin_core_settings': boolean;
    [k: string]: boolean | number;
}

export interface IAuthUserData {
    user: IAuthUser;
    rights: IAuthUserRights;
}
