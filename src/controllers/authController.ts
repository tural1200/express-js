import type { Request, Response } from "express";
import { AppError, AppResponse } from "../lib";
import { AuthService } from "../services/authService.ts";
import {
  LoginBody,
  RegisterBody,
  ChangePasswordBody,
} from "../schemas/authSchema.ts";

const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const user = await AuthService.register(req.body);

  return AppResponse.created(res, {
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
      },
    },
  });
};

const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { user, token } = await AuthService.login(req.body);

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 100 * 60 * 60 * 24 * 7,
  });

  return AppResponse.success(res, {
    data: {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    },
  });
};

const logout = async (_req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return AppResponse.success(res, { message: "auth:loggedOut" });
};

const getProfile = async (req: Request, res: Response) => {
  if (!req.cookies?.jwt) throw AppError.unauthorized();

  const user = await AuthService.getProfile(req.cookies?.jwt);

  if (user) {
    return AppResponse.success(res, {
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  }

  throw AppError.unauthorized();
};

const forgotPassword = async (req: Request, res: Response) => {
  await AuthService.forgotPassword(req.body.email);

  return AppResponse.success(res, {
    message: "auth:resetLinkSent",
  });
};

const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const result = await AuthService.resetPassword(token, password);

  if (!result) throw AppError.badRequest("auth:invalidResetToken");

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return AppResponse.success(res, {
    message: "auth:passwordReset",
  });
};

const changePassword = async (
  req: Request<{}, {}, ChangePasswordBody>,
  res: Response,
) => {
  await AuthService.changePassword({
    userId: req.user?.id,
    oldPassword: req.body.oldPassword,
    newPassword: req.body?.newPassword,
  });

  return AppResponse.success(res, {
    message: "auth:passwordChanged",
  });
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
};
