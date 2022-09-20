import mongoose from "mongoose";

const ListModel = mongoose.Schema(
  {
    list_nama: {
      type: String,
      required: true,
    },
    list_desc: {
      type: String,
      required: true,
    },
    list_status: {
      type: Number,
      required: true,
      default: 0,
    },
    list_deadline: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "MsCategory",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "MsUser",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("List", ListModel);
