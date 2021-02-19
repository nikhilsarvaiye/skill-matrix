import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { SkillModel, SkillService } from '.';

export const SkillPicker = ({ name, value, onChange, onBlur }: any) => {
    const [skills, setSkills] = useState<SkillModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getSkills = async (key: string) => {
        if (!key) {
            return;
        }
        try {
            setLoading(true);
            var skillService = new SkillService();
            const skills = await skillService.list({
                filter: key
                    ? {
                          or: [
                              {
                                  name: {
                                      startswith: key,
                                  },
                              },
                              {
                                  name: {
                                      contains: key,
                                  },
                              },
                          ],
                      }
                    : {},
                select: ['id', 'name'],
            });
            setSkills(skills);
        } finally {
            setLoading(false);
        }
    };

    const handleDebouncedValueChange = (debouncedValue: string) => {
        getSkills(debouncedValue);
    };

    useEffect(() => {
        getSkills('');
    }, []);

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
