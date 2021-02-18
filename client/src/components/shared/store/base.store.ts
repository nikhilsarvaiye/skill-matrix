import { makeObservable, observable, action } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
} from '@library/table';
import { BaseModel } from '../models';
import { BaseService } from '../services';
import { success } from '@library/modal';

export class BaseStore<BaseModel, BaseService> {
    loading = false;
    items: BaseModel[] = [];
    selectedItem: BaseModel | null = null;
    criteria = {
        page: 1,
        pageSize: 25,
    };
    /**
     *
     */
    constructor(public route: string) {
        makeObservable(this, {
            loading: observable,
            items: observable,
            criteria: observable,
            getAll: action,
            change: action,
        });
    }

    getAll = async (searchCriteria?: any) => {
        try {
            this.loading = true;
            const service = new BaseService(this.route);
            this.items = (await service.getAll()) as BaseModel[];
        } finally {
            this.loading = false;
        }
    };

    get = async (id: string) => {
        try {
            this.loading = true;
            const service = new BaseService(this.route);
            this.selectedItem = (await service.get(id)) as BaseModel;
        } finally {
            this.loading = false;
        }
    };

    create = async (skill: BaseModel, onCreate?: () => void) => {
        try {
            this.loading = true;
            const service = new BaseService(this.route);
            // this.selectedItem = (await service.create(skill)) as BaseModel;
            success({
                content: `${this.route} has been created successfully.`,
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

    update = async (id: string, skill: BaseModel, onUpdate?: () => void) => {
        try {
            this.loading = true;
            const service = new BaseService(this.route);
            this.selectedItem = (await service.update(id, skill)) as BaseModel;
            success({
                content: `${this.route} has been updated successfully.`,
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
}
