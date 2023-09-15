import jwt from "jsonwebtoken";
// import { UnAuthenticatedError } from "../errors/index.js";

const authm = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId };

    next();
  } catch (error) {
    // throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authm;
