import { QueryOptions } from 'odata-query';

export interface IService<T> {
    name: string;
    routePath: string;
    getAll(queryOptions?: Partial<QueryOptions<T>>): Promise<T[]>;
    get(id: string): Promise<T | null>;
    create(skill: T): Promise<T>;
    update(id: string, skill: T): Promise<void>;
}
