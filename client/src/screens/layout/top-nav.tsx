import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Avatar } from '@library/avatar';
import { AuthContext, authService } from '@auth';

const { SubMenu } = Menu;

export const TopNav = () => {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    if (!AuthContext.User) {
        return <div></div>;
    }
    return (
        <div className="top-nav">
            <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
                <Menu.Item key="mail" icon={<MailOutlined />}>
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
                    title={'Logout'}
                    key="logout"
                    direction="rtl"
                    style={{ float: 'right' }}
                >
                    <FontAwesomeIcon
                        icon={faPowerOff}
                        onClick={authService.logout}
                    ></FontAwesomeIcon>
                </Menu.Item>
                <Menu.Item
                    title={AuthContext.User.name}
                    key="avatar"
                    direction="rtl"
                    style={{ float: 'right' }}
                >
                    <Avatar
                        name={AuthContext.User.name}
                        url={AuthContext.User.pictureUrl}
                    />
                </Menu.Item>
            </Menu>
        </div>
    );
};
