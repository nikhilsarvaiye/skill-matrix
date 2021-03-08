import { action, makeObservable } from 'mobx';
import { BaseStore } from '@components/base/stores/base.store';
import { UserSkillWeightageService } from './user-skill-weightage.service';
import { UserSkillWeightagesModel } from './user-skill-weightage.types';

export class UserSkillWeightageStore extends BaseStore<UserSkillWeightagesModel> {
    defaultValues: any = {
        id: '',
        name: '',
    };
    constructor(public userSkillWeightageService: UserSkillWeightageService) {
        super(userSkillWeightageService);
        makeObservable(this, {
            getCurrentUserDefault: action,
        });
    }

    getCurrentUserDefault = async (): Promise<void> => {
        const userSkillWeightage = await this.userSkillWeightageService.getCurrentUserDefault();
        this.items = {
            count: 1,
            items: [userSkillWeightage],
        };
    };
}
