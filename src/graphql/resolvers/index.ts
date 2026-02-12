import { User } from "./user/userResolver";
import { Article } from "./article/articleResolver";
import { userResolverQuery } from "./user/userQuery";
import { articleResolverQuery } from "./article/articleQuery";
import { commentResolverQuery } from "./comment/commentQuery";
import { userResolverMutation } from "./user/userMutation";
import { commentResolverMutation } from "./comment/commentMutation";
import { articleResolverMutation } from "./article/articleMutation";

export const resolvers = {
  Query: {
    ...userResolverQuery,
    ...articleResolverQuery,
    ...commentResolverQuery,
  },

  Mutation: {
    ...userResolverMutation,
    ...commentResolverMutation,
    ...articleResolverMutation
  },
  User,
  Article,
};
