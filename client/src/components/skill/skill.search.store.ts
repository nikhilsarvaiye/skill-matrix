import { makeObservable, observable, action } from 'mobx';
import { SortOrder } from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseSearchStore } from '@components/base/stores';
import { ISearchCriteria } from '../base/models';
import { SkillModel } from './skill.model';
import { SkillStore } from './skill.store';

export interface ISkillSearchCriteria extends ISearchCriteria {
    name?: string;
    parentSkillId?: string | null;
}

export class SkillSearchStore extends BaseSearchStore<SkillModel> {
    loading = false;
    defaultValues: any = {
        page: 1,
        pageSize: 10,
        sortField: 'name',
        sortOrder: SortOrder.Ascend,
        name: '',
        parentSkillId: null,
    };
    criteria: ISkillSearchCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'name',
        sortOrder: SortOrder.Ascend,
        name: '',
        parentSkillId: null,
    };

    constructor(public store: SkillStore) {
        super(store);
        makeObservable(this, {
            criteria: observable,
        });
    }

    buildQueryOptions = (
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
