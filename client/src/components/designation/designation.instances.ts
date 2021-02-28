import { DesignationService } from './designation.service';
import { DesignationStore } from './designation.store';
import { DesignationSearchStore } from './designation.search.store';

export const designationService = new DesignationService();
export const designationStore = new DesignationStore(designationService);
export const designationSearchStore = new DesignationSearchStore(
    designationStore,
);
