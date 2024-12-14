import mongoose, { Mongoose } from "mongoose";
import { type } from "os";

// randomUsername, roomID, content, title, versionHistory(snapshot), status, ownerID, activeUsers, lastUpdated, permissions, isPublic, documentType

const editorSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled Document",
    },
    content: {
      type: String,
      default: "",
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    versionHistory: [
      // snapshots of the content
      {
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    documentType: {
      type: String,
      enum: ["text", "markdown", "code"],
      default: "text",
    },

    status: {
      type: String,
      enum: ["deleted", "active", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Editor = mongoose.model("Editor", editorSchema);
export default Editor;
