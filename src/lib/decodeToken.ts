import jwt from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

function isTokenPayload(value: unknown): value is TokenPayload {
  if (typeof value !== "object" || value === null) return false;
  if (!("id" in value) || !("iat" in value) || !("exp" in value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.iat === "number" &&
    typeof value.exp === "number"
  );
}

const decodeToken = (token: string): TokenPayload => {
  const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
  if (!isTokenPayload(decodedValue)) {
    throw new Error("Invalid token payload");
  }
  return decodedValue;
};

export { decodeToken };
