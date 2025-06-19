import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Unauthorized. No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).send({ message: "Unauthorized. User not found" });
        }

        req.user = user; // Store user on the request
        next();

    } catch (error) {
        res.status(401).send({ message: "Unauthorized", error: error.message });
    }
};

export default authorize;


// if (decoded.role !== "admin") return res.status(403).send({ message: "Forbidden" });  You can store the user's role in the token and check: