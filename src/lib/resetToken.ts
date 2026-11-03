import crypto from "node:crypto";

const createResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  return { rawToken, hashedToken };
};

const hashResetToken = (rawToken: string) =>
  crypto.createHash("sha256").update(rawToken).digest("hex");

export { createResetToken, hashResetToken };
