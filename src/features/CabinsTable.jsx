import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

const CabinsTable = ({ cabins, onEdit, onDelete }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Max Capacity', dataIndex: 'maxCapacity', key: 'maxCapacity' },
    { title: 'Min Capacity', dataIndex: 'minCapacity', key: 'minCapacity' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => `$${price}` },
    { title: 'Discount', dataIndex: 'discount', key: 'discount', render: (discount) => `${discount}%` },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" size="small" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this cabin?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={cabins} rowKey="id" />;
};

export default CabinsTable;
