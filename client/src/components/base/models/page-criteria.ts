import { SortOrder } from '@library/table/table-component';

export interface IPageCriteria {
    page: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: SortOrder;
}
