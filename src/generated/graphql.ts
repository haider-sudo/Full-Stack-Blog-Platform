export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  briefIntro?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  readingTime?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  articleId: Scalars['Int']['output'];
  commentId?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  replies?: Maybe<Array<Maybe<Comment>>>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  changePassword?: Maybe<User>;
  createArticle?: Maybe<Article>;
  loginUser?: Maybe<LoginUserPayload>;
  registerUser?: Maybe<User>;
  singleUpload?: Maybe<SingleUploadPayload>;
};


export type MutationAddCommentArgs = {
  articleId: Scalars['Int']['input'];
  commentId?: InputMaybe<Scalars['Int']['input']>;
  content: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateArticleArgs = {
  briefIntro: Scalars['String']['input'];
  heading: Scalars['String']['input'];
  image: Scalars['Upload']['input'];
  readingTime: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: Scalars['Upload']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload']['input'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<ArticlesPayload>;
  comments?: Maybe<CommentsPayload>;
  currentUser?: Maybe<User>;
  searchArticles?: Maybe<ArticlesPayload>;
  user?: Maybe<User>;
  userArticles?: Maybe<ArticlesPayload>;
};


export type QueryArticleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryArticlesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentsArgs = {
  articleId: Scalars['Int']['input'];
};


export type QuerySearchArticlesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm: Scalars['String']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserArticlesArgs = {
  id: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Maybe<Article>>>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type ArticlesPayload = {
  __typename?: 'articlesPayload';
  count?: Maybe<Scalars['Int']['output']>;
  payload?: Maybe<Array<Maybe<Article>>>;
};

export type CommentsPayload = {
  __typename?: 'commentsPayload';
  count?: Maybe<Scalars['Int']['output']>;
  payload?: Maybe<Array<Maybe<Comment>>>;
};

export type LoginUserPayload = {
  __typename?: 'loginUserPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type SingleUploadPayload = {
  __typename?: 'singleUploadPayload';
  message?: Maybe<Scalars['String']['output']>;
};
