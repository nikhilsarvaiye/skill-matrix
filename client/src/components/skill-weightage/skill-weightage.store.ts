import { makeObservable, observable, action } from 'mobx';
import { SkillModel, SkillService } from '@components/skill';
import { SkillWeightagesModel } from '.';
import { SkillWeightageModel } from './skill-weightage.model';

export class SkillWeightageStore {
    loading: boolean = false;
    skillWeightages: SkillWeightagesModel = {
        id: '',
        skills: [],
    };
    defaultValues: SkillWeightagesModel = {
        id: '',
        skills: [],
        loading: false,
    } as any;

    constructor(skillService: SkillService) {
        makeObservable(this, {
            loading: observable,
            skillWeightages: observable,
            getParentSkills: action,
            getChildSkills: action,
        });
    }

    getParentSkills = async () => {
        try {
            this.loading = true;
            var skillService = new SkillService();
            const skills = await skillService.list({
                filter: {
                    parentSkillId: null,
                },
                select: ['id', 'name'],
            });
            this.skillWeightages.skills = this.addKeys(skills);
        } finally {
            this.loading = false;
        }
    };

    getChildSkills = async (item: SkillModel) => {
        if (!this.skillWeightages) {
            return;
        }
        const existingItem = this.skillWeightages.skills.find(
            (x) => x.id == item.id,
        ) as any;
        if (existingItem) {
            try {
                existingItem.loading = true;
                var skillService = new SkillService();
                const skills = await skillService.list({
                    filter: {
                        parentSkillId: item.id,
                    },
                    select: ['id', 'name'],
                });
                existingItem.skills = this.addKeys(skills, existingItem);
            } finally {
                existingItem.loading = false;
            }
        }
    };

    addKeys = (skills: any[], skill?: any) => {
        skills.forEach((x) => {
            x.index = skills.indexOf(x);
            x.key = `${skill ? `${skill.key}.` : ''}skills[${x.index}]`;
        });
        return skills;
    };
}
