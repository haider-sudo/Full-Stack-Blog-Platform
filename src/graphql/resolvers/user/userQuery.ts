import { User } from "../../../interfaces";

export const userResolverQuery = {
  currentUser: (_parent: undefined, _args: undefined, context: { user: User }) => {
    const user = context.user;
    return user;
  },
};
