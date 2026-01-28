
import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { insertCabin } from '../services/apiCabins';

const CabinFormDrawer = ({ visible, onClose, initialValues }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    form.setFieldsValue(initialValues || {});
  }, [initialValues, form]);

  const { mutate: addCabin, isLoading } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success('Cabin added successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      form.resetFields();
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleFinish = (values) => {
    addCabin(values);
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={initialValues ? 'Edit Cabin' : 'Add New Cabin'}
      width={360}
      onClose={handleClose}
      open={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => form.submit()} loading={isLoading}>
            {initialValues ? 'Update' : 'Add'}
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Cabin Name"
          rules={[{ required: true, message: 'Please enter cabin name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="maxCapacity"
          label="Max Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="minCapacity"
          label="Min Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} prefix="$" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Discount (%)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CabinFormDrawer;
