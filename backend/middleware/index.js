import { verify } from "jsonwebtoken";
import { getErrorMessage } from "../errors/errorMessages";

const secretKey = process.env.SECRET_KEY;

function validateToken(req, res, next) {
  const token = req.headers.authorization || req.query.token;
  if (!token) {
    return res.status(401).json({ message: getErrorMessage(401) });
  }
  verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: getErrorMessage(401) });
    }

    req.user = decoded;
    next();
  });
}

export default validateToken;
