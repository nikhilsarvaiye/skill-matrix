import { Api } from '@components/base/api/base.api';
import { IService, BaseService } from '@components/base/services';
import { UserSkillWeightagesModel } from './user-skill-weightage.types';

export class UserSkillWeightageService
    extends BaseService<UserSkillWeightagesModel>
    implements IService<UserSkillWeightagesModel> {
    constructor() {
        super('UserSkillWeightages', 'userSkillWeightages');
    }

    getCurrentUserDefault = async (): Promise<UserSkillWeightagesModel> => {
        const response = await Api.get<UserSkillWeightagesModel>(
            `${this.routePath}/default`,
        );
        return response.data;
    };
}
