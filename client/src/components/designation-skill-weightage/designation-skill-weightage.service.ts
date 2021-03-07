import { IService, BaseService } from '@components/base/services';
import { DesignationSkillWeightagesModel } from './designation-skill-weightage.types';

export class DesignationSkillWeightagesService
    extends BaseService<DesignationSkillWeightagesModel>
    implements IService<DesignationSkillWeightagesModel> {
    constructor() {
        super('DesignationSkillWeightages', 'designationSkillWeightages');
    }
}
