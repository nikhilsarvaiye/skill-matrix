import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { SkillWeightagesModel } from './skill-weightage.types';
import { skillWeightagesService } from './skill-weightage.instances';

export const SkillWeightagePicker = ({
    name,
    value,
    onChange,
    onBlur,
}: any) => {
    const [items, setItems] = useState<SkillWeightagesModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const get = async (key?: string) => {
        try {
            setLoading(true);
            const items = await skillWeightagesService.list({
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
            setItems(items);
        } finally {
            setLoading(false);
        }
    };

    const handleDebouncedValueChange = (debouncedValue: string) => {
        get(debouncedValue);
    };

    useEffect(() => {
        get();
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
            data={items}
            filterable={true}
            onDebouncedValueChange={handleDebouncedValueChange}
            // minFilterLength={2}
        />
    );
};
