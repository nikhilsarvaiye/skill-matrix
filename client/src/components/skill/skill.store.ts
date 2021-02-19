import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';
import { BaseStore } from '@components/shared/store/base.store';

export class SkillStore extends BaseStore<SkillModel> {
    constructor(skillService: SkillService) {
        super(skillService);
    }
}
