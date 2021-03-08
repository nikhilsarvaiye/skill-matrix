import { useState, useEffect } from 'react';
import { Dropdown, DropdownType } from '@library/dropdown';
import { User } from './user.types';
import { userService } from './user.instances';

export const UserPicker = ({ name, value, onChange, onBlur }: any) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async (key?: string) => {
        try {
            setLoading(true);
            let users = await userService.list({
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
            setUsers(users);
        } finally {
            setLoading(false);
        }
    };

    const handleDebouncedValueChange = (debouncedValue: string) => {
        getUsers(debouncedValue);
    };

    useEffect(() => {
        getUsers();
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
            data={users}
            filterable={true}
            onDebouncedValueChange={handleDebouncedValueChange}
        />
    );
};
