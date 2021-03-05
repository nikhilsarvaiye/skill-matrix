import { BaseModel } from '@components/base/models/base.model';

export class SkillModel extends BaseModel {
    name?: string;
    parentSkillId?: string;
}
