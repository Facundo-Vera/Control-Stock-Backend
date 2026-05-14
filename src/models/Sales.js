import { model, Schema } from "mongoose";


const salesItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const salesSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  items: [salesItemSchema],

  paymentMethod: {
    type: String,
    enum: ["EFECTIVO", "TRANSFERENCIA", "TARJETA"],
    required: true,
  },

  totalAmount: {
    type: Number,
    default: 0,
  },
});

salesSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.quantity * item.unitPrice;
  }, 0);
});



export default model("Sales", salesSchema);