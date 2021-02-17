import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    Table,
    TablePaginationConfig,
    Key,
    SorterResult,
    TableCurrentDataSource,
} from '@library/table';
import { Button, ButtonType } from '@library/button';
import {
    FormSection,
    FormSectionTheme,
    FormSectionAlignment,
    FormSectionLayoutType,
    FormSectionBody,
    FormSectionHeader,
    FormSectionHeaderTitle,
} from '@library/form';
import './skill.scss';
import { SkillModel } from './skill.model';

export interface ISKillProps {
    loading: boolean;
    data: any[];
    onNew: () => void;
    onEdit: (skill: SkillModel) => void;
    pagination: TablePaginationConfig;
    onChange: (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => void;
}

export const Skill = ({
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
}: ISKillProps) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Skill',
            dataIndex: 'skill',
            key: 'skill',
            sorter: true,
        },
    ];

    return (
        <Fragment>
            <div className="skill">
                <FormSection theme={FormSectionTheme.White}>
                    <FormSection>
                        <FormSectionHeader>
                            <FormSection align={FormSectionAlignment.Left}>
                                <FormSectionHeaderTitle>
                                    {'Skills'}
                                </FormSectionHeaderTitle>
                            </FormSection>
                            <FormSection
                                layout={FormSectionLayoutType.Horizontal}
                                align={FormSectionAlignment.Right}
                                autoSpacing={true}
                            >
                                <Button
                                    startIcon={
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                        ></FontAwesomeIcon>
                                    }
                                    type={ButtonType.Tertiary}
                                    onClick={onNew}
                                >
                                    New
                                </Button>
                            </FormSection>
                        </FormSectionHeader>
                    </FormSection>
                    <FormSection>
                        <FormSectionBody>
                            <Table
                                columns={columns}
                                dataSource={data}
                                // pagination={pagination}
                                loading={loading}
                                onChange={onChange}
                                rowKey="id"
                                rowSelection={{
                                    type: 'radio',
                                    onChange: (
                                        selectedRowKeys,
                                        selectedRows,
                                    ) => {
                                        const record = selectedRows[0];
                                        if (onEdit) {
                                            onEdit(record);
                                        }
                                    },
                                    // selectedRowKeys: rowSelectionKeys,
                                    // type: 'checkbox',
                                    // onChange: (
                                    //     selectedRowKey,
                                    //     selectedRows,
                                    // ) => {},
                                    // selectedRowKeys: rowSelectionKeys,
                                }}
                            />
                        </FormSectionBody>
                    </FormSection>
                </FormSection>
            </div>
        </Fragment>
    );
};
