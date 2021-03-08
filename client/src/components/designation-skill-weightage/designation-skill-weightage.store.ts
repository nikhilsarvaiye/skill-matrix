import { BaseStore } from '@components/base/stores';
import {
    DesignationSkillWeightagesModel,
    SkillWeightageType,
} from './designation-skill-weightage.types';
import { DesignationSkillWeightagesService } from './designation-skill-weightage.service';

export class DesignationSkillWeightagesStore extends BaseStore<DesignationSkillWeightagesModel> {
    defaultValues: any = {
        id: '',
        name: '',
        type: SkillWeightageType.Designation,
    };
    constructor(designationService: DesignationSkillWeightagesService) {
        super(designationService);
    }
}
