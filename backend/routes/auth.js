import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.json("Logged in");
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json("Logged out");
});

export default router;
