import { Op } from "sequelize";
import { S3 } from "../aws";
import db from "../models";
import { params } from "../constants";
import { CreateArticle } from "../interfaces";

export const createArticle = async (
  _: undefined,
  {
    userId,
    heading,
    readingTime,
    briefIntro,
    image,
  }: CreateArticle
) => {
  if (!heading || !readingTime || !briefIntro || !image) {
    console.error("Error: All fields must be filled");
    return;
  }

  const briefIntroLength = briefIntro.length;
  const splitIndex = Math.ceil(briefIntroLength / 8);
  const details = briefIntro.substring(0, splitIndex);

  const {
    file: { createReadStream, filename },
  } = await image[0];
  const stream = await createReadStream();
  const upload = await S3.upload({
    ...params,
    Body: stream,
    Key: `${Date.now()}-${filename}`,
  }).promise();

  const securedUrl = upload.Location;

  const newArticle = await db.Article.create({
    userId: userId,
    category: "Sports",
    heading: heading,
    readingTime: readingTime,
    details: details,
    briefIntro: briefIntro,
    image: securedUrl,
  });

  return newArticle;
};

export const getUserArticles = async (
  id: number,
  page: number,
  pageSize: number
) => {
  const offset = (page - 1) * pageSize;
  const { count, rows: articles } = await db.Article.findAndCountAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["firstName", "lastName", "image"],
      },
    ],
    offset,
    limit: pageSize,
    raw: true,
  });

  const articlesWithUser = articles.map((article: any) => {
    const {
      "user.firstName": firstName,
      "user.lastName": lastName,
      "user.image": userImage,
      ...articleData
    } = article;

    const user = {
      firstName,
      lastName,
      image: userImage,
    };

    return { ...articleData, user };
  });

  return { payload: articlesWithUser, count };
};

export const getArticles = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  const { count, rows: articles } = await db.Article.findAndCountAll({
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["firstName", "lastName", "image"],
      },
    ],
    offset,
    limit: pageSize,
    raw: true,
  });

  const articlesWithUser = articles.map((article: any) => {
    const {
      "user.firstName": firstName,
      "user.lastName": lastName,
      "user.image": image,
      ...articleData
    } = article;

    const user = {
      firstName,
      lastName,
      image,
    };
    return { ...articleData, user };
  });

  return { payload: articlesWithUser, count };
};

export const getArticleById = async (id: number) => {
  const article = await db.Article.findByPk(id, {
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "image", "email"],
      },
    ],
    raw: true,
  });

  if (!article) {
    throw new Error(`Article with id ${id} not found`);
  }

  const {
    "user.firstName": userFirstName,
    "user.lastName": userLastName,
    "user.image": userImage,
    ...articleData
  } = article;

  const user = {
    firstName: userFirstName,
    lastName: userLastName,
    image: userImage,
  };

  return { ...articleData, user };
};

export const getSearchResult = async (
  searchTerm: string,
  page: number,
  pageSize: number
) => {
  const offset = (page - 1) * pageSize;
  const { count, rows: articles } = await db.Article.findAndCountAll({
    where: {
      heading: {
        [Op.iLike]: `%${searchTerm}%`,
      },
    },
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["firstName", "lastName", "image"],
      },
    ],
    offset,
    limit: pageSize,
    raw: true,
  });
  const articlesWithUser = articles.map((article: any) => {
    const {
      "user.firstName": firstName,
      "user.lastName": lastName,
      "user.image": image,
      ...articleData
    } = article;

    const user = {
      firstName,
      lastName,
      image,
    };
    return { ...articleData, user };
  });

  return { payload: articlesWithUser, count };
};
