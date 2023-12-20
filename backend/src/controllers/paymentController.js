import Payment from "../models/Payment";

export const paymentController = {
  createPayment: async (req, res) => {
    try {
      const { apartmentId, month, year } = req.body;
      if (!apartmentId || !month || !year) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
      const newPayment = new Payment({ apartment: apartmentId, month, year });

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




  deletePayment: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findByIdAndDelete(id);
      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
};
  