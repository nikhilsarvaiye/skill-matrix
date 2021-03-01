import { MouseEventHandler } from 'react';
import {
    FormSection,
    FormSectionHeader,
    FormSectionHeaderTitle,
    FormSectionAlignment,
    FormSectionBody,
    FormSectionTheme,
} from '@library/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import './side-floater.scss';

export const SideFloater = ({
    title,
    onClick,
}: {
    title: string;
    onClick?: any;
}) => {
    return (
        <FormSection theme={FormSectionTheme.White} className="side-floater">
            <FormSectionHeader>
                <FormSection align={FormSectionAlignment.Left}>
                    <FormSectionHeaderTitle
                        startIcon={
                            <FontAwesomeIcon
                                style={{
                                    cursor: 'pointer',
                                }}
                                icon={faArrowCircleRight}
                                onClick={onClick}
                            ></FontAwesomeIcon>
                        }
                    ></FormSectionHeaderTitle>
                </FormSection>
            </FormSectionHeader>
            <FormSectionBody>{title}</FormSectionBody>
        </FormSection>
    );
};
