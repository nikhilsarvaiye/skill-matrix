import { BaseModel } from '@components/base/models/base.model';

export class UserSkillWeightageModel extends BaseModel {
    name: string = '';
    weightage: number = 0;
    userWeightage: number = 0;
    skills: UserSkillWeightageModel[] = [];
}

export class UserSkillWeightagesModel extends BaseModel {
    name: string = '';
    designationId: string = '';
    userId: string = '';
    skillWeightagesId: string = '';
    skills: UserSkillWeightageModel[] = [];
}
