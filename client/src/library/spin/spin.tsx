import { Spin as AntdSpin } from 'antd';

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
    return (
        <AntdSpin spinning={spinning} size={size} delay={delay} tip={tip}>
            {children}
        </AntdSpin>
    );
};
