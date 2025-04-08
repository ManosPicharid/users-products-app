import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const generateAccessToken = user => {
  console.log("Auth Service:", user);
  const payload = {
    username: user.username,
    email: user.email,
    roles: user.roles
  }
  const secret = process.env.TOKEN_SECRET;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secret, options);
}

export const verifyAccessToken = token => {
  const secret = process.env.TOKEN_SECRET
  try {
    const payload = jwt.verify(token, secret)
    console.log("VerifyToken:", payload)
    return { verified: true, data: payload }
  } catch (err) {
    return { verified: false, data: err.message }
  }
}

export const login = async body => {
  const username = body.username;
  const password = body.password;
  console.log("Login user", body);

  const result = await User.findOne({ username: username })
  const isMatch = await bcrypt.compare(password, result.password)
  if (result && result.username === username && isMatch)
    return generateAccessToken(result)
  else
    return false
}