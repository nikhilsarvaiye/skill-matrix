import classNames from 'classnames';
import './form-section-body.scss';

export const FormSectionBody = ({
    className,
    style,
    padding,
    id,
    children,
}: any) => {
    className = classNames(padding ? `padding` : '');

    return (
        <div
            className={classNames('form-section-body', className)}
            style={style}
            id={id}
        >
            {children}
        </div>
    );
};
