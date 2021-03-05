import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { DesignationModel, DesignationStore } from '.';
import { isNullishCoalesce } from 'typescript';

export interface IDesignationSearchCriteria extends ISearchCriteria {
    name?: string;
}

export class DesignationSearchStore extends BaseSearchStore<DesignationModel> {
    loading = false;
    defaultValues: any = null;
    criteria: IDesignationSearchCriteria = null as any;

    constructor(public store: DesignationStore) {
        super(store);
        this.criteria = {
            page: 1,
            pageSize: 10,
            sortField: 'name',
            sortOrder: SortOrder.Ascend,
            name: '',
        } as IDesignationSearchCriteria;
        this.defaultValues = this.criteria;
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
