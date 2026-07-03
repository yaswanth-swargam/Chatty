import jwt from "jsonwebtoken";
import pool from "../lib/db.js";

const protect_route = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [users] = await pool.query(
            `SELECT id, full_name, email, profile_pic, updated_at, created_at
             FROM users
             WHERE id = ?`,
            [decoded.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = users[0];
        console.log(req.user)
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};

export default protect_route