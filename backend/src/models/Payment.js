
import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({

    month: {
        type: String,
        required: true,
        enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    year: {
        type: Number,
        required: true
    },

    // ownerId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User', 
    //   },

    apartment: {
        type: Schema.Types.ObjectId,
        ref: 'Apartment',
    },

      
    paymentDate: {
        type: Date,
        default: Date.now
    }


});

const Payment = model('Payment', paymentSchema);

export default Payment;
