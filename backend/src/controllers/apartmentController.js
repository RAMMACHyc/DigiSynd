import Apartment from "../models/Apartment";

export const apartmentController = {

  createApartment: async (req, res) => {
    try {
      const { number, etage, resident} = req.body;
  
      if (!(number && etage && resident )) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
      
  
      const newApartment = new Apartment({ number, etage, resident});
      const savedApartment = await newApartment.save();
  
      res.status(201).json({
        message: 'Apartment created successfully',
        Apartment: savedApartment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  

  getApartments: async (req, res) => {
    try {
      const Apartments = await Apartment.find();
      res.status(200).json({ Apartments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  updateApartment: async (req, res) => {
    try {
      const { id } = req.params;
      const { number, etage, resident } = req.body;
  
      if (!(number && etage && resident)) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
  
      const updatedApartment = await Apartment.findByIdAndUpdate(
        id,
        { number, etage, resident },
        { new: true }
      );
  
      res.status(200).json({
        message: 'Apartment updated successfully',
        Apartment: updatedApartment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  deleteApartment: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Apartment.findByIdAndDelete(id);
      if (deleted) {
        return res.status(200).send('Apartment deleted');
      }
      throw new Error('Apartment not found');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

};      