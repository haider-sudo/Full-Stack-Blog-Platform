import { Upload } from "graphql-upload-ts";

export interface AddComment {
    articleId: number;
    commentId: number;
    content: string;
    userId: number;
  };

  export interface ChangePassword {
    confirmPassword: string;
    password: string;
    userId: string;
  };
  
  export interface CreateArticle {
    briefIntro: string;
    heading: string;
    image: any;
    readingTime: string;
    userId: number;
  };
  
  
  export interface LoginUser {
    email: string;
    password: string;
  };
  
  
  export interface RegisterUser {
    email: string;
    firstName: string;
    image: any;
    lastName: string;
    password: string;
  };


export interface Article {
    id: number;
  };
  
  
  export interface Articles {
    page: number;
    pageSize: number;
  };
  
  
  export interface Comments {
    articleId: number;
    limit:  number;
  };
  
  
  export interface SearchArticles {
    page: number;
    pageSize: number;
    searchTerm: string;
  };

  export interface User {

    email: string;
    firstName: string;
    id: number;
    image: string;
    lastName: string;
    password: string;
  };
  
  
  export interface UserArticles {
    id: number;
    page: number
    pageSize: number
  };

  export interface Reply {
    commentId: number;
    content: string;
    id: number;
    createdAt: Date;
    userId: number;
    user: User;
  }
  
  export interface Comment {
    articleId: number;
    commentId: number;
    content: string;
    id: number;
    createdAt: Date;
    userId: number;
    replies: Reply;
    user: User;
  }
