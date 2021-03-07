import { skillService } from '@components/skill';
import { DesignationSkillWeightagesStore } from './designation-skill-weightage.store';
import { DesignationSkillWeightagesService } from './designation-skill-weightage.service';
import { DesignationSkillWeightagesSearchStore } from './designation-skill-weightage.search.store';

export const designationSkillWeightagesService = new DesignationSkillWeightagesService();
export const designationSkillWeightagesStore = new DesignationSkillWeightagesStore(
    designationSkillWeightagesService,
);
export const designationSkillWeightagesSearchStore = new DesignationSkillWeightagesSearchStore(
    designationSkillWeightagesStore,
);
