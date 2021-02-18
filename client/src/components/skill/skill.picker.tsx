import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { SkillModel, SkillService } from '.';

export const SkillPicker = ({ name, value, onChange, onBlur }: any) => {
    const [skills, setSkills] = useState<SkillModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getSkills = async (key: string) => {
        try {
            setLoading(true);
            var skillService = new SkillService();
            const skills = await skillService.getAllByName(key, 20);
            setSkills(skills);
        } finally {
            setLoading(false);
        }
    };

    const handleDebouncedValueChange = (debouncedValue: string) => {
        getSkills(debouncedValue);
    };

    return (
        <Dropdown
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={DropdownType.Combobox}
            textField={'name'}
            valueField={'id'}
            dataItemKey={'id'}
            loading={loading}
            data={skills}
            filterable={true}
            onDebouncedValueChange={handleDebouncedValueChange}
            // minFilterLength={2}
        />
    );
};
