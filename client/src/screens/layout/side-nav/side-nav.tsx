import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeFilled, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { UserContext } from '@components/user';
import './../nav.scss';
import './side-nav.scss';

export const SideNav = () => {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    if (!UserContext.isLoggedIn) {
        return <div></div>;
    }
    return (
        <div className="nav side-nav">
            <Menu onClick={handleClick} selectedKeys={[]} mode="vertical-left">
                <Menu.Item key="home" icon={<HomeFilled />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="skill" icon={<AppstoreOutlined />}>
                    <Link to="/skill">Skill</Link>
                </Menu.Item>
                <Menu.Item key="designation" icon={<AppstoreOutlined />}>
                    <Link to="/designation">Designation</Link>
                </Menu.Item>
                <Menu.Item key="skill-weightages" icon={<AppstoreOutlined />}>
                    <Link to="/skill-weightages">Skill Weightage</Link>
                </Menu.Item>
                <Menu.Item
                    key="designation-skill-weightage"
                    icon={<AppstoreOutlined />}
                >
                    <Link to="/designation-skill-weightages">
                        User/Designation Skill Weightage
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="user-skill-weightage"
                    icon={<AppstoreOutlined />}
                >
                    <Link to="/user-skill-weightage">Skill Weightage</Link>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserOutlined />}>
                    <Link to="/user">Users</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};
