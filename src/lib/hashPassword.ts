import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, await bcrypt.genSalt(10));
};

export { hashPassword };
