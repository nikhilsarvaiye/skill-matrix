import { Table } from '@library/table';

const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'First Name', dataIndex: 'fname', key: 'fname' },
    { title: 'Last Name', dataIndex: 'lname', key: 'lname' },
    { title: 'Middle Name', dataIndex: 'mname', key: 'mname' },
    {
        title: 'Status',
        key: 'state',
        render: () => <span>Finished</span>,
    },
    {
        title: 'Upgrade Status',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
            <span className="table-operation">
                <a>Pause</a>
                <a>Stop</a>
            </span>
        ),
    },
];

const data: any[] = [];
for (let i = 0; i < 20; ++i) {
    data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        fname: 'This is production name',
        lname: 'This is production name',
        mname: 'This is production name',
        upgradeNum: 'Upgraded: 56',
    });
}

export const TableDemo = () => {
    return <Table columns={columns} dataSource={data} />;
};
