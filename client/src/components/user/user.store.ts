import { BaseStore } from '@components/base/stores/base.store';
import { UserService } from './user.service';
import { User } from './user.types';

export class UserStore extends BaseStore<User> {
    defaultValues: any = {
        id: '',
        name: '',
    };
    constructor(userService: UserService) {
        super(userService);
    }
}
