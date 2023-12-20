import React, { useEffect, useState } from 'react';
import { TextField, Box, Dialog, DialogContent, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAddHome } from "react-icons/md";

import { getApartments, updateApartment, createApartment } from '../../redux/actions/apartmentActions';

const FormComponent = () => {
  const dispatch = useDispatch();
  const selectedApar = useSelector((state) => state.apartments.selectedApartment);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    etage: '',
    resident: '',
    tel: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addApartmentHandler = () => {
    dispatch(createApartment(formData));
    handleClose();
  };

  const updateSelectedApartmentHandler = () => {
    dispatch(updateApartment(formData));
    handleClose();
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'number' || name === 'etage' || name === 'tel') && !/^[1-9]\d*$/.test(value) && value !== '') {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      selectedApar ? updateSelectedApartmentHandler() : addApartmentHandler();
      setFormData({
        number: '',
        etage: '',
        resident: '',
        tel: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    setFormData(selectedApar ? selectedApar : { number: '', etage: '', resident: '', tel: '' });
  }, [selectedApar]);

  useEffect(() => {
    dispatch(getApartments());
  }, [dispatch]);

  return (
    <>
    <button className="w-14 h-14 rounded-full  flex justify-center items-center shadow-md gap-1 animate-bounce z-20 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-300 absolute top-[30%]" onClick={handleClickOpen}><MdOutlineAddHome className='text-white' size={30} /></button>
    
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className='w-[500px]'>
          <form
            className="add-form"
            onSubmit={handleSubmit}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ textAlign: 'center', marginBottom: '5px' }}
            >
              {selectedApar ? 'Editing a Apartment' : 'Creating a Apartment'}
            </Typography>
            <Box>
              <TextField
                required
                label="Number"
                type="number"
                name="number"
                value={formData.number}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                inputProps={{ min: '1', step: '1' }}
              />
            </Box>
            <Box>
              <TextField
                required
                label="Etage"
                type="number"
                name="etage"
                value={formData.etage}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                inputProps={{ min: '1', step: '1' }}
              />
            </Box>
            <Box>
              <TextField
                required
                label="Resident"
                type="text"
                name="resident"
                value={formData.resident}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 25, minLength: 3 }}
              />
            </Box>
            <Box>
              <TextField
                required
                label="Tel"
                type="number"
                name="tel"
                value={formData.tel}
                fullWidth
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                inputProps={{ min: '1', step: '1' }}
              />
            </Box>
            
            <Box className='mt-2'>
            <button type="submit" className='px-[11.35rem] py-[7px] rounded-md bg-blue-400 hover:bg-blue-500 text-white'  >
              Submit
            </button>
          
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormComponent;
