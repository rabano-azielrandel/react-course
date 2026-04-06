import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// temp DB for test only
const user = {
    username: "admin",
    password: bcrypt.hashSync("1234", 10),
};

export const login = async (req, res) => {
    const SECRET = process.env.JWT_SECRET;
    console.log("SECRET:", SECRET);

    try {
        const {username, password} = req.body;

        // 1. check username
        if (username !== user.username) {
            return res.status(401).json({message: "Invalid username"});
        }

        // 2. check password
        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) {
            return res.status(401).json({message: "Wrong password"});
        }

        // 3. generate token
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h"});

        // 4. send response
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
        });

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
    
}

export const logout = async(req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // true in production for HTTPS
            sameSite: "lax",
        })

        return res.status(200).json({message: "Logged out successfully"});
    } catch (err) {
        console.log("Failed to logout: ", err );
    }
}

export const me = (req, res) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message: "Not Authenticated"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({user: decoded});
    } catch(err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}