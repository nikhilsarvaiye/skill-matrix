import { Fragment } from 'react';
import classNames from 'classnames';
import { Modal } from 'antd';
import { emToPxValue } from '@util/css';
import './modal.scss';

export enum ModelSize {
    Small = '60em',
    Medium = '80em',
    Large = '105em',
    Full = '120em',
}

const modal = ({
    title,
    visible,
    okText,
    cancelText,
    style,
    centered,
    size = ModelSize.Large,
    className,
    onOk,
    onCancel,
    footer,
    okButtonProps,
    cancelButtonProps,
    closable,
    maskClosable,
    closeIcon,
    zIndex,
    bodyStyle,
    confirmLoading,
    children,
    initialWidth,
    initialHeight = 600,
}: any) => {
    initialWidth = initialWidth || size;
    initialWidth = emToPxValue(initialWidth);
    style = style || {};
    style = {
        top: 60,
        ...style,
    };

    maskClosable = maskClosable === undefined ? false : maskClosable;
    return (
        <Fragment>
            {visible && (
                <Modal
                    title={title}
                    visible={visible}
                    onOk={onOk}
                    onCancel={onCancel}
                    centered={centered}
                    okText={okText}
                    cancelText={cancelText}
                    okButtonProps={okButtonProps}
                    cancelButtonProps={cancelButtonProps}
                    closable={closable}
                    closeIcon={closeIcon}
                    width={initialWidth}
                    // initialWidth={initialWidth}
                    // initialHeight={initialHeight}
                    zIndex={zIndex}
                    bodyStyle={bodyStyle}
                    confirmLoading={confirmLoading}
                    footer={footer}
                    className={classNames(className, size)}
                    // mask={true} // !maskClosable
                    maskClosable={maskClosable}
                    style={style}
                >
                    {children}
                </Modal>
            )}
        </Fragment>
    );
};

export { modal as Modal };

export const { info, error, warn } = Modal;
