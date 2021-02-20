import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

export const Avatar = ({ name, size }: { name: string; size?: AvatarSize }) => {
    return (
        <div className="avatar">
            <AntdAvatar
                size={size || 'default'}
                icon={<UserOutlined />}
                style={{
                    backgroundColor: '#f56a00',
                }}
            >
                {name}
            </AntdAvatar>
        </div>
    );
};
