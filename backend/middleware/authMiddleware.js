import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json("Not authorized");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = user;
    next();
  });
};
