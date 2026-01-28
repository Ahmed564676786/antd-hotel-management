

import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin } from '../services/apiCabins';

const CabinsTable = ({ cabins, onEdit }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCabinMutate, isLoading } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin deleted');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Max Capacity', dataIndex: 'maxCapacity', key: 'maxCapacity' },
    { title: 'Min Capacity', dataIndex: 'minCapacity', key: 'minCapacity' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount) => `${discount}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="small" onClick={() => onEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this cabin?"
            onConfirm={() => deleteCabinMutate(record.id)}
          >
            <Button danger size="small" loading={isLoading}>
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

