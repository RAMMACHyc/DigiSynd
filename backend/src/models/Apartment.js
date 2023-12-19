import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
    number: { type: Number, required: [true, "please Number"], unique: true, 
    validate:  {
      validator: function (value) {
        return value > 0; 
      },
      message: "Number must be positive"
    } },
    etage: { type: Number, required: [true, "please etage"] },
    resident: {
      type: String,
      required: [true, "please enter resident"],
      validate: {
        validator: function (value) {
          return value.trim().length > 0; 
        },
        message: "please enter a non-empty resident"
      }
    },
    tel: {
      type: Number,
      required: [true, "please enter tel"],
      validate: {
        validator: function (value) {
          return value > 0; 
        },
        message: "please enter a positive tel"
      }
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    createdDate: {
        type: Date,
        default: Date.now
      }

      
      

})

const apartment = mongoose.model('Apartment', ApartmentSchema);
export default apartment 
