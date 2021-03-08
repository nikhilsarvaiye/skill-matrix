import { UserSkillWeightageService } from './user-skill-weightage.service';
import { UserSkillWeightageStore } from './user-skill-weightage.store';

export const userSkillWeightageService = new UserSkillWeightageService();
export const userSkillWeightageStore = new UserSkillWeightageStore(
    userSkillWeightageService,
);
