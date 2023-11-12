export interface IUsersRole {
    id: number;
    name: string;
    accessLevel: 'ROOT' | 'SYSTEM' | 'MANUAL';
    rights: {
        [key: string]: boolean | number;
    };
}

export interface IUsersRoleItemData {
    name: string;
    rights: {
        [key: string]: boolean | number;
    };
}
