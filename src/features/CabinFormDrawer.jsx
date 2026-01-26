import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button } from 'antd';

const CabinFormDrawer = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  // Set form values when editing
  useEffect(() => {
    form.setFieldsValue(initialValues || {});
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
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
          <Button type="primary" onClick={() => form.submit()}>
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
          <Input placeholder="Cabin Name" />
        </Form.Item>

        <Form.Item
          name="maxCapacity"
          label="Max Capacity"
          rules={[{ required: true, message: 'Please enter max capacity' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="minCapacity"
          label="Min Capacity"
          rules={[{ required: true, message: 'Please enter min capacity' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} prefix="$" />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Discount (%)"
          rules={[{ required: true, message: 'Please enter discount' }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CabinFormDrawer;
