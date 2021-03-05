import { makeObservable, observable, action, runInAction } from 'mobx';
import { QueryOptions } from 'odata-query';
import { confirm } from '@library/modal';
import { message } from '@library/message';
import { IService } from '../services';
import { BaseModel, IPageResponse } from '../models';

export abstract class BaseStore<IModel extends BaseModel> {
    loading = false;
    items: IPageResponse = {
        count: 0,
        items: [],
    };
    selectedItem: IModel = {
        id: '',
    } as any;
    abstract defaultValues: any;

    constructor(public service: IService<IModel>) {
        makeObservable(this, {
            loading: observable,
            items: observable,
            selectedItem: observable,
            paginate: action,
            list: action,
            create: action,
            update: action,
            delete: action,
            confirmDelete: action,
            clearSelectedItem: action,
        });
    }

    paginate = async (queryOptions?: Partial<QueryOptions<IModel>>) => {
        try {
            this.loading = true;
            queryOptions = queryOptions || {};
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
            this.paginate();
        } finally {
            this.loading = false;
        }
    };

    clearSelectedItem = () => {
        this.selectedItem = {
            id: '',
        } as any;
    };
}
