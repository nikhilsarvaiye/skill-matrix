import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';

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
                <Menu.Item key="app" icon={<AppstoreOutlined />}>
                    <Link to="/skills">Skills</Link>
                </Menu.Item>
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title="Master"
                >
                    <Menu.Item key="skills">
                        <Link to="/skills">Skills</Link>
                    </Menu.Item>
                    <Menu.Item key="employees">
                        <Link to="/employees">Employees</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
        // <Router>

        //     <div className="content">
        //         <Switch>
        //             <Route path="/skills">
        //                 <SkillScreen />
        //             </Route>
        //             <Route path="/skill/:id?">
        //                 <SkillRouter />
        //             </Route>
        //             <Route path="/employees"></Route>
        //             <Route path="/">
        //                 <SkillScreen />
        //             </Route>
        //         </Switch>
        //     </div>
        // </Router>
    );
};
