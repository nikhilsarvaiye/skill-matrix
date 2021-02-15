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
            <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
                Skills
            </Menu.Item>
            <SubMenu
                key="SubMenu"
                icon={<SettingOutlined />}
                title="Navigation Three - Submenu"
            >
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
                <a
                    href="https://ant.design"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Employees
                </a>
            </Menu.Item>
        </Menu>
    );
};
