import Apartment from "../models/Apartment";
import Payment from "../models/Payment";
export const apartmentController = {
  

  createApartment: async (req, res) => {
    try {
      const { number, etage, resident, tel} = req.body;
  
      if (!(number && etage && resident && tel  )) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

  
      const newApartment = new Apartment({ number, etage, resident , tel });
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
  


  getApartments : async (req, res) => {
    try {
      const { year, month } = req.query;
      const apartments = await Apartment.find().lean();
      const payments = await Payment.find({ apartment: { $in: apartments.map(apartment => apartment._id) }, year, month }).lean();
      const paymentMap = payments.reduce((map, payment) => {
        map[payment.apartment.toString()] = payment;
        return map;
      }, {});
  
      const apartmentsStatus = apartments.map(apartment => ({
        ...apartment,
        paymentStatus: paymentMap[apartment._id.toString()] ? 'Paid' : 'Not Paid',
      }));
  
      res.status(200).json({ Apartments: apartmentsStatus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  

  

 
updateApartment: async (req, res) => {
    try {
      const { id } = req.params;
      const { number, etage, resident, tel} = req.body;

      if (!(number && etage && resident && tel )) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      const updatedApartment = await Apartment.findByIdAndUpdate(id,{ number, etage, resident, tel },{ new: true });

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