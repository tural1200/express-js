import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
import { AppResponse } from "../lib";
import { UserService } from "../services/userService.ts";
import type { UserRequestBody } from "../schemas/userSchema.ts";

const create = async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
  const user = await UserService.create(req.body);

  return AppResponse.created(res, {
    data: { user },
  });
};

const getAll = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return AppResponse.success(res, {
    data: {
      users,
      totalCount: users.length,
    },
  });
};

export { create, getAll };
