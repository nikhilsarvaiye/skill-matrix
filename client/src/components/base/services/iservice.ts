import { QueryOptions } from 'odata-query';
import { BaseModel, IPageResponse } from '../models';

export interface IService<T extends BaseModel> {
    name: string;
    routePath: string;
    list(queryOptions?: Partial<QueryOptions<T>>): Promise<T[]>;
    paginate(queryOptions?: Partial<QueryOptions<T>>): Promise<IPageResponse>;
    get(id: string): Promise<T | null>;
    create(skill: T): Promise<T>;
    update(id: string, skill: T): Promise<void>;
    delete(id: string): Promise<void>;
}
