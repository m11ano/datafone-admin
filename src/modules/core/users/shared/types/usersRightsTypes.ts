export interface IUsersBoolRight {
    type: 'POSITIVE_BOOLEAN' | 'NEGATIVE_BOOLEAN';
    id: number;
    name: string;
    title: string;
    tooltip: string;
    sourceType: 'CORE' | 'CLIENT';
    defaultValue: string;
    defaultRootValue: string;
}

export interface IUsersNumberRight {
    type: 'POSITIVE_NUMBER' | 'NEGATIVE_NUMBER';
    id: number;
    name: string;
    title: string;
    tooltip: string;
    sourceType: 'CORE' | 'CLIENT';
    defaultValue: string;
    defaultRootValue: string;
}

export type IUsersRight = IUsersBoolRight | IUsersNumberRight;
