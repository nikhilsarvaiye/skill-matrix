import classNames from 'classnames';
import { Table } from 'antd';
import {
    PanelRender,
    GetComponentProps,
    GetRowKey,
    TableComponents,
    TableSticky,
} from 'rc-table/lib/interface';
import {
    ColumnType,
    ExpandableConfig,
    Key,
    SorterResult,
    SortOrder,
    TableCurrentDataSource,
    TablePaginationConfig,
    TableRowSelection,
} from 'antd/lib/table/interface';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export enum TableLayout {
    Auto = 'auto',
    Fixed = 'fixed',
}

export interface ITableComponentProps {
    title?: PanelRender<any>;
    tableLayout?: TableLayout;
    columns?: any[];
    dataSource?: any[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    scroll?: {
        x?: number | true | string;
        y?: number | string;
    };
    bordered?: boolean;
    expandable?: ExpandableConfig<any>;
    rowSelection?: TableRowSelection<any>;
    rowClassName?: string;
    onChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, (Key | boolean)[] | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        extra: TableCurrentDataSource<any>,
    ) => void;
    showHeader?: boolean;
    size?: SizeType;
    summary?: (data: any[]) => React.ReactNode;
    footer?: PanelRender<any>;
    onHeaderRow?: GetComponentProps<ColumnType<any>[]>;
    onHeaderCell?: any;
    onRow?: GetComponentProps<any>;
    sortDirections?: SortOrder[];
    showSorterTooltip?: boolean;
    className?: string;
    height?: number;
    rowKey?: string | GetRowKey<any>;
    width?: number;
    components?: TableComponents<any>;
    maxHeight?: string;
    sticky?: boolean | TableSticky;
}

export const TableComponent = ({
    title,
    tableLayout = TableLayout.Auto,
    columns,
    dataSource = [],
    loading,
    pagination,
    scroll,
    bordered,
    expandable,
    rowSelection,
    rowClassName,
    onChange,
    showHeader,
    size,
    summary,
    footer,
    onHeaderRow,
    onHeaderCell,
    onRow,
    sortDirections,
    showSorterTooltip,
    className,
    height,
    rowKey,
    width,
    components,
    maxHeight, // maxHeight = 'calc(100vh - 150px)',
}: ITableComponentProps) => {
    pagination = {
        position: ['none', 'bottomCenter'] as any,
        current:
            pagination === undefined
                ? 1
                : (pagination as TablePaginationConfig).current,
        showSizeChanger: false,
        hideOnSinglePage: true,
        ...pagination,
    };
    scroll = scroll || {};
    scroll.y = scroll.y || maxHeight;
    rowSelection = rowSelection
        ? {
              ...rowSelection,
              columnTitle:
                  rowSelection.type === 'radio'
                      ? rowSelection.columnTitle || 'Select'
                      : rowSelection.columnTitle,
              columnWidth: rowSelection.columnWidth || '5em',
          }
        : rowSelection;
    className = classNames(
        !dataSource || !dataSource.length ? `empty` : '',
        bordered ? `bordered` : '',
    );
    return (
        <div className="table">
            <Table
                title={title}
                tableLayout={tableLayout}
                pagination={pagination}
                components={components}
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                scroll={scroll}
                expandable={expandable}
                showHeader={showHeader}
                size={size}
                summary={summary}
                rowSelection={rowSelection}
                rowClassName={rowClassName}
                onChange={onChange}
                onHeaderRow={onHeaderRow}
                // onHeaderCell={onHeaderCell}
                onRow={onRow}
                sortDirections={sortDirections}
                showSorterTooltip={showSorterTooltip}
                className={className}
                style={{ height: height, width: width }}
                rowKey={rowKey}
                // locale={{ emptyText: 'No matching results found' }}
                footer={footer}
            />
        </div>
    );
};

export type Record<K extends keyof any, T> = {
    [P in K]: T;
};

export type {
    TablePaginationConfig,
    Key,
    TableCurrentDataSource,
    SorterResult,
    SortOrder,
};
