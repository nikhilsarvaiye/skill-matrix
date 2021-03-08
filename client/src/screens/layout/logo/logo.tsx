import classNames from 'classnames';
import { UserContext } from '@components/user';
import './logo.scss';

export const Logo = () => {
    const className = classNames(
        UserContext.theme ? UserContext.theme : '',
        'logo',
    );
    return (
        <div className="logo-container">
            <div className={className}>
                <div className="logo-wrapper">
                    <img src={'/logo.png'} />
                </div>
            </div>
        </div>
    );
};
