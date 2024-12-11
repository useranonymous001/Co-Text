import mongoose, { Mongoose } from "mongoose";

// randomUsername, roomID, content, title, versionHistory(snapshot), status, ownerID, activeUsers, lastUpdated, permissions, isPublic, documentType

const editorSchema = new mongoose.Schema(
  {
    roomID: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "Untitled Document",
    },
    content: {
      type: String,
      default: "",
    },
    ownerID: {
      // user who created the room
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    activeUsers: [
      // total number of users in a room
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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

    isPublic: {
      type: Boolean,
      default: false,
    },
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
