import debounce from "../../public/js/utils/debounce.js";
import Editor from "../models/editor_model.js";
import User from "../models/user_model.js";

export const saveDataToDatabase = debounce(async (socket, content) => {
  const user = await User.findOne({ _id: socket.user.id }).select("-password");
  if (!user) {
    throw new Error("Erorr: user not found!");
  }
  try {
    await Editor.findOneAndUpdate(
      { userID: user._id },
      { $set: { content } },
      { upsert: true }
    );
    console.log("content saved successfully");
  } catch (error) {
    console.error("error: error saving data: ", error);
  }
}, 3000);
