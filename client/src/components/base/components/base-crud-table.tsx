import { Fragment, useEffect } from 'react';
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
import { IModel } from '../models';
import { Label } from '@library/label';

export interface IBaseCrudTableProps {
    loading: boolean;
    data: any[];
    onNew: () => void;
    onEdit: (skill: IModel) => void;
    pagination: TablePaginationConfig;
    onChange: (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => void;
    onDelete?: (id: string) => void;
}

export interface IBaseCrudTableAdditionalProps extends IBaseCrudTableProps {
    title: string;
    columns: any[];
}

export const BaseCrudTable = ({
    title,
    loading,
    data,
    onNew,
    onEdit,
    pagination,
    onChange,
    columns,
    onDelete,
}: IBaseCrudTableAdditionalProps) => {
    const addDelete = () => {
        if (onDelete) {
            columns = columns || [];
            columns.push({
                title: 'Delete',
                // dataIndex: 'skill',
                key: 'delete',
                render: (text: string, item: any) => (
                    <Fragment>
                        <Button
                            type={ButtonType.Quaternary}
                            onClick={() => {
                                if (onDelete) {
                                    onDelete(item.id);
                                }
                            }}
                            danger
                        >
                            Delete
                        </Button>
                    </Fragment>
                ),
            });
        }
    };

    useEffect(() => {
        addDelete();
    }, []);

    return (
        <FormSection theme={FormSectionTheme.White}>
            <FormSection>
                <FormSectionHeader>
                    <FormSection align={FormSectionAlignment.Left}>
                        <FormSectionHeaderTitle>{title}</FormSectionHeaderTitle>
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
                        pagination={pagination}
                        loading={loading}
                        onChange={onChange}
                        rowKey="id"
                        rowSelection={{
                            type: 'radio',
                            onChange: (selectedRowKeys, selectedRows) => {
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
    );
};
