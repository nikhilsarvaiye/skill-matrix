import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeFilled, AppstoreOutlined } from '@ant-design/icons';
import { UserContext } from '@auth';
import './../nav.scss';
import './side-nav.scss';

export const SideNav = () => {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    if (!UserContext.User) {
        return <div></div>;
    }
    return (
        <div className="nav side-nav">
            <Menu onClick={handleClick} selectedKeys={[]} mode="vertical-left">
                <Menu.Item key="home" icon={<HomeFilled />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="skill" icon={<AppstoreOutlined />}>
                    <Link to="/skill">Skills</Link>
                </Menu.Item>
                <Menu.Item key="designation" icon={<AppstoreOutlined />}>
                    <Link to="/designation">Designations</Link>
                </Menu.Item>
                <Menu.Item key="skill-weightages" icon={<AppstoreOutlined />}>
                    <Link to="/skill-weightages">Skill Weightages</Link>
                </Menu.Item>
                <Menu.Item
                    key="designation-skill-weightage"
                    icon={<AppstoreOutlined />}
                >
                    <Link to="/designation-skill-weightages">
                        Designation Skill Weightages
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};
