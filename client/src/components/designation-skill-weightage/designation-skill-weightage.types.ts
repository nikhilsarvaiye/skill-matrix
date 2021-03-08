import { BaseModel } from '@components/base/models/base.model';

export enum SkillWeightageType {
    Designation = 0,
    User = 1,
}

export class DesignationSkillWeightagesModel extends BaseModel {
    type: SkillWeightageType = SkillWeightageType.Designation;
    designationId: string = '';
    userId: string = '';
    skillWeightagesId: string = '';
}
