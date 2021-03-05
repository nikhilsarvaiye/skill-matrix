import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
    parentSkillId: Yup.string().nullable(),
});