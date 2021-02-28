import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { designationService, DesignationModel } from '.';

export const DesignationPicker = ({ name, value, onChange, onBlur }: any) => {
    const [skills, setSkills] = useState<DesignationModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getDesignations = async (key?: string) => {
        try {
            setLoading(true);
            const skills = await designationService.list({
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
                top: 20,
            });
            setSkills(skills);
        } finally {
            setLoading(false);
        }
    };

    const handleDebouncedValueChange = (debouncedValue: string) => {
        getDesignations(debouncedValue);
    };

    useEffect(() => {
        getDesignations();
    }, []);

    return (
        <Dropdown
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={DropdownType.AutoComplete}
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
