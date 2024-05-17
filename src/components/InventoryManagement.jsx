import { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import InventoryFormDialog from './InventoryFormDialog';
import { Button, Box, Typography } from '@mui/material';

const defaultData = [
  { id: 1, name: "Screwdriver", quantity: 10 },
  { id: 2, name: "Hammer", quantity: 15 },
  { id: 3, name: "Scissors", quantity: 20 },
  { id: 4, name: "Saw", quantity: 8 },
  { id: 5, name: "Level", quantity: 12 }
];

const defaultInventory = {};

const InventoryManagement = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [addInventoryDialog, setAddInventoryDialog] = useState({ open: false, data: defaultInventory });
  const [editInventoryDialog, setEditInventoryDialog] = useState({ open: false, data: defaultInventory });

  const handleOpenAddInventoryDialog = () => {
    setAddInventoryDialog({ open: true, data: defaultInventory });
  };

  const handleCloseAddInventoryDialog = () => {
    setAddInventoryDialog({ open: false, data: defaultInventory });
  };

  const handleOpenEditInventoryDialog = (inventory) => {
    setEditInventoryDialog({ open: true, data: inventory });
  };

  const handleCloseEditInventoryDialog = () => {
    setEditInventoryDialog({ open: false, data: defaultInventory });
  };

  const handleAddInventory = (inventory) => {
    inventory.id = inventoryList.length + 1;
    setInventoryList([...inventoryList, inventory]);
    handleCloseAddInventoryDialog();
  };

  const handleUpdateInventory = (updatedInventory) => {
    setInventoryList(inventoryList.map((inventory) => (inventory.id === updatedInventory.id ? updatedInventory : inventory)));
    handleCloseEditInventoryDialog();
  };

  const handleDeleteInventory = (id) => {
    const updatedInventoryList = inventoryList.filter((item) => item.id !== id);
    setInventoryList(updatedInventoryList);
  };

  useEffect(() => {
    setInventoryList(defaultData);
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Typography variant='h4' marginTop={2} marginBottom={4}>Inventory Management</Typography>
      <InventoryTable
        data={inventoryList}
        onEditInventory={handleOpenEditInventoryDialog}
        onDeleteInventory={handleDeleteInventory}
      />
      <Button
        fullWidth
        variant='contained'
        onClick={handleOpenAddInventoryDialog}
        >Add Inventory</Button>
      <InventoryFormDialog
        open={addInventoryDialog.open}
        data={addInventoryDialog.data}
        onSubmit={handleAddInventory}
        onCancel={handleCloseAddInventoryDialog}
      />
      <InventoryFormDialog
        open={editInventoryDialog.open}
        data={editInventoryDialog.data}
        onSubmit={handleUpdateInventory}
        onCancel={handleCloseEditInventoryDialog}
      />
    </Box>
  );
}

export default InventoryManagement;
