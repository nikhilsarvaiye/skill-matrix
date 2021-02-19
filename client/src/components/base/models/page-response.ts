import { IModel } from '.';

export interface IPageResponse {
    count: number;
    items: IModel[];
}
