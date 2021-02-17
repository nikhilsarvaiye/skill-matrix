import { Fragment } from 'react';
import classNames from 'classnames';
import { FormSectionLayoutType } from './form-section.model';
import './form-section.scss';
import './theme/theme-default.scss';
import './theme/theme-white.scss';

export const FormSection = ({
    layout,
    theme,
    numberOfRowFields,
    autoSpacing,
    align,
    width,
    className,
    style,
    subSection,
    subSectionBorder,
    formField,
    bordered,
    borderRadius,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    padding,
    children,
}: any) => {
    layout = layout || FormSectionLayoutType.Vertical;
    style = style || {};
    style = width ? { ...style, width: width } : style;

    return (
        <div
            className={classNames(
                'form-section',
                layout ? `layout-${layout}` : '',
                numberOfRowFields ? `field-${numberOfRowFields}` : '',
                autoSpacing ? `auto-spacing` : '',
                theme ? `theme theme-${theme}` : '',
                align || '',
                bordered ? `bordered` : '',
                borderRadius ? `border-radius` : '',
                borderLeft ? `border-left` : '',
                borderRight ? `border-right` : '',
                borderTop ? `border-top` : '',
                borderBottom ? `border-bottom` : '',
                subSection ? `sub-section` : '',
                subSectionBorder ? `sub-section-border` : '',
                formField ? `form-field` : '',
                padding ? `padding` : '',
                className,
            )}
            style={style}
        >
            {children
                ? children.map
                    ? children.map((child: any, index: number) => {
                          return wrapSectionChildOrReturn(
                              index.toString(),
                              child,
                              autoSpacing,
                          );
                      })
                    : wrapSectionChildOrReturn(
                          children.props.name,
                          children,
                          autoSpacing,
                      )
                : null}
        </div>
    );
};

const wrapSectionChildOrReturn = (
    key: string,
    child: any,
    autoSpacing: boolean,
) => {
    return !autoSpacing ? (
        <Fragment key={key}>{child}</Fragment>
    ) : (
        <div key={key} className="section-item">
            {child}
        </div>
    );
};
