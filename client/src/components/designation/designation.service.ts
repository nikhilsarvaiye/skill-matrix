import { IService, BaseService } from '@components/base/services';
import { DesignationModel } from './designation.model';

export class DesignationService
    extends BaseService<DesignationModel>
    implements IService<DesignationModel> {
    constructor() {
        super('Designation', 'designation');
    }
}
