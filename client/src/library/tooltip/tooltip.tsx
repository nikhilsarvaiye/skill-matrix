import { Tooltip as AntTooltip } from 'antd';

export const Tooltip = ({
    placement,
    title,
    arrowPointAtCenter,
    children,
}: any) => {
    return (
        <AntTooltip
            placement={placement}
            title={title}
            arrowPointAtCenter={arrowPointAtCenter}
        >
            {children}
        </AntTooltip>
    );
};
