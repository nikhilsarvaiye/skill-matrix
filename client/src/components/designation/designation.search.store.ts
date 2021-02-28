import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { DesignationModel, DesignationStore } from '.';

export interface IDesignationSearchCriteria extends ISearchCriteria {
    name?: string;
}

export class DesignationSearchStore extends BaseSearchStore<DesignationModel> {
    loading = false;
    defaultValues: any = {
        page: 1,
        pageSize: 10,
        sortField: 'name',
        sortOrder: SortOrder.Ascend,
        name: '',
    };
    criteria: IDesignationSearchCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'name',
        sortOrder: SortOrder.Ascend,
        name: '',
    };

    constructor(public store: DesignationStore) {
        super(store);
        makeObservable(this, {
            criteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<DesignationModel>>,
    ): Partial<QueryOptions<DesignationModel>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = {
            and: [
                this.criteria.name
                    ? {
                          name: {
                              contains: this.criteria.name,
                          },
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}
