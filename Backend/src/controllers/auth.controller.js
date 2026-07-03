import pool from "../lib/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import {mapUser} from '../utils/userMapper.js'
export const signup = async (req, res) => {
    const { full_name, email, password } = req.body;
    console.log(req.body)
    try {
        // Validate input
        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // Check if user already exists
        const [rows] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.query(
            `INSERT INTO users (full_name, email, password)
             VALUES (?, ?, ?)`,
            [full_name, email, hashedPassword]
        );

        // Generate JWT
        generateToken(result.insertId, res);

        // Fetch the newly created user
        const [user] = await pool.query(
            `SELECT id, full_name, email, profile_pic
             FROM users
             WHERE id = ?`,
            [result.insertId]
        );

        return res.status(201).json({
            message: "User registered successfully",
            user: mapUser(user[0]),
        });

    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const signin= async (req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    if(!email || !password){
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    try{
    const [rows]=await pool.query("select id,full_name,email,password,profile_pic from users where email= ?",[email])

    if(rows.length === 0){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const user=rows[0]

    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    generateToken(user.id,res)

    res.status(200).json(mapUser(user))

    }
    catch(e){
        console.log("ERROR in login: ",e.message)
        res.status(500).json({message: 'Internal Server Error'})
    }


}



export const logout=(req,res)=>{
    
    try{
        res.cookie('jwt',"",{maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    }
    catch(e){
        console.log("Error in logout controller",e.message)
    }
}



export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;
        console.log(req.body)

if (!profilePic) {
    return res.status(400).json({
        message: "Profile picture is required",
    });
}

const uploadResponse = await cloudinary.uploader.upload(profilePic);

await pool.query(
    `UPDATE users
     SET profile_pic = ?
     WHERE id = ?`,
    [uploadResponse.secure_url, userId]
);

        // Get updated user
        const [rows] = await pool.query(
            `SELECT id, full_name, email, profile_pic,created_at
             FROM users
             WHERE id = ?`,
            [userId]
        );
        const user = {
  id: rows[0].id,
  fullName: rows[0].full_name,
  email: rows[0].email,
  profilePic: rows[0].profile_pic,
  createdAt: rows[0].crated_at,
};
        return res.status(200).json({
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export const checkAuth=(req,res)=>{
    try{
        res.status(200).json(mapUser(req.user));
    }
    catch(e){
        console.log("error in checkauth: ",e.message)
        res.status(500).json({message: 'internal Server error'})
    }
}