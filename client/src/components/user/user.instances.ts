import { UserService } from './user.service';
import { UserStore } from './user.store';
import { UserSearchStore } from './user.search.store';

export const userService = new UserService();
export const userStore = new UserStore(userService);
export const userSearchStore = new UserSearchStore(userStore);
