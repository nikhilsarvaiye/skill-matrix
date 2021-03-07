import { BaseStore } from '@components/base/stores/base.store';
import { DesignationService } from './designation.service';
import { DesignationModel } from './designation.types';

export class DesignationStore extends BaseStore<DesignationModel> {
    defaultValues: any = {
        id: '',
        name: '',
    };
    constructor(designationService: DesignationService) {
        super(designationService);
    }
}
