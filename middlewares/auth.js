const jwt = require("jsonwebtoken");
require("dotenv").config();
// authenticate is it a user or not?
exports.auth = (req, res, next) => {
  try {
    // extarct jwt totken
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // attach user to request object
      req.user = decoded;
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
  
};
exports.isStudent = (req, res, next) => {
   try{
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied: Not a student" });
    }
    next();
   }
    catch (error) {
     console.error("Authorization error:", error);
     return res.status(403).json({ message: "Forbidden" });
    }
}
exports.isAdmin = (req, res, next) => { 
   try{
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }
    next();
   }
    catch (error) {
     console.error("Authorization error:", error);
     return res.status(403).json({ message: "Forbidden" });
    }
}