import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { DesignationSkillWeightagesModel } from './designation-skill-weightage.types';
import { DesignationSkillWeightagesStore } from './designation-skill-weightage.store';

export interface IDesignationSearchCriteria extends ISearchCriteria {
    designationId: string | null;
    skillWeightagesId: string | null;
}

export class DesignationSkillWeightagesSearchStore extends BaseSearchStore<DesignationSkillWeightagesModel> {
    loading = false;
    defaultValues: any = null;
    criteria: IDesignationSearchCriteria = null as any;

    constructor(public store: DesignationSkillWeightagesStore) {
        super(store);
        this.criteria = {
            page: 1,
            pageSize: 10,
            sortField: 'designationId',
            sortOrder: SortOrder.Ascend,
            designationId: null,
            skillWeightagesId: null,
        } as IDesignationSearchCriteria;
        this.defaultValues = this.criteria;
        makeObservable(this, {
            criteria: observable,
        });
    }

    buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<DesignationSkillWeightagesModel>>,
    ): Partial<QueryOptions<DesignationSkillWeightagesModel>> => {
        queryOptions = this.buildDefaultQueryOptions(queryOptions);
        queryOptions.filter = {
            and: [
                this.criteria.designationId
                    ? {
                          designationId: this.criteria.designationId,
                      }
                    : {},
                this.criteria.skillWeightagesId
                    ? {
                          skillWeightagesId: this.criteria.skillWeightagesId,
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}
