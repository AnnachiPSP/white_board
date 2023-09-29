import jwtmod from "jsonwebtoken";

export default async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if (token == null) {
      req.isAuthenticated = false; // Set a flag to indicate authentication failure
    } else {
      req.isAuthenticated = true; // Set a flag to indicate authentication success
      req.token = token; // Store the token for later use if needed
    }

    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;
    const decodedToken = jwtmod.verify(token, public_key, {
        algorithms: ["RS256"],
    });
    console.log(decodedToken);
    next(); // Continue to the next middleware or route handler
  };

