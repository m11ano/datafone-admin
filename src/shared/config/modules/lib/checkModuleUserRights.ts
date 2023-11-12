import { IAuthUserData } from '@/app/providers/AuthProvider/model/types/iAuthUserData';
import { ModulesListItem } from '@/shared/config/modules/types';

export const checkModuleUserRights = (authUserData: IAuthUserData, module: ModulesListItem): boolean => {
    const checkRights = module.params.checkUserRights || [];
    if (module.type === 'core') {
        checkRights?.push('core::access_to_admin_core_settings');
    }

    const check = checkRights.every((right) => {
        if (authUserData.rights[right] !== true) {
            return false;
        }
        return true;
    });

    if (check === false) {
        return false;
    }

    return true;
};
