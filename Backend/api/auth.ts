import { jwt } from "../utils/appsetup";
const UserModel = require("../database/models/user");
const ErrorResponse = require("../utils//ErrorResponse");
const asyncHandler = require("./async.ts");
require("dotenv").config();

exports.protect = asyncHandler(async (req: any, res: any, next: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse(`Not authorize to access this route`, 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (e) {
    return next(new ErrorResponse(`Not authorize to access this route`, 401));
  }
});

exports.authorize = (...roles: any[]) => {
  return async (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
