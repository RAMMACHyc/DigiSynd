import React from 'react';
import SideBar from '../components/SideBar';
import Box from '@mui/material/Box';



import FormComponent from '../components/Form/FormComponent';
import Apartments from './Apartments/ApartmentsComponent';




export default function Dashboard() {

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          
        <Apartments />
       
        <FormComponent />
       
      </Box>
    </Box>
  )
}