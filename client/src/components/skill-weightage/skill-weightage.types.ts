import { BaseModel } from '@components/base/models/base.model';

export class SkillWeightageModel extends BaseModel {
    name: string = '';
    weightage: number = 0;
    skills: SkillWeightageModel[] = [];
}

export class SkillWeightagesModel extends BaseModel {
    name: string = '';
    skills: SkillWeightageModel[] = [];
}
