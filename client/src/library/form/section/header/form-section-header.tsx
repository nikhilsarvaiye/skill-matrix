import classNames from 'classnames';
import './form-section-header.scss';

export const FormSectionHeader = ({
    className,
    style,
    padding,
    children,
}: any) => {
    return (
        <div
            className={classNames(
                'form-section-header',
                padding ? `padding` : '',
                className,
            )}
            style={style}
        >
            {children}
        </div>
    );
};

export const FormSectionHeaderTitle = ({
    startIcon,
    endIcon,
    className,
    style,
    children,
}: any) => {
    return (
        <div className={classNames('title', className)} style={style}>
            {startIcon ? <span className="icon start">{startIcon}</span> : null}
            <span className="text">{children}</span>
            {endIcon ? <span className="icon end">{endIcon}</span> : null}
        </div>
    );
};
