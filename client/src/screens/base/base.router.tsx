import { ReactNode } from 'react';

export interface Route {
    path: string;
    build: (args: any) => string;
}

export interface Routes {
    root: Route;
    new: Route;
    edit: Route;
}

export abstract class BaseRouter<T extends Routes> {
    abstract baseRouteName: string;
    abstract customRoutes: T | null;
    abstract Router: ReactNode;

    getBaseRoutes(): Routes {
        return {
            root: {
                path: `/${this.baseRouteName}s`,
                build: (args: any) => '',
            },
            new: {
                path: `/${this.baseRouteName}`,
                build: (args: any) => '',
            },
            edit: {
                path: `/${this.baseRouteName}/:id?`,
                build: (args: any) => {
                    return args && args.id
                        ? `${this.baseRouteName}/${args.id}`
                        : `/${this.baseRouteName}`;
                },
            },
        };
    }

    getRoutes(): T {
        return {
            ...(this.customRoutes || {}),
            ...this.getBaseRoutes(),
        } as any;
    }
}
