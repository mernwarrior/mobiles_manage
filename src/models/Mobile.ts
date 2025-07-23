import mongoose from "mongoose";

const MobileSchema = new mongoose.Schema({
  name: String,
  brand: String,
  imei: String,
  purchaseDate: Date,
  assignedTo: String,
  isDamaged: Boolean,
});

export const Mobile =
  mongoose.models.Mobile || mongoose.model("Mobile", MobileSchema);
