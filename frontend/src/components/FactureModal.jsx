import React, { useState } from 'react';
import {  Dialog, DialogContent } from '@mui/material';
import { FaRegFilePdf } from "react-icons/fa6";

import Facture from './facture';

export default function FactureModal({ apartment }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className='px-5 py-2 rounded-full shadow-md hover:bg-gray-800 hover:text-white ' onClick={handleClickOpen}>
        <FaRegFilePdf  />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Facture apartment={apartment} />
        </DialogContent>
      
      </Dialog>
    </div>
  );
}