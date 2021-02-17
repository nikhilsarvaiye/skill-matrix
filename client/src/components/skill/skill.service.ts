import { Api } from '@components/shared/api/base.api';
import { SkillModel } from './skill.model';

export class SkillService {
    route = 'skill';

    getAll = async () => {
        const skills = (await Api.get<SkillModel[]>(`${this.route}`)).data;
        return skills;
    };

    get = async (id: string) => {
        const skill = await Api.get(`${this.route}/${id}`);
        return skill;
    };

    create = async (skill: SkillModel) => {
        const response = await Api.post(`${this.route}`, skill);
        return response.data;
    };

    update = async (id: string, skill: SkillModel) => {
        const response = await Api.put(`${this.route}/${id}`, skill);
        return response.data;
    };
}
