import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { SkillModel } from './skill.types';
import { SkillStore } from './skill.store';

export interface ISkillSearchCriteria extends ISearchCriteria {
    name?: string;
    parentSkillId?: string | null;
}

export class SkillSearchStore extends BaseSearchStore<SkillModel> {
    loading = false;
    defaultValues: any = null;
    criteria: ISkillSearchCriteria = null as any;

    constructor(public store: SkillStore) {
        super(store);
        this.criteria = {
            page: 1,
            pageSize: 10,
            sortField: 'name',
            sortOrder: SortOrder.Ascend,
            name: '',
            parentSkillId: null,
        } as ISkillSearchCriteria;
        this.defaultValues = this.criteria;
        makeObservable(this, {
            criteria: observable,
        });
    }

    public buildQueryOptions = (
        queryOptions?: Partial<QueryOptions<SkillModel>>,
    ): Partial<QueryOptions<SkillModel>> => {
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
                this.criteria.parentSkillId
                    ? {
                          parentSkillId: this.criteria.parentSkillId,
                      }
                    : {},
            ],
        };
        return queryOptions;
    };
}
