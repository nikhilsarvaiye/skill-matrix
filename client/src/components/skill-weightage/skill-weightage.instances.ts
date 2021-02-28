import { skillService } from '@components/skill';
import { SkillWeightageStore } from '.';

export const skillWeightageStore = new SkillWeightageStore(skillService);
