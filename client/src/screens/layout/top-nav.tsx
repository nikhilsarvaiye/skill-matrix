import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Avatar } from '@library/avatar';

const { SubMenu } = Menu;

export const TopNav = () => {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    return (
        <div className="top-nav">
            <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="skills" icon={<AppstoreOutlined />}>
                    <Link to="/skills">Skills</Link>
                </Menu.Item>
                <Menu.Item key="skill-weightages" icon={<AppstoreOutlined />}>
                    <Link to="/skill-weightages">SKill Weightages</Link>
                </Menu.Item>
                <Menu.Item
                    title={'Nikhil Sarvaiye'}
                    key="avatar"
                    direction="rtl"
                    style={{ float: 'right' }}
                >
                    <Avatar name={'Nikhil Sarvaiye'} />
                </Menu.Item>
            </Menu>
        </div>
    );
};
