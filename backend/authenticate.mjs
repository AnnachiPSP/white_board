import jwtmod from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if (token == null) {
      req.isAuthenticated = false;
    } else {
      req.isAuthenticated = true;
      req.token = token;
    }

    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;
    const decodedToken = jwtmod.verify(token, public_key, {
        algorithms: ["RS256"],
    });

    const { preferred_username } = decodedToken;
    req.user_name = preferred_username;

    next();
  };

