import mongoose from "mongoose";

const creationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["image", "article","blog", "resume"],
      required: true,
    },

    publish: {
      type: Boolean,
      default: false,
    },

    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt auto-added
  }
);

const creationModel =
  mongoose.models.creation || mongoose.model("creation", creationSchema);

export default creationModel;
