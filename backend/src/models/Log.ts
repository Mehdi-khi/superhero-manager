import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      required: true,
    },
    heroName: String,
    userRole: String,
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);