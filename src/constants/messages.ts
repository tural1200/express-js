const MESSAGES = {
  BAD_REQUEST: "auth:badRequest",
  UNAUTHORIZED: "auth:unauthorized",
  USER_EXISTS: "auth:userExists",
  INVALID_CREDENTIALS: "auth:invalidCredentials",
  FORBIDDEN: "auth:forbidden",
  NOT_FOUND: "auth:notFound",
  VALIDATION_FAILED: "auth:validationFailed",
} as const;

export { MESSAGES };
