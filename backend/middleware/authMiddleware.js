const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const Protect = asyncHandler(async (req, res,next) => {
  let token;

  // check authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //  get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log(' is Am I token  or Not :::: ',token)

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(' is Am I Decoded  or Not :::: ',decoded)

      //  get user from token
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if(!token){
    res.status(401)
    throw new Error('Not Authorized no tokan')
  }

});


module.exports = {Protect}