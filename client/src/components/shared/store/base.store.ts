import { makeObservable, observable, action } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
} from '@library/table';
import { IService } from '../services';
import { success } from '@library/modal';
import { QueryOptions } from 'odata-query';

export class BaseStore<IModel> {
    loading = false;
    items: IModel[] = [];
    selectedItem: IModel | null = null;
    criteria = {
        page: 1,
        pageSize: 25,
    };
    /**
     *
     */
    constructor(public service: IService<IModel>) {
        makeObservable(this, {
            loading: observable,
            items: observable,
            criteria: observable,
            getAll: action,
            change: action,
            clearSelectedItem: action,
        });
    }

    getAll = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            this.items = (await this.service.getAll(queryOptions)) as IModel[];
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
            success({
                content: `${this.service.name} has been created successfully.`,
                onOk: () => {
                    if (onCreate) {
                        onCreate();
                    }
                },
            });
        } finally {
            this.loading = false;
        }
    };

    update = async (id: string, skill: IModel, onUpdate?: () => void) => {
        try {
            this.loading = true;
            await this.service.update(id, skill);
            success({
                content: `${this.service.name} has been updated successfully.`,
                onOk: () => {
                    if (onUpdate) {
                        onUpdate();
                    }
                },
            });
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
            // sortField: (sorter as any).field,
            // sortOrder: (sorter as any).order,
        };
    };

    clearSelectedItem = () => {
        this.selectedItem = null;
    };
}
