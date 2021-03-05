import { SkillSearchStore } from './skill.search.store';
import { SkillService } from './skill.service';
import { SkillStore } from './skill.store';

export const skillService = new SkillService();
export const skillStore = new SkillStore(skillService);
export const skillSearchStore = new SkillSearchStore(skillStore);
