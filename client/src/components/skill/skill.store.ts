import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';
import { BaseStore } from '@components/base/store/base.store';

export class SkillStore extends BaseStore<SkillModel> {
    defaultValues: any = {
        id: '',
        name: '',
        skillId: undefined,
    };
    constructor(skillService: SkillService) {
        super(skillService);
    }
}
