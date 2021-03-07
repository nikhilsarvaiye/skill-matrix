import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { SkillModel, skillService } from '.';

export const SkillPicker = ({
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    parentSkillId,
    notSkillIds,
}: any) => {
    const [skills, setSkills] = useState<SkillModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getSkills = async (key?: string) => {
        try {
            setLoading(true);
            const queryOptions = {
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
            } as any;
            if (parentSkillId != undefined) {
                queryOptions.filter = {
                    and: [
                        {
                            parentSkillId: !parentSkillId
                                ? null
                                : parentSkillId,
                        },
                        queryOptions.filter,
                    ],
                } as any;
            }
            if (notSkillIds && notSkillIds.length) {
                queryOptions.filter = {
                    and: [
                        {
                            not: {
                                id: {
                                    in: notSkillIds,
                                },
                            },
                        },
                        queryOptions.filter,
                    ],
                } as any;
            }
            const skills = await skillService.list(queryOptions);
            setSkills(skills);
        } finally {
            setLoading(false);
        }
    };

    const handleDebouncedValueChange = (debouncedValue: string) => {
        getSkills(debouncedValue);
    };

    // useEffect(() => {
    //     getSkills();
    // }, []);

    useEffect(() => {
        getSkills();
    }, [notSkillIds]);

    useEffect(() => {
        getSkills();
    }, [parentSkillId]);

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
            placeholder={placeholder}
            // minFilterLength={2}
        />
    );
};
