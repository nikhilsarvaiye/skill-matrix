import { Api } from '@components/shared/api/base.api';
import buildQuery, { QueryOptions } from 'odata-query';

export class BaseService<T> {
    route = '';
    constructor(route: string) {
        this.route = route;
    }

    getAll = async (queryOptions?: Partial<QueryOptions<T>>) => {
        const query = buildQuery(queryOptions);
        const response = await Api.get<T[]>(`${this.route}${query}`);
        return response.data;
    };

    getAllByName = async (name: string, pageSize: number): Promise<T[]> => {
        const response = await Api.get<T[]>(
            `${this.route}?$filter=name eq '${name}'&$top=${pageSize}`,
        );
        return response.data;
    };

    get = async (id: string): Promise<T | null> => {
        const response = await Api.get<T[]>(`${this.route}?id=${id}`);
        return response.data.length ? response.data[0] : null;
    };

    create = async (skill: T) => {
        const response = await Api.post<T>(`${this.route}`, skill);
        return response.data;
    };

    update = async (id: string, skill: T) => {
        const response = await Api.put<T>(`${this.route}?id=${id}`, skill);
        return response.data;
    };
}
