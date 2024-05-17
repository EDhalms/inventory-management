import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

const InventoryFormDialog = ({ open, data, onSubmit, onCancel }) => {
  const [inventory, setInventory] = useState({});
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!inventory.name) {
      newErrors.name = 'Name is required';
    }

    if (!inventory.quantity) {
      newErrors.quantity = 'Quantity is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setInventory({});
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory({ ...inventory, [name]: value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ ...inventory, quantity: parseInt(inventory.quantity) });
      resetForm();
    }
  };

  const handleCancel = () => {
    onCancel();
    resetForm();
  };
  
  useEffect(() => {
    setInventory(data);
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>{inventory.id ? 'Edit' : 'Add'} Inventory</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin='normal'
          label='Name'
          size='small'
          name='name'
          value={inventory.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Quantity'
          size='small'
          name='quantity'
          value={inventory.quantity}
          error={!!errors.quantity}
          helperText={errors.quantity}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={handleCancel}
        >Cancel</Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >Save</Button>
      </DialogActions>
    </Dialog>
  );
}


InventoryFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default InventoryFormDialog;