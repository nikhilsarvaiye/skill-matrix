import { BaseService } from '@components/shared/services';
import { SkillModel } from './skill.model';

export class SkillService extends BaseService<SkillModel> {
    route = 'skill';

    constructor() {
        super('skill');
    }
}
