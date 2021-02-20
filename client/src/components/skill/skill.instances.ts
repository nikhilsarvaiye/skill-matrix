import { SkillService, SkillStore } from '.';
import { SkillSearchStore } from '.';

export const skillService = new SkillService();
export const skillStore = new SkillStore(skillService);
export const skillSearchStore = new SkillSearchStore(skillStore);
