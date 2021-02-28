import { BaseStore } from '@components/base/stores/base.store';
import { DesignationModel, DesignationService } from '.';

export class DesignationStore extends BaseStore<DesignationModel> {
    defaultValues: any = {
        id: '',
        name: '',
    };
    constructor(designationService: DesignationService) {
        super(designationService);
    }
}
