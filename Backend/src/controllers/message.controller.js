import pool from "../lib/db.js";
import cloudinary from "../lib/cloudinary.js";
import { mapUser } from "../utils/userMapper.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const [rows] = await pool.query(
      `SELECT id, full_name, email, profile_pic
       FROM users
       WHERE id != ?`,
      [loggedInUserId]
    );

    // Map every user
    const users = rows.map(mapUser);

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user.id;

    const [messages] = await pool.query(
      `SELECT *
       FROM messages
       WHERE
        (sender_id = ? AND receiver_id = ?)
        OR
        (sender_id = ? AND receiver_id = ?)
       ORDER BY created_at ASC`,
      [myId, userToChatId, userToChatId, myId]
    );

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;

    // Receiver id from params
    const { id: receiverId } = req.params;

    const senderId = req.user.id;

    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);

      imageUrl = uploadResponse.secure_url;
    }

    const [result] = await pool.query(
      `INSERT INTO messages
      (sender_id, receiver_id, text, image)
      VALUES (?, ?, ?, ?)`,
      [senderId, receiverId, text, imageUrl]
    );

    const [rows] = await pool.query(
      `SELECT *
       FROM messages
       WHERE id = ?`,
      [result.insertId]
    );

    const newMessage = rows[0];

const receiverSocketId = getReceiverSocketId(receiverId);

console.log("Receiver:", receiverId);
console.log("Socket:", receiverSocketId);

if (receiverSocketId) {
  console.log("Emitting...");
  io.to(receiverSocketId).emit("newMessage", newMessage);
}

return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};