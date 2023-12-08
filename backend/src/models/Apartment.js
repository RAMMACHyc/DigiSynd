import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
    number: { type: Number, required: [true, "please"] },
    etage: { type: Number, required: [true, "please"] },
    resident: { type: String, required: [true, "please"] },

    createdAt: {
        type: Date,
        default: new Date(),
    }

})

const apartment = mongoose.model('Apartment', ApartmentSchema);
export default apartment 
