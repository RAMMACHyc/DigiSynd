import Payment from "../models/Payment";

export const paymentController = {

  createPayment: async (req, res) => {
    
    try {
        const { month, apartmentId } = req.body;
      if (!month) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
      const newPayment = new Payment({ month, apartment: apartmentId, ownerId: req.user._id});
      const savedPayment = await newPayment.save();
  
      res.status(201).json({
        message: 'Payment created successfully',
        Payment: savedPayment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }, 

  updatePayment: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body;
  
      if (!amount) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
  
      const updatedPayment = await Payment.findByIdAndUpdate(
        id,
        { amount },
        { new: true }
      );
  
      res.status(200).json({
        message: 'Payment updated successfully',
        Payment: updatedPayment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getPayments: async (req, res) => {
    try {
     const Payments = await Payment.find().populate('apartment');
      res.status(200).json({ Payments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  

  

};      