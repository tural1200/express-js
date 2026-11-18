import bcrypt from "bcrypt";

const compare = <T extends string>(firstValue: T, secondValue: T) => {
  return bcrypt.compare(firstValue, secondValue);
};

export { compare };
