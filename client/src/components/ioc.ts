import { SkillService, SkillStore } from "./skill";

export const skillService = new SkillService();
export const skillStore = new SkillStore(skillService);