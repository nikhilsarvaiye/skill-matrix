import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { SkillWeightagesModel } from './skill-weightage.types';
import { SkillWeightageStore } from './skill-weightage.store';

export interface ISkillWeightageSearchCriteria extends ISearchCriteria {
    name?: string;
    parentSkillWeightageId?: string | null;
}

export class SkillWeightageSearchStore extends BaseSearchStore<SkillWeightagesModel> {
    loading = false;
    defaultValues: any = null;
    criteria: ISkillWeightageSearchCriteria = null as any;

    constructor(public store: SkillWeightageStore) {
        super(store);
        this.criteria = {
            page: 1,
            pageSize: 10,
            sortField: 'name',
            sortOrder: SortOrder.Ascend,
            name: '',
            parentSkillWeightageId: null,
        } as ISkillWeightageSearchCriteria;
        this.defaultValues = this.criteria;
        makeObservable(this, {
            criteria: observable,
        });
    }

    public buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<SkillWeightagesModel>>,
    ): Partial<QueryOptions<SkillWeightagesModel>> => {
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
                this.criteria.parentSkillWeightageId
                    ? {
                          parentSkillWeightageId: this.criteria
                              .parentSkillWeightageId,
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}
