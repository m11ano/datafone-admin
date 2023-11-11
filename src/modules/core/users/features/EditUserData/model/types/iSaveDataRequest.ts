import { RcFile } from 'antd/es/upload';

export interface ISaveDataRequest {
    email: string;
    firstName: string;
    lastName: string;
    avatar?: 'null' | 'none';
    avatarFile?: RcFile;
}
