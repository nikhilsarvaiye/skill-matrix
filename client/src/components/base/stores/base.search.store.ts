import { action, makeObservable, observable } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
    SortOrder,
} from '@library/table';
import { QueryOptions } from 'odata-query';
import { BaseStore } from '.';
import { BaseModel, ISearchCriteria } from '../models';

export abstract class BaseSearchStore<IModel extends BaseModel> {
    loading = false;
    criteria: ISearchCriteria = {
        page: 1,
        pageSize: 10,
    };
    abstract defaultValues: any;

    constructor(public store: BaseStore<IModel>) {
        makeObservable(this, {
            loading: observable,
            change: action,
        });
    }

    search = async (criteria: any) => {
        this.criteria = {
            ...(criteria || {}),
        };
        const defaultQueryOptions = this.buildDefaultQueryOptions();
        const queryOptions = this.buildQueryOptions(defaultQueryOptions);
        this.store.paginate(queryOptions);
    };

    change = async (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => {
        this.criteria = {
            ...this.criteria,
            page: pagination.current as number,
            pageSize: pagination.pageSize as number,
            sortField: (sorter as any).field,
            sortOrder: (sorter as any).order,
        };
        const defaultQueryOptions = this.buildDefaultQueryOptions();
        const queryOptions = this.buildQueryOptions(defaultQueryOptions);
        this.store.paginate(queryOptions);
    };

    public buildDefaultQueryOptions = (
        queryOptions?: Partial<QueryOptions<IModel>>,
    ): Partial<QueryOptions<IModel>> => {
        queryOptions = queryOptions || {};
        queryOptions.top = this.criteria.pageSize;
        queryOptions.skip = this.criteria.page - 1;
        if (this.criteria.sortField) {
            const order =
                this.criteria.sortOrder == SortOrder.Ascend ? 'asc' : 'desc';
            queryOptions.orderBy = [
                `${this.criteria.sortField} ${order}`,
            ] as any;
        }
        return queryOptions;
    };

    abstract buildQueryOptions(
        queryOptions?: Partial<QueryOptions<IModel>>,
    ): Partial<QueryOptions<IModel>>;
}
