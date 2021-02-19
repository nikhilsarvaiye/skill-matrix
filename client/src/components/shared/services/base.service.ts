import { Api } from '@components/shared/api/base.api';
import buildQuery, { QueryOptions } from 'odata-query';
import { IService } from './iservice';

export class BaseService<T> implements IService<T> {
    constructor(public name: string, public routePath: string) {
    }

    getAll = async (queryOptions?: Partial<QueryOptions<T>>) => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<T[]>(`${this.routePath}${query}`);
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
}
