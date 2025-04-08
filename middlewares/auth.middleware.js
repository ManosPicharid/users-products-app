import * as authService from "../services/auth.services.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  // console.log("REQUEST 1: ", req)
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ status: false, message: "Access Denied. No token provided" })
  }

  const result = authService.verifyAccessToken(token)

  if (!result.verified) {
    return res.status(403).json({ status: false, data: result.data})
  }
  req.user = result.data
  // console.log("REQUEST 2: ", req)
  next()
}

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ status: false, data: "Forbidden Access"})
    }
    const userRoles = req.user.roles
    const hasPermission = allowedRoles.every(role => userRoles.includes(role));
    if (!hasPermission) return res.status(403).json({ status: false, data: "Forbidden Access"})
    next()
  }
}