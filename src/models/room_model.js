import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomID: {
      type: String,
      required: true,
      unique: true,
    },

    // user who created the room
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    activeUsers: {
      type: [String],
      default: [],
    },

    permissions: [
      {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["admin", "editor", "viewer"],
          default: "editor",
        },
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
