import type { Request, Response } from "express";
import { AppResponse } from "../lib";
import { UserService } from "../services/userService.ts";
import type {
  UserRequestBody,
  UpdateUserRequestBody,
  UpdateMeRequestBody,
} from "../schemas/userSchema.ts";

const create = async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
  const user = await UserService.create(req.body, req.user.id);

  return AppResponse.created(res, {
    data: { user },
  });
};

const update = async (
  req: Request<{}, {}, UpdateUserRequestBody>,
  res: Response,
) => {
  const updatedUser = await UserService.update(req.body, req.user.id);

  return AppResponse.success(res, {
    data: updatedUser,
  });
};

const updateMe = async (
  req: Request<{}, {}, UpdateMeRequestBody>,
  res: Response,
) => {
  const updatedMe = await UserService.update(
    {
      ...req.body,
      email: req.user.email,
    },
    req.user.id,
  );

  return AppResponse.success(res, {
    data: updatedMe,
  });
};

const getAll = async (_req: Request, res: Response) => {
  const data = await UserService.getAll();

  return AppResponse.success(res, {
    data,
  });
};

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  await UserService.delete(req.params.id, req.user.id);

  return AppResponse.success(res, {
    message: "auth:userDeleted",
  });
};

export { create, getAll, update, updateMe, deleteUser };
