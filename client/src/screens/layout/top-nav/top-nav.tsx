import classNames from 'classnames';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar } from '@library/avatar';
import { ThemeType } from '@app';
import { UserContext } from '@components/user';
import { authService } from '@auth';
import './../nav.scss';
import './top-nav.scss';

const { SubMenu } = Menu;

export const TopNav = ({ className }: { className?: string }) => {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };
    if (!UserContext.isLoggedIn) {
        return <div></div>;
    }
    className = classNames(
        UserContext.theme ? UserContext.theme : '',
        className,
        'nav',
        'top-nav',
    );
    return (
        <div className={className}>
            <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
                <Menu.Item
                    key="avatar"
                    direction="rtl"
                    style={{ float: 'right' }}
                >
                    <Avatar name={''} url={UserContext.LoggedInUser.user.pictureUrl} />
                </Menu.Item>
                <SubMenu
                    key={UserContext.LoggedInUser.user.name}
                    title={UserContext.LoggedInUser.user.name}
                    className="settings"
                    style={{ float: 'right', margin: 0 }}
                >
                    <Menu.Item
                        title={'Logout'}
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={authService.logout}
                    >
                        Logout
                    </Menu.Item>
                    <Menu.Item title={'Select Theme'} key="theme-selection">
                        <span
                            className={classNames(
                                ThemeType.Red,
                                'theme-selection',
                            )}
                            onClick={() => {
                                UserContext.setTheme(ThemeType.Red);
                            }}
                        ></span>
                        <span
                            className={classNames(
                                ThemeType.Blue,
                                'theme-selection',
                            )}
                            onClick={() => {
                                UserContext.setTheme(ThemeType.Blue);
                            }}
                        ></span>
                        <span
                            className={classNames(
                                ThemeType.Green,
                                'theme-selection',
                            )}
                            onClick={() => {
                                UserContext.setTheme(ThemeType.Green);
                            }}
                        ></span>
                        <span
                            className={classNames(
                                ThemeType.Purple.toString(),
                                'theme-selection',
                            )}
                            onClick={() => {
                                UserContext.setTheme(ThemeType.Purple);
                            }}
                        ></span>
                        <span
                            className={classNames(
                                ThemeType.Yellow,
                                'theme-selection',
                            )}
                            onClick={() => {
                                UserContext.setTheme(ThemeType.Yellow);
                            }}
                        ></span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};
