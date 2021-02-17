import { Api } from '@components/shared/api/base.api';

export class BaseService<T> {
    route = '';
    constructor(route: string) {
        this.route = route;
    }

    getAll = async () => {
        const response = await Api.get<T[]>(`${this.route}`);
        return response.data;
    };

    get = async (id: string) => {
        const response = await Api.get<T>(`${this.route}/${id}`);
        return response.data;
    };

    create = async (skill: T) => {
        const response = await Api.post<T>(`${this.route}`, skill);
        return response.data;
    };

    update = async (id: string, skill: T) => {
        const response = await Api.put<T>(
            `${this.route}/${id}`,
            skill,
        );
        return response.data;
    };
}
