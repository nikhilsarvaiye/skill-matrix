import { IService, BaseService } from '@components/shared/services';
import { SkillModel } from './skill.model';

export class SkillService
    extends BaseService<SkillModel>
    implements IService<SkillModel> {
    constructor() {
        super('Skill', 'skill');
    }
}
