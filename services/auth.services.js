import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library";

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
    // console.log("VerifyToken:", payload)
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

export async function googleAuth(code) {
  console.log("Google login");
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const oauth2client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2client.getToken(code)
    oauth2client.setCredentials(tokens)

    const ticket = await oauth2client.verifyIdToken({
      idToken: tokens.id_token,
      audience: CLIENT_ID
    })

    const userInfo = await ticket.getPayload();
    console.log("Google User:", userInfo)
    return { user: userInfo, tokens }
  } catch (err) {
    console.log("Error in google authentication:", err)
    return { error: "Failed to authenticate with google" }
  }

}