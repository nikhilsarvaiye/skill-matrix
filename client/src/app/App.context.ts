import { makeObservable, observable } from 'mobx';

export enum ThemeType {
    Blue = 'blue',
    Green = 'green',
    Red = 'red',
    Purple = 'purple',
    Yellow = 'yellow',
}

class AppStore {
    loading = false;
    theme: ThemeType = ThemeType.Blue;
    constructor() {
        makeObservable(this, {
            loading: observable,
            theme: observable,
        });
    }
}

const appStore = new AppStore();
export { appStore as AppContext };
