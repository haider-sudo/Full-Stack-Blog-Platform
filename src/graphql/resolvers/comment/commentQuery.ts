import { getComments, addComment } from "../../../helpers/comment";
import { Comments } from "../../../interfaces";

export const commentResolverQuery = {
  comments: async (_parent: undefined, { articleId, limit }:Comments) => getComments(articleId, limit)  
};
