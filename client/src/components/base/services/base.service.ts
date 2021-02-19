import { Api } from '@components/base/api/base.api';
import buildQuery, { QueryOptions } from 'odata-query';
import { BaseModel, IPageResponse } from '../models';
import { IService } from './iservice';

export class BaseService<T extends BaseModel> implements IService<T> {
    constructor(public name: string, public routePath: string) {}

    list = async (queryOptions?: Partial<QueryOptions<T>>): Promise<T[]> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<T[]>(`${this.routePath}${query}`);
        return response.data;
    };

    paginate = async (
        queryOptions?: Partial<QueryOptions<T>>,
    ): Promise<IPageResponse> => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<IPageResponse>(
            `${this.routePath}${query}`,
        );
        return response.data;
    };

    get = async (id: string): Promise<T | null> => {
        const response = await Api.get<T[]>(`${this.routePath}?id=${id}`);
        return response.data.length ? response.data[0] : null;
    };

    create = async (skill: T): Promise<T> => {
        const response = await Api.post<T>(`${this.routePath}`, skill);
        return response.data;
    };

    update = async (id: string, skill: T): Promise<void> => {
        await Api.put<T>(`${this.routePath}?id=${id}`, skill);
    };

    delete = async (id: string): Promise<void> => {
        await Api.delete<T>(`${this.routePath}?id=${id}`);
    };
}
