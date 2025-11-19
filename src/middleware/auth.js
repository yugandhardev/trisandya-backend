const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  //console.log(req.header("Authorization"));
  try {
    const header = req.header("Authorization");
    if (!header)
      return res.status(401).json({ error: "No token, authorization denied" });

    // Accept formats: "Bearer <token>" or just "<token>"
    const parts = header.split(" ").filter(Boolean);
    const token = parts.length === 1 ? parts[0] : parts[1];

    if (!token)
      return res.status(401).json({ error: "No token, authorization denied" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: "Token is not valid" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
