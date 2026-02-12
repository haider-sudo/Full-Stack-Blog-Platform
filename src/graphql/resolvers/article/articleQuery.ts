import {
  getArticleById,
  getArticles,
  getUserArticles,
  getSearchResult,
} from "../../../helpers/article";
import { Article, Articles, SearchArticles, UserArticles } from "../../../interfaces";

export const articleResolverQuery = {
  articles: async (_parent:undefined,{ page, pageSize }: Articles) =>
    getArticles(page, pageSize),
  article: async (_parent:undefined,{ id }: Article) => getArticleById(id),
  userArticles: async (_parent:undefined,{ id, page, pageSize }: UserArticles) =>
    getUserArticles(id, page, pageSize),
  searchArticles: async (_parent:undefined, { searchTerm, page, pageSize }: SearchArticles) =>
    getSearchResult(searchTerm, page, pageSize),
};
