import { action, computed, makeObservable, observable } from 'mobx';
import { AppContext, ThemeType } from '@app';
import { User } from './auth-types';

export class UserContext {
    User: User = null as any;
    theme: ThemeType = ThemeType.Red;
    constructor() {
        makeObservable(this, {
            User: observable,
            theme: observable,
            isLoggedIn: computed,
            setUser: action,
            setTheme: action,
        });
        this.theme = AppContext.theme;
    }

    get isLoggedIn(): boolean {
        return this.User != null;
    }

    setUser = (user: User): void => {
        this.User = user;
    };

    setTheme = (theme: ThemeType) => {
        this.theme = theme;
    };
}
