import { observable, action } from 'mobx';
import {
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
} from '@library/table';
import { SkillModel } from './skill.model';
import { SkillService } from './skill.service';

class SkillStore {
    @observable loading = false;
    @observable skills: SkillModel[] = [];

    @action getAll = async (searchCriteria?: any) => {
        try {
            this.loading = true;
            const skillService = new SkillService();
            this.skills = await skillService.getAll();
        } finally {
            this.loading = false;
        }
    };

    @action create = async (skill: SkillModel) => {
        try {
            this.loading = true;
            const skillService = new SkillService();
            return await skillService.create(skill);
        } finally {
            this.loading = false;
        }
    };

    @action update = async (id: string, skill: SkillModel) => {
        try {
            this.loading = true;
            const skillService = new SkillService();
            return await skillService.update(id, skill);
        } finally {
            this.loading = false;
        }
    };

    @observable criteria = {
        page: 1,
        pageSize: 25,
    };

    @action change = async (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => {
        this.criteria = {
            ...this.criteria,
            page: pagination.current as number,
            pageSize: pagination.pageSize as number,
            // sortField: (sorter as any).field,
            // sortOrder: (sorter as any).order,
        };
    };
}
const skillStore = new SkillStore();

export { skillStore as SkillStore };
