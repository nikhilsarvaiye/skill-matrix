import { skillService } from '@components/skill';
import { SkillWeightageStore } from './skill-weightage.store';
import { SkillWeightagesService } from './skill-weightage.service';
import { SkillWeightageSearchStore } from './skill-weightage.search.store';

export const skillWeightagesService = new SkillWeightagesService();
export const skillWeightageStore = new SkillWeightageStore(
    skillWeightagesService,
    skillService,
);
export const skillWeightageSearchStore = new SkillWeightageSearchStore(
    skillWeightageStore,
);
