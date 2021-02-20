import { BaseStore } from '@components/base/stores/base.store';
import { SkillModel, SkillService, SkillSearchStore } from '.';

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
