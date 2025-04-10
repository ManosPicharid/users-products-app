import * as authService from "../services/auth.services.js";

export const login = async (req, res) => {

  try {
    const result = await authService.login(req.body);
    if (result)
      res.status(200).json({ status: true, data: result })
    else
      res.status(404).json({ status: false, data: "user not logged in" })
  } catch (err) {
    console.log("Problem in logging in", err)
    res.status(400).json({ status: false, data: err })
  }
}

export const googleLogin = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).json({ status: false, data: "Authorization code is missing" })
  } else {
    let user = await authService.googleAuth(code);
    if (user) {
      console.log(">>>", user);
      res.status(200).json({ status: true, data: user});
    } else {
      res.status(400).json({ status: false, data: "Problem in google login"})
    }
  }
}