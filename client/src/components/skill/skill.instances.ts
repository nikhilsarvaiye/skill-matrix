import { SkillService, SkillStore } from '.';

export const skillService = new SkillService();
export const skillStore = new SkillStore(skillService);
