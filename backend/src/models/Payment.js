
import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({

  createdAt: { 
    type: Date,
    default: new Date(),
},

// apartment: {
//     type: Schema.Types.ObjectId,
//     ref: 'Apartment'
// },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },



});

const Payment = model('Payment', paymentSchema);

export default Payment;
