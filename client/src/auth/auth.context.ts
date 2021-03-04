import { action, computed, makeObservable, observable } from 'mobx';
import { User } from './auth-types';

export class AuthContext {
    User: User = null as any;

    constructor() {
        makeObservable(this, {
            User: observable,
            isLoggedIn: computed,
            setUser: action,
        });
    }

    get isLoggedIn(): boolean {
        return this.User != null;
    }

    setUser = (user: User): void => {
        this.User = user;
    };
}
