import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = user.id;
    } else {
      req.send(401).json({ message: "Unauthorized user" });
    }
    next();
  } catch (err) {
    console.log(err);
    req.send(401).json({ message: "Unauthorized user" });
  }
};
