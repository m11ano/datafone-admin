import { IAuthUserData } from '@/app/providers/AuthProvider/model/types/iAuthUserData';
import { ModulesListItem } from '@/shared/config/modules/types';

export const checkModuleUserRights = (authUserData: IAuthUserData, module: ModulesListItem): boolean => {
    if (module.type === 'core') {
        if (authUserData.rights['core::access_to_admin_core_settings'] !== true) {
            return false;
        }
    } else if (module.type === 'client' && module.params.checkUserRights) {
        const check = module.params.checkUserRights.every((right) => {
            if (authUserData.rights[right] !== true) {
                return false;
            }
            return true;
        });

        if (check === false) {
            return false;
        }
    }

    return true;
};
