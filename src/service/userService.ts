import { api, endPoints } from "src/api";
import { LoginPayload } from "./userService.types";

export const login = async (payload: LoginPayload) => {
  return api.post(endPoints.auth.login, payload);
};
