import { IFileDto } from '@/shared/types/files';

export interface IUserList {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: number[];
    avatarThumb100: IFileDto | null;
}

export interface IUserItem {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: number[];
    avatarThumb100: IFileDto | null;
    avatarOriginal: IFileDto | null;
}
