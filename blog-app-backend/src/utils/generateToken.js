import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "myHardCodedSecret123", { expiresIn: "30d" });
};

export default generateToken;
