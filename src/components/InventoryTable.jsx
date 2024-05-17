import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  TextField,
  Box,
} from '@mui/material';
import useDebounce from '../hooks/useDebounce';

const InventoryTable = ({ data, onEditInventory, onDeleteInventory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!debouncedSearchQuery) {
      return setFilteredData(data);
    }
    if (!data.length) {
      return;
    }
    setFilteredData(
      data.filter((inventory) =>
        inventory.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    );
  }, [data, debouncedSearchQuery]);
 
  return (
    <Box>
      <TextField
        label='Search'
        margin='normal'
        value={searchQuery}
        size='small'
        onChange={handleSearchQueryChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((inventory) => (
                <TableRow key={inventory.id}>
                  <TableCell component='th' scope='row'>
                    {inventory.name}
                  </TableCell>
                  <TableCell>{inventory.quantity}</TableCell>
                  <TableCell>
                    <Button onClick={() => onEditInventory(inventory)}>Edit</Button>
                    <Button onClick={() => onDeleteInventory(inventory.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No inventory available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

InventoryTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEditInventory: PropTypes.func.isRequired,
  onDeleteInventory: PropTypes.func.isRequired
};

export default InventoryTable;