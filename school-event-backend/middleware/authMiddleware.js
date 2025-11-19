const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {

let token;
let authHeader = req.headers.Authorization || req.headers.authorization;
if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; // Correct split by space
}
if (!token) {
    console.log("No token found in header:", authHeader);
    return res.status(401).json({ message: "No token found, no authorization" });
}
try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log("The decoded user is:", req.user);
    next();
} catch (err) {
    console.error("Token verification error:", err.message);
    res.status(400).json({ message: "Token is not valid" });
}
}
module.exports= verifyToken;