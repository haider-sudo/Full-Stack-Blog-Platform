"use strict";

import { Model } from "sequelize";

interface CommentAttributes {
  id: number;
  content: string;
  commentId: number;
  articleId: number;
  userId: number;
}

module.exports = (sequelize: any, DataTypes: { STRING: any; INTEGER: any }) => {
  class Comment extends Model<CommentAttributes> {
    declare id: number;
    declare content: string;
    declare commentId: number;
    declare articleId: number;
    declare userId: number;

    static associate(model: any) {
      Comment.belongsTo(model.Article, {
        foreignKey: "articleId",
        as: "article",
      });
      Comment.belongsTo(model.User, { foreignKey: "userId", as: "user" });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: DataTypes.STRING,
      commentId: DataTypes.INTEGER,
      articleId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
