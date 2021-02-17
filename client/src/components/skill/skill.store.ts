import { makeObservable, observable, action } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
} from '@library/table';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';
import { BaseStore } from '@components/shared/store/base.store';

class SkillStore extends BaseStore<SkillModel, SkillService> {
    /**
     *
     */
    constructor() {
        super('skill');
    }
}
// class SkillStore {
//     loading = false;
//     skills: SkillModel[] = [];
//     selectedItem: SkillModel | null = null;
//     criteria = {
//         page: 1,
//         pageSize: 25,
//     };
//     /**
//      *
//      */
//     constructor() {
//         makeObservable(this, {
//             loading: observable,
//             skills: observable,
//             criteria: observable,
//             getAll: action,
//             change: action,
//         });
//     }

//     getAll = async (searchCriteria?: any) => {
//         try {
//             this.loading = true;
//             const skillService = new SkillService();
//             this.skills = await skillService.getAll();
//         } finally {
//             this.loading = false;
//         }
//     };

//     get = async (id: string) => {
//         try {
//             this.loading = true;
//             const skillService = new SkillService();
//             this.selectedItem = await skillService.get(id);
//         } finally {
//             this.loading = false;
//         }
//     };

//     create = async (skill: SkillModel) => {
//         try {
//             this.loading = true;
//             const skillService = new SkillService();
//             return await skillService.create(skill);
//         } finally {
//             this.loading = false;
//         }
//     };

//     update = async (id: string, skill: SkillModel) => {
//         try {
//             this.loading = true;
//             const skillService = new SkillService();
//             return await skillService.update(id, skill);
//         } finally {
//             this.loading = false;
//         }
//     };

//     change = async (
//         pagination: TablePaginationConfig,
//         filters: Record<string, (Key | boolean)[] | null>,
//         sorter: SorterResult<any> | SorterResult<any>[],
//         extra: TableCurrentDataSource<any>,
//     ) => {
//         this.criteria = {
//             ...this.criteria,
//             page: pagination.current as number,
//             pageSize: pagination.pageSize as number,
//             // sortField: (sorter as any).field,
//             // sortOrder: (sorter as any).order,
//         };
//     };
// }
const skillStore = new SkillStore();

export { skillStore as SkillStore };
