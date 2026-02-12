import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Upload
  scalar Date
  scalar JSON

  type User {
    id: Int
    firstName: String!
    lastName: String!
    image: String
    email: String!
    password: String!
    token: String
    articles: [Article]
  }

  type Article {
    id: Int
    userId: Int
    category: String
    heading: String
    readingTime: String
    briefIntro: String
    details: String
    image: String
    createdAt: Date
    user: User
  }

  type Comment {
    id: Int
    content: String!
    commentId: Int
    articleId: Int!
    userId: Int!
    createdAt: Date
    user: User
    replies: [Comment]
  }

  type commentsPayload {
    payload: [Comment]
    count: Int
  }

  type articlesPayload {
    payload: [Article]
    count: Int
  }

  type Query {
    currentUser: User
    articles(page: Int, pageSize: Int): articlesPayload
    userArticles(id: Int!, page: Int, pageSize: Int): articlesPayload
    article(id: Int!): Article
    comments(articleId: Int!, limit: Int!): commentsPayload
    user(userId: Int!): User
    searchArticles(
      searchTerm: String!
      page: Int
      pageSize: Int
    ): articlesPayload
  }

  type loginUserPayload {
    user: User
    token: String
  }
  
  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      image: Upload!
    ): User

    loginUser(email: String!, password: String!): loginUserPayload

    changePassword(
      userId: Int!
      password: String!
      confirmPassword: String!
    ): User

    addComment(
      content: String!
      articleId: Int!
      userId: Int!
      commentId: Int
    ): Comment

    createArticle(
      userId: Int!
      heading: String!
      readingTime: String!
      briefIntro: String!
      image: Upload!
    ): Article
  }
`;
