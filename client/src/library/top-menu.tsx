import { Menu } from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export const TopMenu = () => {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    return (
        <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
                Home
            </Menu.Item>
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
                Skills
            </Menu.Item>
            <SubMenu
                key="SubMenu"
                icon={<SettingOutlined />}
                title="Master"
            >
                <Menu.Item key="skills">Skills</Menu.Item>
                <Menu.Item key="employees">Employees</Menu.Item>
            </SubMenu>
        </Menu>
    );
};
