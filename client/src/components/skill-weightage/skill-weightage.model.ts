import { BaseModel } from '@components/base/models/base.model';
import { SkillModel } from '@components/skill';

export class SkillWeightageModel extends SkillModel {
    weightage: number = 0;
}

export class SkillWeightagesModel extends BaseModel {
    name: string = '';
    skills: SkillModel[] = [];
}
