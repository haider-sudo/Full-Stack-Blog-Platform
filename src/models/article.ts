"use strict";

import { Model } from "sequelize";

interface ArticleAttributes {
  id: number;
  userId: number;
  category: string;
  heading: string;
  readingTime: string;
  briefIntro: string;
  details: string;
  image: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Article extends Model<ArticleAttributes> {
    declare id: number;
    declare userId: number;
    declare category: string;
    declare heading: string;
    declare readingTime: string;
    declare briefIntro: string;
    declare details: string;
    declare image: string;

    static associate(models: any) {
      Article.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Article.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      category: DataTypes.STRING,
      heading: DataTypes.STRING,
      readingTime: DataTypes.STRING,
      briefIntro: DataTypes.TEXT,
      details: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );

  return Article;
};
