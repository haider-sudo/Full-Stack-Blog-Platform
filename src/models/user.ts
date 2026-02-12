"use strict";

import { Model } from "sequelize";

interface userAttributes {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<userAttributes> {
    declare id: Number;
    declare firstName: string;
    declare lastName: string;
    declare image: string;
    declare email: string;
    declare password: string;

    static associate(models: any) {
      User.hasMany(models.Article, { foreignKey: "userId", as: "articles" });
      User.hasMany(models.Comment, { foreignKey: "userId", as: "comments" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
