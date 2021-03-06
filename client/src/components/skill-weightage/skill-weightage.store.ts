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
    selectedSkill: SkillModel | null = null;

    constructor(
        public skillWeightagesService: SkillWeightagesService,
        public skillService: SkillService,
    ) {
        super(skillWeightagesService);
        makeObservable(this, {
            selectedSkill: observable,
            getParentSkills: action,
            getChildSkills: action,
            onSkillSelection: action,
            get: action,
        });
    }

    get = async (id: string) => {
        try {
            this.loading = true;
            const item = (await this.service.get(id)) as SkillWeightagesModel;
            this.selectedItem = this.addKeys(item);
        } finally {
            this.loading = false;
        }
    };

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
            // skillWeightages = this.addKeys(skillWeightages);
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

    getParentSkills = async () => {
        try {
            this.loading = true;
            const skills = await this.skillService.list({
                filter: {
                    parentSkillId: null,
                },
                select: ['id', 'name'],
            });
            // this.selectedItem = {
            //     id: '',
            //     name: '',
            //     skills: this.addKeys(skills),
            // };
            // this.selectedItem.skills = ;
        } finally {
            this.loading = false;
        }
    };

    getChildSkills = async (item: SkillWeightageModel) => {
        if (item) {
            try {
                (item as any).loading = true;
                const skills = await this.skillService.list({
                    filter: {
                        parentSkillId: item.id,
                    },
                    select: ['id', 'name'],
                });
                const skillWeightages = skills.map((x) => {
                    return {
                        id: x.id,
                        name: x.name,
                        weightage: 0,
                        skills: [],
                    } as SkillWeightageModel;
                });
                item.skills = skillWeightages;
                item = this.addKeys(item) as any;
            } finally {
                (item as any).loading = false;
            }
        }
    };

    addKeys = (skillWeightages: SkillWeightagesModel) => {
        skillWeightages.skills.forEach((x: any) => {
            x.index = skillWeightages.skills.indexOf(x);
            x.key = `${
                skillWeightages && (skillWeightages as any).key
                    ? `${(skillWeightages as any).key}.`
                    : ''
            }skills[${x.index}]`;
            if (x.skills && x.skills.length) {
                x = this.addKeys(x);
            }
        });
        return skillWeightages;
    };
}
