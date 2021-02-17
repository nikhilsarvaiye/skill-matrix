import { FormFieldCacheHandler } from './handlers/cache';
import { IFormFieldCacheConfig } from './handlers/cache';

export interface IFormFieldConfig {
    provider: any;
}

export class FormFieldHandlers {
    handlers: any[] = [];

    props = null;

    constructor({ cache }: { cache: IFormFieldCacheConfig }) {
        if (cache) {
            this.handlers.push(new FormFieldCacheHandler(cache) as any);
        }
    }

    getValues = (name: string) => {
        let values: any[] = [];
        this.handlers.forEach((handler) => {
            values.push(...handler.getValues(name));
        });
        return values;
    };

    setValues = (name: string, value: any) => {
        this.handlers.forEach((handler: any) => {
            handler.setValues(name, value);
        });
    };
}
