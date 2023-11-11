export interface IUsersRole {
    id: number;
    name: string;
    accessLevel: 'ROOT' | 'SYSTEM' | 'MANUAL';
    rights: {
        [key: number]: boolean | number;
    };
}
