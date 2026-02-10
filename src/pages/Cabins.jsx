import React, { useState } from 'react';
import { Button } from 'antd';
import CabinsTable from '../features/CabinsTable';
import CabinFormDrawer from '../features/CabinFormDrawer';
import { useMutation, useQuery } from '@tanstack/react-query';

import {getCabins, insertCabin} from '../services/apiCabins'


import { useEditCabin } from "../hooks/useEditCabin";


const CabinsPage = () => {

  const { editCabin, isEditing } = useEditCabin();
   const {data:cabins,isLoading} = useQuery({

          queryKey:['cabins'],
          queryFn:getCabins
   });



  const { mutate: addCabin, isLoading:isAddingCabin } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success('Cabin added successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      form.resetFields();
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });



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

  const handleSubmit = async (data) => {
    if (editingCabin) {
      // Update existing cabin

      alert('Edit')


      await editCabin({
        id: editingCabin.id,
        updatedCabin: data,
      });


    } else {
      // Add new cabin

       addCabin(data);
 
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
