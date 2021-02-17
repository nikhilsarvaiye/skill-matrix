import classNames from 'classnames';
import './form-section-footer.scss';

export const FormSectionFooter = ({
    align,
    className,
    style,
    id,
    children,
}: any) => {
    return (
        <div
            className={classNames('form-section-footer', className)}
            style={style}
            id={id}
        >
            {children}
        </div>
    );
};
