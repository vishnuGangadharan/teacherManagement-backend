import jwt from 'jsonwebtoken'
import Teacher from "../model/teacherModel.js";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('inside user check');
    
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
    }
    
    const token = authHeader.split(" ")[1];
    
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decodeToken.role !== "teacher") {
            return res.status(400).json({ message: "Unauthorized access" });
        }

        const userId = decodeToken.userId;
        console.log('auth', userId);
        
        const user = await Teacher.findById(userId);
        
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // if (user.blocked) {
        //     return res.status(403).json({ message: "User is blocked", accountType: "user" });
        // }

        next();
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default userAuth
