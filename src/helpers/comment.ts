import { AddComment } from "../interfaces";
import db from "../models";

export const addComment = async (
  _: undefined,
  { content, articleId, userId, commentId }: AddComment
) => {
  const newComment = db.Comment.create({
    content: content,
    articleId: articleId,
    userId: userId,
    commentId: commentId,
  });
  return newComment;
};

export const getComments = async (articleId: number, limit: number) => {
  const { count, rows: comments } = await db.Comment.findAndCountAll({
    where: {
      articleId: articleId,
      commentId: null,
    },
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["firstName", "lastName", "image"],
      },
    ],
    raw: true,
    limit: limit,
    order: [['createdAt', 'DESC']],
  });

  const commentCount = count;

  const replyCounts: number[] = []; 

  const commentsWithReplies = await Promise.all(
    comments.map(async (comment: any) => {
      const {count, rows:replies} = await db.Comment.findAndCountAll({
        where: {
          articleId: articleId,
          commentId: comment.id,
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["firstName", "lastName", "image"],
          },
        ],
        raw: true,
        
      });
      
      replyCounts.push(count);

      const user = {
        firstName: comment["user.firstName"],
        lastName: comment["user.lastName"],
        image: comment["user.image"],
      };

      const repliesWithUser = replies.map((reply: any) => {
        const user = {
          firstName: reply["user.firstName"],
          lastName: reply["user.lastName"],
          image: reply["user.image"],
        };

        return {
          ...reply,
          user,
        };
      });

      

      return {
        ...comment,
        user,
        replies: repliesWithUser
      };
    })
  );

  const totalReplyCount = replyCounts.reduce((sum, count) => sum + count, 0);

  const totalCount = commentCount + totalReplyCount

  return { payload: commentsWithReplies, count: totalCount };
};
