import { makeObservable, observable, action, runInAction } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
    SortOrder,
} from '@library/table';
import { QueryOptions } from 'odata-query';
import { success, confirm } from '@library/modal';
import { message } from '@library/message';
import { IService } from '../services';
import { BaseModel, IPageResponse } from '../models';
import { IPageCriteria } from '../models/page-criteria';

export abstract class BaseStore<IModel extends BaseModel> {
    loading = false;
    items: IPageResponse = {
        count: 0,
        items: [],
    };
    selectedItem: IModel | null = null;
    criteria: IPageCriteria = {
        page: 1,
        pageSize: 10,
        sortField: 'name',
        sortOrder: SortOrder.Ascend,
    };

    abstract defaultValues: any;

    /**
     *
     */
    constructor(public service: IService<IModel>) {
        makeObservable(this, {
            loading: observable,
            criteria: observable,
            items: observable,
            paginate: action,
            list: action,
            create: action,
            update: action,
            delete: action,
            confirmDelete: action,
            change: action,
            clearSelectedItem: action,
        });
    }

    paginate = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            queryOptions = this.buildDefaultQueryOptions(queryOptions);
            queryOptions.count = true;
            this.items = ((await this.service.paginate(
                queryOptions,
            )) as IPageResponse) as IPageResponse;
        } finally {
            this.loading = false;
        }
    };

    list = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            this.criteria.page = 1;
            queryOptions = this.buildDefaultQueryOptions(queryOptions);
            const items = (await this.service.list(queryOptions)) as IModel[];
            this.items = {
                count: items.length,
                items: items,
            };
        } finally {
            this.loading = false;
        }
    };

    get = async (id: string) => {
        try {
            this.loading = true;
            this.selectedItem = (await this.service.get(id)) as IModel;
        } finally {
            this.loading = false;
        }
    };

    create = async (skill: IModel, onCreate?: () => void) => {
        try {
            this.loading = true;
            this.selectedItem = (await this.service.create(skill)) as IModel;
            message.success(
                `${this.service.name} has been created successfully.`,
            );
            if (onCreate) {
                onCreate();
            }
        } finally {
            this.loading = false;
        }
    };

    update = async (id: string, skill: IModel, onUpdate?: () => void) => {
        try {
            this.loading = true;
            await this.service.update(id, skill);
            message.success(
                `${this.service.name} has been updated successfully.`,
            );
            if (onUpdate) {
                onUpdate();
            }
            this.get(id);
        } finally {
            this.loading = false;
        }
    };

    confirmDelete = async (id: string, onDelete?: () => void) => {
        confirm({
            content: `Are you sure you want to delete?`,
            onOk: () => {
                this.delete(id, onDelete);
            },
        });
    };

    delete = async (id: string, onDelete?: () => void) => {
        try {
            this.loading = true;
            await this.service.delete(id);
            message.success(
                `${this.service.name} has been deleted successfully.`,
            );
            if (onDelete) {
                onDelete();
            }
            this.criteria.page = 1;
            this.paginate();
        } finally {
            this.loading = false;
        }
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
        this.paginate();
    };

    clearSelectedItem = () => {
        this.selectedItem = null;
    };

    buildDefaultQueryOptions = (
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
}
