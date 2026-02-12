import { changePassword, loginUser, registerUser } from "../../../helpers/user";

export const userResolverMutation = {
      registerUser,
      loginUser,
      changePassword,
}