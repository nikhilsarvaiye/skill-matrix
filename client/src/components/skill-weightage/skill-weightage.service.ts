import { IService, BaseService } from '@components/base/services';
import { SkillWeightagesModel } from './skill-weightage.types';

export class SkillWeightagesService
    extends BaseService<SkillWeightagesModel>
    implements IService<SkillWeightagesModel> {
    constructor() {
        super('SkillWeightages', 'skillWeightages');
    }
}
