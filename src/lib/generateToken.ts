import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  if (!secret) return;
  const payload = { id: userId };
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn ?? "7d",
  });
  return token;
};

export { generateToken };
