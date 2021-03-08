import { makeObservable, observable, action } from 'mobx';
import { BaseStore } from '@components/base/stores';
import { SkillModel, SkillService } from '@components/skill';
import {
    SkillWeightageModel,
    SkillWeightagesModel,
} from './skill-weightage.types';
import { SkillWeightagesService } from './skill-weightage.service';

export class SkillWeightageStore extends BaseStore<SkillWeightagesModel> {
    defaultValues: SkillWeightagesModel = {
        id: '',
        name: '',
        skills: [],
        loading: false,
    } as any;

    constructor(
        public skillWeightagesService: SkillWeightagesService,
        public skillService: SkillService,
    ) {
        super(skillWeightagesService);
        makeObservable(this, {
            onSkillSelection: action,
            deleteSkillWeightage: action,
        });
    }

    onSkillSelection = (
        skill: SkillModel,
        skillWeightages: SkillWeightagesModel,
    ) => {
        if (
            skill &&
            !(skillWeightages.skills || []).find((x) => x.id === skill.id)
        ) {
            skillWeightages.skills = [
                ...(skillWeightages.skills || []),
                {
                    id: skill.id,
                    name: skill.name,
                    weightage: 0,
                    skills: [],
                } as any,
            ];
        }
    };

    deleteSkillWeightage = (
        skillWeightage: SkillWeightageModel,
        skillWeightages: SkillWeightagesModel,
    ) => {
        if (skillWeightage) {
            if (skillWeightages.skills) {
                const filteredData = skillWeightages.skills.filter(
                    (x) => x !== skillWeightage,
                );
                skillWeightages.skills = filteredData;
            } else {
                const filteredData = this.selectedItem.skills.filter(
                    (x) => x !== skillWeightage,
                );
                this.selectedItem.skills = filteredData;
            }
        }
    };
}
