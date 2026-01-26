import React, { useState } from 'react';
import { Button } from 'antd';
import CabinsTable from '../features/CabinsTable';
import CabinFormDrawer from '../features/CabinFormDrawer';

const CabinsPage = () => {
  const [cabins, setCabins] = useState([
    { id: 1, name: 'Lake View Cabin', maxCapacity: 6, minCapacity: 2, price: 150, discount: 10 },
    { id: 2, name: 'Mountain Cabin', maxCapacity: 8, minCapacity: 3, price: 200, discount: 15 },
    { id: 3, name: 'Forest Cabin', maxCapacity: 4, minCapacity: 1, price: 120, discount: 5 },
  ]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCabin, setEditingCabin] = useState(null);

  const openDrawer = (cabin = null) => {
    setEditingCabin(cabin);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setEditingCabin(null);
    setDrawerVisible(false);
  };

  const handleSubmit = (data) => {
    if (editingCabin) {
      // Update existing cabin
      setCabins((prev) =>
        prev.map((cabin) => (cabin.id === editingCabin.id ? { ...editingCabin, ...data } : cabin))
      );
    } else {
      // Add new cabin
      const newCabin = { id: Date.now(), ...data };
      setCabins((prev) => [...prev, newCabin]);
    }
    closeDrawer();
  };

  const handleDelete = (id) => {
    setCabins((prev) => prev.filter((cabin) => cabin.id !== id));
  };

  return (
    <div>
      <h2>Cabins Management</h2>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => openDrawer()}>
        Add New Cabin
      </Button>

      <CabinsTable cabins={cabins} onEdit={openDrawer} onDelete={handleDelete} />

      <CabinFormDrawer
        visible={drawerVisible}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
        initialValues={editingCabin}
      />
    </div>
  );
};

export default CabinsPage;
