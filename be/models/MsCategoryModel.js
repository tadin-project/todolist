import mongoose from "mongoose";

const MsCategoryModel = mongoose.Schema(
  {
    cat_nama: {
      type: String,
      required: true,
    },
    cat_status: {
      type: Boolean,
      required: true,
    },
    cat_desc: {
      type: String,
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

export default mongoose.model("MsCategory", MsCategoryModel);
