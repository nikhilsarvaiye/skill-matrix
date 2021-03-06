import { IService, BaseService } from '@components/base/services';
import { SkillModel } from './skill.types';

export class SkillService
    extends BaseService<SkillModel>
    implements IService<SkillModel> {
    constructor() {
        super('Skill', 'skill');
    }
}
