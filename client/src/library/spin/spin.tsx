import classNames from 'classnames';
import { Spin as AntdSpin } from 'antd';
import { UserContext } from '@components/user';
import './spin.scss';

export enum SpinSize {
    Small = 'small',
    Default = 'default',
    Large = 'large',
}

export const Spin = ({
    spinning,
    size,
    delay,
    tip,
    children,
}: {
    spinning: boolean;
    size?: SpinSize;
    delay?: number;
    tip?: string;
    children?: any;
}) => {
    const className = classNames(UserContext.theme ? UserContext.theme : '');
    return (
        <AntdSpin
            className={className}
            spinning={spinning}
            size={size}
            delay={delay}
            tip={tip}
        >
            {children}
        </AntdSpin>
    );
};
